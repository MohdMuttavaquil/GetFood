import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userid: {type: String, required: true},
    item: {type: Array, required: true}, 
    amount: {type: Number, required: true},
    userInfo: {type: Object, required: true},
    status: {type: String, default: "Order processing"},
    date: {type: Date, default: Date.now()},
    payment: {type: Boolean, default: false}
})

const orderModle = mongoose.model.order || mongoose.model("order", orderSchema)
export default orderModle