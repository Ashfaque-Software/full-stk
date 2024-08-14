import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] }, // Use enum for gender
    age: { type: Number, required: true } // Age as a number
},{
    versionKey:false,
    timestamps:true
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
