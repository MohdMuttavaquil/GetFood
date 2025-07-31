import mongoose from "mongoose";

const userSchma = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    userCart: { type: mongoose.Schema.Types.Mixed, default: {}}
}, {minimize: false})

const userModel = mongoose.model.user || mongoose.model("user", userSchma)
export default userModel 