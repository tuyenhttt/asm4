const studentService = require("../services/student.service");

const create = async (req, res) => {
  try {
    const student = await studentService.save(req.body);
    if(!student) {
        return res.status(400).json({success: false, message: 'Create student failed'});
    }
    res.status(200).json({success: true, 
        message: "Create student successfully",
        data: {
            id: student._id,
            fullName: student.fullName,
            studentCode: student.studentCode
        }
    })
  } catch (error) {
    res.status(500).json({success: false, message: 'Internal server error'})
  }
};

const myProfile = async (req, res) => {
    try {
        const myProfile = await studentService.getInfo();
        if(!myProfile) {
            return res.status(400).json({success: false, message: 'No profile'})
        }
        res.json({data: myProfile});
    } catch(error) {
        res.status(500).json({message: "Internal server error"})
    }
}
module.exports = {
    create,
    myProfile
}
