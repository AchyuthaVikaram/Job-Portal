import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated!",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token!",
                success: false,
            });
        }

        const id = decoded.userId;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found!",
                success: false,
            });
        }

        req.user = user; // Add user to the request object
        next(); // Proceed to the next middleware/route handler

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Server error during authentication!",
            success: false,
        });
    }
};

export default isAuthenticated;
