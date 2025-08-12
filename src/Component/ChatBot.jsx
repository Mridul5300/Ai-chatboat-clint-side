import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import animationloader from "../../public/loader.json";
import Drawer from "./Drawer";
import InputFrom from "./InputFrom";
import Chat from "./Chat";


const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your assistant. Ask me anything!", sender: "AI" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        userid: "id",
        messages: newMessages,
      });
      const reply = res.data.reply;
      setTimeout(() => {
        setMessages([...newMessages, { text: reply, sender: "AI" }]);
        setTyping(false);
      }, 1300);
    } catch (error) {
      console.error("Error calling Gemini API:", error.message);
      setMessages([
        ...newMessages,
        { text: "Sorry, something went wrong.", sender: "AI" },
      ]);
      setTyping(false);
    }
  };

  return (
    <div className="flex gap-4 mx-auto w-[1200px] min-h-screen transition-all duration-300">
      {/* Sidebar */}
      <div className="h-full max-h-screen overflow-y-auto">
        <Drawer collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Chat Content */}
      <div
        className={`flex flex-col transition-all duration-300 ${
          collapsed ? "w-[1000px]" : "w-[850px]"
        }`}
      >
        <div
          className="p-4 h-96  min-h-[435px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-100 flex flex-col gap-4"
          ref={scrollRef}
        >
          {messages.map((msg, index) => (
            <Chat key={index} msg={msg} />
          ))}

          {typing && (
            <div className="flex flex-col items-start">
              <div className="chat-bubble max-w-xs p-3 rounded-lg flex items-center justify-center">
                <Lottie
                  animationData={animationloader}
                  loop={true}
                  className="w-20"
                />
              </div>
              <time className="text-xs opacity-50">
                {new Date().toLocaleTimeString()}
              </time>
            </div>
          )}
        </div>
        {/* Input */}
        <InputFrom handleSend={handleSend} input={input} setInput={setInput} />
      </div>
    </div>
  );
};

export default ChatBot;
