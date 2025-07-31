import orderModle from "../Models/orederSchema.js"
import userModel from "../Models/UserSchema.js"
import Razorpay from 'razorpay'
import crypto from 'crypto'

const razorpay = new Razorpay({
    key_id: process.env.ROAZERPAY_KEY_ID,
    key_secret: process.env.ROAZERPAY_KEY_SECRET
})

let id = 0

const foodpayment = async (req, res)=>{
    const { amount, data, items } = req.body
    
    const neworder = new orderModle({
      userid: req.body.userid,
      amount: amount,
      userInfo: data,
      item: items
    })
    await neworder.save()
    id = neworder._id
    await userModel.findByIdAndUpdate(req.body.userid, { userCart:{} })

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
  } = req.body;

  const body = `${order_id}|${payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.ROAZERPAY_KEY_SECRET) 
    .update(body)
    .digest('hex');

  if (expectedSignature === signature) {
    await orderModle.findByIdAndUpdate(id, {payment: true} );
    res.json({ status: 'success' });
  } else{
       await orderModle.findByIdAndDelete(id)
    res.status(400).json({ status: 'failure', message: 'Invalid signature' });
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


export { foodpayment, varifypayment, userOrder }