import { Chat } from "../models/Chat.js";
import { Conversation } from "../models/Conversation.js";

export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const chat = await Chat.create({
      user: userId,
    });
    res.json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getAllChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.json({
      chats,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addConversation = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat)
      return res.status(404).json({
        message: "No chat found with this ID",
      });
    const conversation = await Conversation.create({
      chat: chat._id,
      question: req.body.question,
      answer: req.body.answer,
    });
    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { latestMessage: req.body.question },
      { new: true }
    );
    res.json({
      conversation,
      updatedChat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ chat: req.params.id });
    if (!conversations)
      return res.status(404).json({
        message: "No conversations found with this chat ID",
      });
    res.json({ conversations });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);
    if (!chat) {
      return res.status(404).json({
        message: "No chat found with this ID",
      });
    }
    if (chat.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this chat",
      });
    }
    await chat.deleteOne();
    res.json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
