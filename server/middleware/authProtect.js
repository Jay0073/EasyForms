const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SecretKey = process.env.JWT_SECRET

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify token
    const decoded = jwt.verify(token, SecretKey || 'your_name');

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };