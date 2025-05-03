const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin credentials
  const adminEmail = "admin@example.com";
  const adminPassword = "admin123";

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check credentials
  if (email === adminEmail && password === adminPassword) {
    return res.status(200).json({
      message: "Login successful",
      token: "example-token-123456", // Replace with a real token in production
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = { loginUser };
