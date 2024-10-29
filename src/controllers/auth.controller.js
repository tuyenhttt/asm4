const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const userRegister = await authService.register(req.body);
    res.status(201).json({
      success: "true",
      message: "User registered successfully",
      data: userRegister,
    });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res
      .status(500)
      .json({ success: "false", message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const userLogin = await authService.login(req.body);
    res
      .status(200)
      .json({ success: true, message: "Login successful", token: userLogin });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res
      .status(500)
      .json({ success: "false", message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
