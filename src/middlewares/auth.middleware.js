const jwtService = require("../services/jwt.service");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Token is missing or invalid" });
  }
  try {
    const decode = jwtService.verifyToken(token);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = authMiddleware;