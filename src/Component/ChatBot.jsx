import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import animationloader from "../../public/loader.json";
import Drawer from "./Drawer";
import InputFrom from "./InputFrom";
import Chat from "./Chat";
import { FiMenu } from "react-icons/fi";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your assistant. Ask me anything!", sender: "AI" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef();
  const [open, setOpen] = useState(false);
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
        messages: input,
      });
      const reply = res.data.reply;
      setTimeout(() => {
        setMessages([...newMessages, { text: reply, sender: "AI" }]);
        setTyping(false);
      }, 1300);
    } catch (error) {
      console.error("Error calling API:", error.message);
      setMessages([
        ...newMessages,
        { text: "Sorry, something went wrong.", sender: "AI" },
      ]);
      setTyping(false);
    }
  };

  return (
    <div className="flex relative lg:w-[1200px] mx-auto h-screen">
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute top-6 left-0 z-40 p-2 rounded-md lg:hidden  bg-white shadow"
        />
      )}

      {/* Mobile Menu Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="absolute top-2 left-2 z-40 lg:hidden p-2 rounded-md"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Drawer */}
      {/* Drawer */}
      <div
        className={`
    fixed top-0 left-0 h-full z-40 transition-all duration-300
    ${collapsed ? "w-20" : "w-64"}
    ${open ? "translate-x-0 " : "-translate-x-full"}  /* mobile view */
    lg:static lg:translate-x-0  lg:flex-shrink-0   /* tablet/desktop always open */
    bg-white shadow-md
  `}>
        <div className="h-full overflow-y-auto">
          <Drawer
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            open={open}
            setOpen={setOpen}  />
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col transition-all duration-300 ml-0 lg:ml-0 pt-4 lg:pt-0">
        {/* Messages */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div
            className="flex-1 p-2 overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            ref={scrollRef}
          >
            {messages.map((msg, index) => (
              <Chat key={index} msg={msg} />
            ))}

            {typing && (
              <div className="flex flex-col items-start">
                <div className="chat-bubble max-w-xs p-2 rounded-lg flex items-center justify-center bg-gray-200">
                  <Lottie
                    animationData={animationloader}
                    loop
                    className="w-16"
                  />
                </div>
                <time className="text-xs opacity-50">
                  {new Date().toLocaleTimeString()}
                </time>
              </div>
            )}
          </div>

          {/* Input section */}
          <div className="p-2 border-t">
            <InputFrom
              handleSend={handleSend}
              input={input}
              setInput={setInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
