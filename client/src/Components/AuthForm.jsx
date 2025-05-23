import React, { useState } from "react";
import axios from "axios";
import { FaGoogle, FaMicrosoft, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AuthForm = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoginMode, setIsLoginMode] = useState(true);

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

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

    if (!isLoginMode) {
      if (!signupData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
        isValid = false;
      } else if (signupData.password !== signupData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const res = await axios.post("/api/users/login", loginData);
      localStorage.setItem("token", res.data.token);
      onLoginSuccess(res.data.token);
      onClose();
      window.location.href = "/";
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;

    try {
      const res = await axios.post("/api/users/signup", signupData);
      localStorage.setItem("token", res.data.token);
      onLoginSuccess(res.data.token);
      onClose();
      window.location.href = "/";
    } catch (error) {
      alert("Signup failed");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (isLoginMode) {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    } else {
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const closeModal = () => {
    onClose();
    setLoginData({ email: "", password: "" });
    setSignupData({ email: "", password: "", confirmPassword: "" });
    setErrors({ email: "", password: "", confirmPassword: "" });
    setIsLoginMode(true);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-gray-500 text-5xl cursor-pointer hover:text-gray-700 transition-colors"
            >
              &times;
            </button>

            <div className="mb-4">
              <h2 className="text-3xl font-bold text-gray-800">
                {isLoginMode ? "Welcome Back!" : "Create Account"}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-l font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={isLoginMode ? loginData.email : signupData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-l mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-l font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={
                      isLoginMode ? loginData.password : signupData.password
                    }
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-l mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {!isLoginMode && (
                  <div>
                    <label className="block text-l font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-l mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                <button
                  onClick={isLoginMode ? handleLogin : handleSignup}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-semibold"
                >
                  {isLoginMode ? "Sign In" : "Create Account"}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <FaGoogle className="text-red-500" />
                  <span>Google</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("microsoft")}
                  className="flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <FaMicrosoft className="text-blue-500" />
                  <span>Microsoft</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("github")}
                  className="flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <FaGithub className="text-gray-800" />
                  <span>GitHub</span>
                </button>
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  {isLoginMode
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthForm;
