import mongoose from "mongoose";

const item = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    image: String,
    desc: String
},
    { collection: "Itemlist", strict: false }
)

export const itemmodle = mongoose.model("itemlist", item)