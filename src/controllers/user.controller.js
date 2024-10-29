const userService = require("../services/user.service");

const getProfile = async (req, res) => {
  try {
    const userToken = req.user;
    const existingUser = await userService.getById(userToken.userId);
    if (!existingUser) {
      return res.status(401).json({ success: false, message: "no access" });
    }
    res.status(200).json({
      success: true,
      data: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        username: existingUser.username,
      },
    });
  } catch (error) {
    res.status(500).json({ success: "false", message: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userToken = req.user;
    const userUpdate = await userService.update(userToken.userId, req.body);
    if (!userUpdate) {
      return res.status(400).json({ status: false, message: "User information updated failed" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "User information updated successfully",
        data: userUpdate
      });
  } catch (error) {
    res.status(500).json({ success: "false", message: 'Internal server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
