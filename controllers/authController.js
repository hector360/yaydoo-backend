
import Jwt from "jsonwebtoken";
import { services } from '../utils/services.js';
import UserModel from '../models/UserModel.js';
import { promisify } from "util";

export const authProtect = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res
                .status(401)
                .json({ message: "You are not logged in! Please log in to continue" });
        }

        const decoded = await promisify(Jwt.verify)(token, services.JWT_KEY);
        const currentUser = await UserModel.findById(decoded._id);
        if (!currentUser) {
            return res.status(401).json({
                message: "The user belonging to the token does no longer exist",
            });
        }
        req.user = currentUser;
        next();
    } catch (error) {
        console.log(error)
    }
}
