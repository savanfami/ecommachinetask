import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { userModel } from "../models/userMode";
// import { generateAccesstoken, generateRefreshToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "user registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "user registration failed", error });
    }
}