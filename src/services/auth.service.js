const userService = require("./user.service");
const jwt = require("../services/jwt.service");
const bcrypt = require("../utils/password.util");

const register = async (request) => {
  const existingUser = await userService.getByUserName(request.username);
  if (existingUser) {
    const error = new Error("Username already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hashPassword(request.password);
  const newUser = await userService.save({
    username: request.username,
    password: hashedPassword,
    fullName: request.fullName,
  });
  return {
    id: newUser._id,
    username: newUser.username,
    fullName: newUser.fullName,
  };
};

const login = async (request) => {
  const existingUser = await userService.getByUserName(request.username);
  if (!existingUser) {
    const error = new Error("Invalid username or password");
    error.statusCode = 400;
    throw error;
  }
  const decode_pass = await bcrypt.comparePassword(
    request.password,
    existingUser.password
  );
  if (!decode_pass) {
    const error = new Error("Invalid username or password");
    error.statusCode = 400;
    throw error;
  }
  const token_access = jwt.generateToken(existingUser);
  return token_access;
};

module.exports = {
  register,
  login,
};
