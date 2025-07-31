import userModel from "../Models/UserSchema.js"

const addToCart = async (req, res)=>{
  try {
    let user = await userModel.findById(req.body.userid)
    let cartData = await user.userCart
   
   if (!cartData[req.body.id]) {
    cartData[req.body.id] = 1
   }
   else{
    cartData[req.body.id] += 1
   }
     await userModel.findByIdAndUpdate(req.body.userid, {userCart:cartData})
    res.json({success: true, message:"Item add in Cart"})
  } catch (error) {
    console.log(error)
    res.json({success: false, message:"ther is error"})
  }

}

const remoevToCart = async (req, res)=>{
  try {
    let user = await userModel.findById( req.body.userid)
    let cartData = await user.userCart

    if (cartData[req.body.id]>0) {
      cartData[req.body.id] = 0
    }

     await userModel.findByIdAndUpdate(req.body.userid, {userCart:cartData})
    res.json({success: true, message:"Item remove in Cart"})
  } catch (error) {
    console.log(error)
    res.json({success: false, message:"error"})
  }

}

const getCart = async (req, res)=>{
  try {
    let user = await userModel.findById(req.body.userid)
    let cartData = await user.userCart
    res.json({success: true, cartData})
    
  } catch (error) {
    console.log(error)
    res.json({success: false, message:"error"})
  }

}

export {addToCart, remoevToCart, getCart}