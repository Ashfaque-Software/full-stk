import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js"; // Note the .js extension

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { name, email, password, age, gender } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(500).json({ "msg": "internal server error" });
            }
            const user = new userModel({
                name,
                email,
                password: hash, // Save hashed password
                age,
                gender
            });
            await user.save();
            res.status(201).json({ message: "user registered successfully" });
        });
    } catch (error) {
        res.status(501).json({ message: `error while registering user ${error}` });
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "user not found" });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ msg: "internal server error" });
            }
            if (result) {
                const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
                return res.status(200).json({ message: "user logged in successfully", token });
            } else {
                return res.status(401).json({ message: "invalid password" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: `error login ${error}` });
    }
});

export default userRouter;
