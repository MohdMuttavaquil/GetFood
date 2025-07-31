import mongoose from "mongoose";

export const connectDb = async ()=>{
  await mongoose.connect(process.env.MONGOOBD_CONACTION).then(()=>{console.log("db connected ")})
}
 