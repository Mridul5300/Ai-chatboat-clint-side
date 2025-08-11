import { useState } from "react";
import { FiMenu, FiHome, FiUser, FiSettings } from "react-icons/fi";
const Drawer = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      {/* Sidebar */}
      <div
        className={` text-black flex flex-col transition-width duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-4 focus:outline-none hover:bg-gray-700"
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
          <a
            href="#"
            className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
          >
            <FiSettings size={24} />
            {!collapsed && <span>Settings</span>}
          </a>
        </nav>
      </div>
      {/* Main Content */}
      {!collapsed && (
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Search History</h1>
          <p>This is your search Story</p>
        </main>
      )}
    </div>
  );
};

export default Drawer;
