import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import { IoIosArrowRoundUp } from "react-icons/io";
import Lottie from "lottie-react";
import animationloader from "../../public/loader.json";
import Drawer from "./Drawer";
const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your assistant. Ask me anything!", sender: "AI" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef();

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
    <div className="w-[1200px] flex gap-10 mx-auto">
      {/* SideBar */}
      <div className="w-[300px]">
        <Drawer />
      </div>
      <div className="w-px bg-red-700"></div>

      {/* Chat Content */}
      <div className="w-[750px] flex flex-col">
        <div
          className="p-4   h-96 scrollbar-auto-hide overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-100 scrollbar-track-gray-100 scroll-smooth flex flex-col gap-4 space-y-4"
          ref={scrollRef}
        >
          {messages.map((msg, index) => (
            <Chat key={index} msg={msg} />
          ))}
          {typing && (
            <div className="flex flex-col items-start">
              <div className="chat-bubble max-w-xs text-black p-3 rounded-lg flex items-center justify-center">
                <Lottie
                  animationData={animationloader}
                  loop={true}
                  className="w-20 h-20"
                />
              </div>
              <time className="text-xs opacity-50">
                {new Date().toLocaleTimeString()}
              </time>
            </div>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative p-4 flex gap-2 "
        >
          <textarea
            className="textarea flex-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ease-in-out"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          {input.trim() && (
            <button
              type="submit"
              onClick={handleSend}
              className="bg-black btn right-6 bottom-6 mt-2 absolute text-white p-2 rounded-full transition-all  duration-300 transform opacity-0 animate-fade-slide-up"
            >
              <span className="text-3xl">
                {" "}
                <IoIosArrowRoundUp />
              </span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
