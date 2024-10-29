const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const userController = require('../controllers/user.controller');

router.get('/me', authMiddleware, userController.getProfile);
router.put('/me', authMiddleware, userController.updateProfile);

module.exports = router;
