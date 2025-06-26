"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { ChatData } from "../context/ChatContext";
import { CgProfile } from "react-icons/cg";
import {
  FaRobot,
  FaLightbulb,
  FaCode,
  FaGraduationCap,
  FaBrain,
} from "react-icons/fa";
import { FiSend, FiZap, FiStar, FiTrendingUp } from "react-icons/fi";
import { MdClear, MdScience } from "react-icons/md";
import { BsRocket, BsLightning, BsMagic } from "react-icons/bs";
import { useEffect, useRef } from "react";
import MarkdownRenderer from "../components/markdown-renderer"; // Import markdown renderer

const Home = () => {
  const LoadingSmall = ({
    size = "w-4 h-4",
    color = "border-white",
    className = "",
  }) => {
    return (
      <div
        className={`
        ${size}
        border-2 
        ${color}
        border-t-transparent 
        rounded-full 
        animate-spin
        ${className}
      `}
      />
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoding,
    setMessages,
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      fetchResponse();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  // 4 Interactive Components Data
  const quickActions = [
    {
      id: 1,
      title: "Creative Assistant",
      description: "Write stories, poems, and creative content",
      icon: FaLightbulb,
      gradient: "from-purple-500 via-pink-500 to-red-500",
      bgGradient: "from-purple-900/20 via-pink-900/20 to-red-900/20",
      prompt: "Help me write a creative story about time travel",
      color: "purple",
    },
    {
      id: 2,
      title: "Code Expert",
      description: "Programming help and code solutions",
      icon: FaCode,
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      bgGradient: "from-blue-900/20 via-cyan-900/20 to-teal-900/20",
      prompt: "Explain React hooks with practical examples and code",
      color: "blue",
    },
    {
      id: 3,
      title: "Learning Buddy",
      description: "Explain concepts and help you learn",
      icon: FaGraduationCap,
      gradient: "from-green-500 via-emerald-500 to-lime-500",
      bgGradient: "from-green-900/20 via-emerald-900/20 to-lime-900/20",
      prompt: "Explain machine learning in simple terms with examples",
      color: "green",
    },
    {
      id: 4,
      title: "Business Advisor",
      description: "Business ideas and strategic planning",
      icon: FiTrendingUp,
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      bgGradient: "from-orange-900/20 via-amber-900/20 to-yellow-900/20",
      prompt:
        "Give me innovative startup ideas for 2024 with detailed analysis",
      color: "orange",
    },
  ];

  const handleQuickAction = (promptText) => {
    setPrompt(promptText);
    setTimeout(() => {
      if (promptText.trim()) {
        fetchResponse();
      }
    }, 100);
  };

  const messagesContainerRef = useRef();
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <GiHamburgerMenu className="text-white text-xl" />
        </button>

        {/* Header with Clear Button */}
        <div className="border-b border-gray-700 flex items-center justify-between px-4">
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <MdClear />
              Clear Chat
            </button>
          )}
        </div>

        {/* Chat Messages Area */}
        <div
          className="flex-1 overflow-y-auto p-4 pb-24"
          ref={messagesContainerRef}
        >
          {messages && messages.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((e, i) => (
                <div key={i} className="space-y-4">
                  {/* User Message */}
                  <div className="flex items-start gap-3 justify-end animate-fade-in-right">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl rounded-tr-md max-w-[80%] break-words shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                      <p className="whitespace-pre-wrap">{e.question}</p>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                      <CgProfile className="text-white text-lg" />
                    </div>
                  </div>

                  {/* Bot Response with Markdown */}
                  <div className="flex items-start gap-3 animate-fade-in-left">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                      <FaRobot className="text-white text-lg" />
                    </div>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 rounded-2xl rounded-tl-md max-w-[80%] break-words shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                      {/* Using MarkdownRenderer instead of simple text */}
                      <MarkdownRenderer content={e.answer} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Enhanced Welcome Screen with 4 Components */
            <div className="flex items-center justify-center min-h-full p-6">
              <div className="w-full max-w-6xl">
                {/* Welcome Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                  <div className="relative inline-block mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-pulse-slow shadow-2xl">
                      <FaRobot className="text-4xl text-white animate-bounce" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                  </div>

                  <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-gradient-text">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      AI Assistant
                    </span>
                  </h1>

                  <p
                    className="text-xl text-gray-300 mb-4 animate-fade-in-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    Your intelligent companion for creativity, coding, learning
                    & business
                  </p>

                  <div
                    className="flex items-center justify-center gap-3 text-sm text-gray-400 animate-fade-in-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <BsLightning className="text-yellow-400 animate-pulse" />
                    <span>Powered by Advanced AI</span>
                    <BsMagic className="text-purple-400 animate-pulse" />
                    <span>Always Learning</span>
                  </div>
                </div>

                {/* 4 Interactive Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <div
                        key={action.id}
                        onClick={() => handleQuickAction(action.prompt)}
                        className={`
                          group relative overflow-hidden rounded-3xl p-8 cursor-pointer
                          bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm
                          border border-gray-700/50 hover:border-gray-600/50
                          transform transition-all duration-500 ease-out
                          hover:scale-105 hover:-translate-y-3 hover:shadow-2xl
                          active:scale-95 active:translate-y-0
                          animate-fade-in-up
                        `}
                        style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                      >
                        {/* Background Gradient Effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${action.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        ></div>

                        {/* Animated Border */}
                        <div
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                        ></div>

                        {/* Glow Effect */}
                        <div
                          className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`}
                        ></div>

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon */}
                          <div
                            className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${action.gradient} mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}
                          >
                            <IconComponent className="text-2xl text-white" />
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-200 transition-all duration-500">
                            {action.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-400 text-base mb-6 group-hover:text-gray-200 transition-colors duration-500 leading-relaxed">
                            {action.description}
                          </p>

                          {/* Action Button */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500 group-hover:text-white transition-colors duration-500">
                              <span className="mr-2 font-medium">
                                Click to explore
                              </span>
                              <BsRocket className="transform group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-500" />
                            </div>
                            <FiZap className="text-gray-600 group-hover:text-yellow-400 transform group-hover:scale-125 transition-all duration-500" />
                          </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
                        <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Features */}
                <div
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="inline-flex items-center gap-8 text-sm text-gray-500 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-700/50">
                    <div className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer group">
                      <FiStar className="animate-pulse group-hover:animate-spin" />
                      <span>Smart Responses</span>
                    </div>
                    <div className="w-px h-4 bg-gray-600"></div>
                    <div className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer group">
                      <FaBrain className="animate-pulse group-hover:animate-bounce" />
                      <span>Deep Learning</span>
                    </div>
                    <div className="w-px h-4 bg-gray-600"></div>
                    <div className="flex items-center gap-2 hover:text-purple-400 transition-colors cursor-pointer group">
                      <MdScience className="animate-pulse group-hover:animate-spin" />
                      <span>Advanced AI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {newRequestLoding && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-3 animate-fade-in-left">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                  <FaRobot className="text-white text-lg" />
                </div>
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 rounded-2xl rounded-tl-md shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-300 animate-pulse">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Input Form */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent border-t border-gray-700/50 backdrop-blur-sm">
          <form
            className="flex items-center gap-3 max-w-4xl mx-auto"
            onSubmit={submitHandler}
          >
            <div className="flex-1 relative">
              <input
                className="w-full p-4 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/20"
                type="text"
                placeholder="Type your message here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                disabled={newRequestLoding}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <button
              type="submit"
              disabled={newRequestLoding || !prompt.trim()}
              className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 flex items-center justify-center min-w-[56px] transform hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-blue-500/30"
            >
              {newRequestLoding ? (
                <LoadingSmall size="w-5 h-5" />
              ) : (
                <FiSend className="text-xl" />
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradient-text {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
        }

        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 3s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
