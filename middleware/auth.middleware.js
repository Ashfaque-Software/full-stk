import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js"; // Use .js extension

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ msg: "Invalid token, please login first" });
        }
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default auth;
