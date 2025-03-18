import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { userModel } from "../models/userMode";
import { signUpvalidation } from "../utils/validator/signUpvalidation";
// import { generateAccesstoken, generateRefreshToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response, next: NextFunction):Promise<void>=> {
    try {
        const { error, value } = signUpvalidation.validate(req.body)
        const profileImage=req.file?.filename
        if (error) {
            next({ status: 400, message: error?.message });
        }
        const existingUser = await userModel.findOne({ email: value.email });
        if (existingUser) {
            return next({ statusCode: 409, message: 'E-mail already in use' });
        }
        const hashedPassword = await bcrypt.hash(value.password, 10);
        const user = new userModel({ username: value.username, email: value.email, password: hashedPassword,profileImage});
        await user.save();
        res.status(201).json({ message: "user registered successfully" });
    } catch (error) {
        next(error);    
    }
}