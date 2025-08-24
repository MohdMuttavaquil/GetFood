import express from 'express'
import { cashOnDelivery, foodpayment, userOrder, varifypayment,  } from '../Controllers/orderController.js'
import authMiddleware from '../Middleware/auth.js'

const orderRoute = express.Router()

orderRoute.post("/payment", foodpayment)
orderRoute.post('/varify', authMiddleware, varifypayment)
orderRoute.post('/userorder', authMiddleware, userOrder)
orderRoute.post('/cash', authMiddleware, cashOnDelivery)

export default orderRoute