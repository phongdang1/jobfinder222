import React, { useState, useEffect, useRef } from "react";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoMdClose, IoMdSend } from "react-icons/io";
import { Button } from "../ui/button";
import typingAnimation from "../../assets/animation/typingAnimation.json";
import logo from "../../assets/images/JobFinder_logo.png";
import Lottie from "lottie-react";
import { chatWithAI, getUsersById } from "@/fetchData/User";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState();
  const userId = localStorage.getItem("user_id");
  const [replyHistory, setReplyHistory] = useState("");

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    setMessages((prev) => [...prev, { text: inputMessage, isUser: true }]);
    setInputMessage("");
    setIsTyping(true);
    try {
      const response = await chatWithAI(inputMessage, userId, replyHistory);
      setTimeout(() => {
        const replyMessage = response.data.data;
        setMessages((prev) => [...prev, { text: replyMessage, isUser: false }]);
        setReplyHistory(replyMessage);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className={`fixed bottom-4  right-4 z-50 `}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <HiChatBubbleOvalLeftEllipsis
              onClick={toggleChatBox}
              className="w-14 h-14 text-primary cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-1">
              <HiChatBubbleOvalLeftEllipsis className="text-primary w-5 h-5" />
              <p className="text-sm text-gray-700">Chat with our AI</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Box chat */}
      {isOpen && (
        <div
          className={`absolute bottom-16 right-0 w-96 h-[500px] flex flex-col justify-between bg-white shadow-lg rounded-lg p-4 z-50 transition-all duration-300 ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold flex items-center gap-1">
              Chat with
              <img className="w-5" src={logo} />
              <span className="text-primary">Job Finder</span>
            </div>
            <IoMdClose
              className="text-2xl text-gray-500 cursor-pointer hover:text-gray-800"
              onClick={toggleChatBox}
            />
          </div>

          {/* Chat Bubbles */}
          <div className="flex flex-col space-y-4 mb-4 overflow-y-auto max-h-[400px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    message.isUser
                      ? "bg-white text-black shadow-md border border-gray-200"
                      : "bg-primary/50 text-black"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Hoạt ảnh typing */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-16 h-16">
                  <Lottie animationData={typingAnimation} loop={true} />
                </div>
              </div>
            )}

            {/* Tham chiếu đến phần tử cuối cùng */}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input để nhập tin nhắn */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              className="text-white hover:text-primary hover:bg-white border border-primary"
            >
              <IoMdSend />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
