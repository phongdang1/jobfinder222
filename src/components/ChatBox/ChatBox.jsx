import React, { useState, useEffect, useRef } from "react";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoMdClose, IoMdSend } from "react-icons/io";
import { Button } from "../ui/button";
import typingAnimation from "../../assets/animation/typingAnimation.json";
import logo from "../../assets/images/JobFinder_logo.png"
import Lottie from "lottie-react";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [roleCode, setRoleCode] = useState(
    localStorage.getItem("roleCode") || null
  );

  const randomReplies = [
    "Sure! How can I help?",
    "We provide job-finding services.",
    "Can you elaborate more on that?",
    "Our team will assist you shortly.",
    "Thank you for reaching out!",
  ];

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages((prev) => [...prev, { text: inputMessage, isUser: true }]);
    setInputMessage("");
    setIsTyping(true);
    setTimeout(() => {
      const randomReply =
        randomReplies[Math.floor(Math.random() * randomReplies.length)];
      setMessages((prev) => [...prev, { text: randomReply, isUser: false }]);
      setIsTyping(false);
    }, 1500);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    setRoleCode(localStorage.getItem("roleCode"));
  }, [messages, isTyping, roleCode]);
  // useEffect(() => {
  //   if (roleCode) {
  //     localStorage.setItem("roleCode", roleCode);
  //   } else {
  //     localStorage.removeItem("roleCode");
  //   }
  // }, [roleCode]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 ${roleCode ? "block" : "hidden"}`}
    >
      {/* Icon Chat */}
      <HiChatBubbleOvalLeftEllipsis
        onClick={toggleChatBox}
        className="w-14 h-14 text-primary cursor-pointer"
      />

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
              <img className="w-5" src={logo}/>
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
