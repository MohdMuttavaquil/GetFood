import orderModle from "../Models/orederSchema.js"
import userModel from "../Models/UserSchema.js"
import Razorpay from 'razorpay'
import crypto from 'crypto'

const razorpay = new Razorpay({
    key_id: process.env.ROAZERPAY_KEY_ID,
    key_secret: process.env.ROAZERPAY_KEY_SECRET
})


const foodpayment = async (req, res)=>{
    const { amount } = req.body
    
     const option = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,  
        }

    try {
       const order = await razorpay.orders.create(option)
       res.json(order)
    } catch (error) {
     console.log(error)
     res.json({success: false, message: " error"})   
    }

}


// for verify payment 
const varifypayment = async (req, res)=>{
    const {
    order_id,
    payment_id,
    signature,
    amount,
    data,
   items
  } = req.body;

  const body = `${order_id}|${payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.ROAZERPAY_KEY_SECRET) 
    .update(body)
    .digest('hex');

  if (expectedSignature === signature) {

   const neworder = new orderModle({
      userid: req.body.userid,
      amount: amount,
      userInfo: data,
      item: items
    })
    await neworder.save()
    await userModel.findByIdAndUpdate(req.body.userid, { userCart:{} })

    res.json({ status: 'success' });
  } else{
       await orderModle.findByIdAndDelete(id)
    res.status(400).json({ status: 'failure', message: 'Invalid signature' });
  }

}

// Cash on delivery orders

const cashOnDelivery = async (req, res)=>{
  try {
    const newOrder = new orderModle({
      userid: req.body.userid,
      amount: req.body.amount,
      userInfo: req.body.data,
      item: req.body.items,
      payment: "cash on delivery"
    })
    await newOrder.save()
    await orderModle.findByIdAndUpdate(req.body.userid, { userCart:{} })
    res.json({success: true, message: "Oeder place"})
  } catch (error) {
    console.log(error)
    res.json({success: false, message:"Error"})
  }
} 


// for gate user order 
const userOrder = async (req, res)=>{
  try {
    const userOrder = await orderModle.find({userid: req.body.userid})
    res.json({success: true, userOrder})
    
  } catch (error) {
    console.log(error)
    res.json({success: false, message: 'error'})
  }
  
}


export { foodpayment, varifypayment, cashOnDelivery, userOrder }