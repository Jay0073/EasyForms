import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import AuthForm from "./AuthForm";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center px-16 sticky top-0 z-50">
      <a href="/" className="text-4xl font-bold cursor-pointer text-blue-600">
        EasyForms
      </a>

      <div className="flex items-center gap-6">
        <a
          href="/allforms"
          className="text-gray-700 hover:text-blue-600 font-semibold text-[18px]"
        >
          AllForms
        </a>
        <a
          href="/newform"
          className="text-gray-700 hover:text-blue-600 font-semibold text-[18px]"
        >
          NewForm
        </a>

        {token ? (
          <div className="flex items-center gap-2">
            <FaUserCircle
              className="text-4xl text-blue-600 cursor-pointer"
              title="Profile"
            />
            <button
              onClick={logout}
              className="text-m text-white font-semibold cursor-pointer border-2 px-3 py-1.5 rounded-xl bg-red-500 ml-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </div>

      <AuthForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Navbar;
