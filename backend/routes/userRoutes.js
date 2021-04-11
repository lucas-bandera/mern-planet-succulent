import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', authUser)

// @desc    Register new user & get token
// @route   POST /api/users
// @access  Public
router.route('/').post(registerUser)

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)


export default router
