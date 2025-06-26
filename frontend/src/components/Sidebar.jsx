"use client";

import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiMessageSquare,
  FiPlus,
  FiSearch,
  FiClock,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiTrash2,
} from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import { ChatData } from "../context/ChatContext";
import { UserData } from "../context/UserContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Get real data from ChatContext
  const {
    chatHistory,
    currentChatId,
    createNewChat,
    loadChat,
    deleteChat,
    setChatHistory,
  } = ChatData();

  const { logoutHandler } = UserData();

  const handleNewChat = () => {
    createNewChat();
    // Close sidebar on mobile after creating new chat
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  const handleChatClick = (chatId) => {
    loadChat(chatId);
    // Close sidebar on mobile after selecting chat
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  const handleDeleteChat = (id, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  // Filter chats based on search query
  const filteredChats = chatHistory.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "1 day ago";
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return `${Math.floor(diffInHours / 168)} weeks ago`;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:relative top-0 left-0 h-full z-50
        transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isOpen ? "w-80" : "w-0 lg:w-16"}
        bg-gradient-to-b from-gray-800 to-gray-900
        border-r border-gray-700
        flex flex-col
        shadow-2xl lg:shadow-none
      `}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && (
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <BsRobot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Chat
                </h1>
                <p className="text-xs text-gray-400">Smart Assistant</p>
              </div>
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 group"
          >
            {isOpen ? (
              <FiChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            ) : (
              <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            )}
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className={`
              w-full flex items-center justify-center space-x-3 p-3 rounded-lg
              bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
              text-white font-medium transition-all duration-200
              transform hover:scale-105 active:scale-95
              shadow-lg hover:shadow-xl
              ${!isOpen && "lg:px-2"}
            `}
          >
            <FiPlus className="w-5 h-5" />
            {isOpen && <span>New Chat</span>}
          </button>
        </div>

        {/* Search Bar */}
        {isOpen && (
          <div className="px-4 pb-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        )}

        {/* Recent Chats Header */}
        {isOpen && (
          <div className="px-4 pb-2">
            <h2 className="text-sm font-semibold text-gray-300 flex items-center space-x-2">
              <FiClock className="w-4 h-4" />
              <span>Chat History</span>
              <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">
                {filteredChats.length}
              </span>
            </h2>
          </div>
        )}

        {/* Chat History - Real Data */}
        {isOpen && (
          <div className="flex-1 overflow-y-auto px-4 space-y-2">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  className={`w-full group relative p-3 rounded-lg text-left
                           transition-all duration-200 transform hover:scale-[1.02]
                           ${
                             currentChatId === chat.id
                               ? "bg-blue-600 border-blue-500"
                               : "bg-gray-800 hover:bg-gray-700 border-gray-700 hover:border-gray-600"
                           } border`}
                >
                  {/* Chat Content */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-sm font-medium truncate mb-1 ${
                          currentChatId === chat.id
                            ? "text-white"
                            : "text-white"
                        }`}
                      >
                        {chat.title}
                      </h3>
                      <p
                        className={`text-xs ${
                          currentChatId === chat.id
                            ? "text-blue-200"
                            : "text-gray-400"
                        }`}
                      >
                        {formatTimestamp(chat.createdAt)} •{" "}
                        {chat.messages.length} messages
                      </p>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-600 
                               transition-all duration-200 ml-2"
                    >
                      <FiTrash2 className="w-3 h-3 text-gray-400 hover:text-white" />
                    </button>
                  </div>

                  {/* Active Indicator */}
                  {currentChatId === chat.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r" />
                  )}
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <FiMessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">
                  {searchQuery
                    ? "No conversations found"
                    : "No chat history yet"}
                </p>
                <p className="text-xs mt-1">
                  {searchQuery
                    ? "Try a different search term"
                    : "Start a new chat to begin"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom Action Buttons - Only show when sidebar is open */}
        {isOpen && (
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center gap-2">
              {/* Clear All Button - Small */}
              {filteredChats.length > 0 && (
                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to clear all chat history?"
                      )
                    ) {
                      setChatHistory([]);
                      localStorage.removeItem("chatHistory");
                      console.log("Cleared all chat history");
                    }
                  }}
                  className="flex items-center justify-center p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  title="Clear All Chats"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span className="ml-2 text-sm">Clear</span>
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={logoutHandler}
                className="flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <FiLogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg shadow-lg
                   hover:bg-gray-700 transition-colors duration-200"
      >
        {isOpen ? (
          <FiX className="w-6 h-6 text-white" />
        ) : (
          <FiMenu className="w-6 h-6 text-white" />
        )}
      </button>
    </>
  );
};

export default Sidebar;
