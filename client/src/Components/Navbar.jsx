import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!loginData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!loginData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const res = await axios.post("/api/users/login", loginData);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setIsModalOpen(false);
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error for the field being edited
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLoginData({ email: "", password: "" });
    setErrors({ email: "", password: "" });
  }

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center px-16">
      <h1 className="text-3xl font-bold text-blue-600">EasyForms</h1>

      <div className="flex items-center gap-6">
        <a href="/" className="text-gray-700 hover:text-blue-600 font-semibold text-[18px]">AllForms</a>
        <a href="/newform" className="text-gray-700 hover:text-blue-600 font-semibold text-[18px]">NewForm</a>

        {token ? (
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-4xl text-blue-600 cursor-pointer" title="Profile" />
            <button onClick={logout} className="text-m text-white font-semibold cursor-pointer border-2 px-3 py-1.5 rounded-xl bg-red-500 ml-2">Logout</button>
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

      {/* Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 text-4xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <h3>Email</h3>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
              className={`w-full mb-1 px-4 py-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-red-500 text-sm mb-3">{errors.email}</p>}
            <h3>Password</h3>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              className={`w-full mb-1 px-4 py-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.password && <p className="text-red-500 text-sm mb-3">{errors.password}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-3"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;