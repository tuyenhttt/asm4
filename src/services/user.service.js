const User = require("../models/user.model");

const save = async (student) => {
  return await User.create(student);
};

const getAll = async () => {
  return await User.find();
};

const getById = async (id) => {
  return await User.findById(id);
};

const getByUserName = async (username) => {
  return await User.findOne({ username: username });
};

const update = async (id, user) => {
  const userUpdate = await User.findByIdAndUpdate(id, user, { new: true });
  return {
    id: userUpdate._id,
    fullName: userUpdate.fullName,
    username: userUpdate.username
  }
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};


module.exports = {
    save,
    getAll,
    getById,
    getByUserName,
    update,
    deleteUser
}