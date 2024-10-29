const Student = require('../models/student.model')

const save = async(request) => {
    return await Student.create(request);
}

const getById = async(id) => {
    return await Student.findById(id);
}

const getInfo = async(req, res) => {
    const myProfile = {
        fullname: "Huynh Thi Thanh Tuyen",
        studentCode: "QE170266"
    }
    return myProfile;
}

module.exports = {
    save,
    getById,
    getInfo
}