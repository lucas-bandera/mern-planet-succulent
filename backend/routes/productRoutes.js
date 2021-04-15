import express from 'express'
const router = express.Router()
import { getProductById, getProducts, getTopProducts } from '../controllers/productController.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route('/').get(getProducts)
router.route('/top').get(getTopProducts)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.route('/:id').get(getProductById)




export default router
