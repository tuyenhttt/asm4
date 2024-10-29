const jwt = require("jsonwebtoken");
require("dotenv").config();

const encodeSecretKey = (secret) => {
  return Buffer.from(JSON.stringify(secret))
    .toString("base64")
    .replace(/=/g, "");
};

const generateToken = (user) => {
  const header = {
    alg: process.env.JWT_ALGORITHM || "HS256",
    typ: "JWT",
  };
  const payload = {
    userId: user._id,
    username: user.username,
    fullName: user.fullName,
    iat: Math.floor(Date.now() / 1000),
    expiresIn: process.env.JWT_EXPIRES_IN,
  };
  const encodeSecret = encodeSecretKey(process.env.JWT_SECRECT);
  return jwt.sign(payload, encodeSecret, { algorithm: header.alg });
};

const verifyToken = (token) => {
  try {
    const encodeSecret = encodeSecretKey(process.env.JWT_SECRECT);
    const decoded = jwt.verify(token, encodeSecret);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.expiresIn < currentTime) {
      throw new Error("Token has expired");
    }
    return decoded;
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new Error("Token is missing or invalid");
    } else if (error.name === "TokenExpiredError") {
      throw new Error("Token is missing or invalid");
    } else {
      throw new Error("Token is missing or invalid");
    }
  }
};

module.exports = { generateToken, verifyToken };
