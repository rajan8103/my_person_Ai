import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoding, setNewRequestLoding] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    setCurrentChatId(newChatId);
    setMessages([]);
    return newChatId;
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
    }
  };

  const deleteChat = (chatId) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
    }
  };

  const saveChatToHistory = (chatId, firstQuestion, allMessages) => {
    const chatData = {
      id: chatId,
      title:
        firstQuestion.length > 50
          ? firstQuestion.substring(0, 50) + "..."
          : firstQuestion,
      timestamp: new Date().toLocaleString(),
      messages: allMessages,
      createdAt: new Date().toISOString(),
    };

    setChatHistory((prev) => {
      const existingIndex = prev.findIndex((chat) => chat.id === chatId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = chatData;
        return updated;
      } else {
        return [chatData, ...prev];
      }
    });
  };

  async function fetchResponse() {
    if (prompt.trim() === "") {
      alert("Please Enter Prompt");
      return;
    }

    setNewRequestLoding(true);

    let chatId = currentChatId;
    if (!chatId) {
      chatId = createNewChat();
    }

    const currentPrompt = prompt;
    setPrompt("");

    try {
      // Build conversation history for Gemini API
      const conversationHistory = messages
        .map((msg) => ({
          role: "user",
          parts: [{ text: msg.question }],
        }))
        .concat(
          messages.map((msg) => ({
            role: "model",
            parts: [{ text: msg.answer }],
          }))
        )
        .flat();

      // Add current prompt to the conversation
      conversationHistory.push({
        role: "user",
        parts: [{ text: currentPrompt }],
      });

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyDfRsLb4V4Ad6-6DskGGKQbOc9UxwtNRDY`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          contents: conversationHistory,
        },
      });

      const botResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, no response received.";

      const newMessage = {
        question: currentPrompt,
        answer: botResponse,
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);

      saveChatToHistory(chatId, currentPrompt, updatedMessages);
      setNewRequestLoding(false);
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong. Please try again.");
      setNewRequestLoding(false);
      setPrompt(currentPrompt);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoding,
        setMessages,
        chatHistory,
        currentChatId,
        createNewChat,
        loadChat,
        deleteChat,
        setChatHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("ChatData must be used within a ChatProvider");
  }
  return context;
};
