import express from 'express'
import { connectDb } from './Config/database.js'
import userRouter from './Routes/userRoute.js'
import foodRoute from './Routes/foodRoute.js'
import 'dotenv/config' 
import cartRoute from './Routes/cartRoute.js'
import orderRoute from './Routes/orderRouct.js'
import cors from 'cors'


const app = express()
const port = process.env.PORT || 3000

// Middleware 
app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/food', foodRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)

// Database Connection 
connectDb();

app.get('/', (req,res)=>{
  res.send("app is running")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
