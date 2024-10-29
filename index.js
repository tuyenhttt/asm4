const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose')
const connectDB = require('./config/connectDatabase.config')
const authRouter = require('./src/routes/auth.route');
const userRouter = require('./src/routes/user.route');
const studentRouter = require('./src/routes/student.route');
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//connect
connectDB();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

//định nghĩa router
app.use(`${process.env.API_AUTH_DOMAIN}`, authRouter);
app.use(`${process.env.API_USER_DOMAIN}`, userRouter);
app.use(`${process.env.API_STUDENT_DOMAIN}`, studentRouter);

app.get('/info', (req, res) => {
    const myProfile = {
        fullname: "Huynh Thi Thanh Tuyen",
        studentCode: "QE170266"
    }
    res.json({data: myProfile})
});