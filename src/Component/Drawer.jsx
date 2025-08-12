import axios from "axios";
import { useEffect, useState } from "react";
import { FiMenu, FiHome, FiUser, FiSettings } from "react-icons/fi";
import AllchatData from "./AllchatData";

const Drawer = ({ collapsed, setCollapsed }) => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const allchtas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/allchats");
        setChat(response.data);
      } catch (err) {
        console.error("Error Asa", err);
      }
    };
    allchtas();
  }, []);

  return (
    <div>
      <div
        className={`text-black flex flex-col overflow-y-auto transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-4 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={24} />
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col mt-4 space-y-2">
          <a href="#" className="flex items-center gap-3 p-3 rounded">
            <FiHome size={24} />
            {!collapsed && <span>Home</span>}
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded">
            <FiUser size={24} />
            {!collapsed && <span>Profile</span>}
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded">
            <FiSettings size={24} />
            {!collapsed && <span>Settings</span>}
          </a>
        </nav>
      </div>
      <div>
        {!collapsed && (
          <main className="flex-1 p-6  transition-all duration-300 ease-in-out">
            <h1 className="text-2xl font-bold mb-4">Search History</h1>
            {chat.map((chat, index) => (
              <AllchatData key={index} chat={chat} />
            ))}
          </main>
        )}
      </div>
    </div>
  );
};

export default Drawer;
