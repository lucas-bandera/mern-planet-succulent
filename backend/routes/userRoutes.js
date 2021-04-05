import express from 'express'
const router = express.Router()
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', authUser)

router.route('/profile')
    .get(protect, getUserProfile)


export default router
