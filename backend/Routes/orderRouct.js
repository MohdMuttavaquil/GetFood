import express from 'express'
import { foodpayment, userOrder, varifypayment,  } from '../Controllers/orderController.js'
import authMiddleware from '../Middleware/auth.js'

const orderRoute = express.Router()

orderRoute.post("/payment", authMiddleware, foodpayment)
orderRoute.post('/varify', varifypayment)
orderRoute.post('/userorder', authMiddleware, userOrder)

export default orderRoute