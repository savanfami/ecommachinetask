import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { userModel } from "../models/userMode";
import { signUpvalidation } from "../utils/validator/signUpvalidation";
import { loginValidator } from "../utils/validator/loginValidator";
import { generateAccesstoken, generateRefreshToken } from "../utils/generateToken";
import mongoose, { Types } from "mongoose";

export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { error, value } = signUpvalidation.validate(req.body)
        const profilephoto = req.file?.filename
        if (error) {
            return next({ status: 400, message: error?.message });
        }
        const existingUser = await userModel.findOne({ email: value.email });
        if (existingUser) {
            return next({ statusCode: 409, message: 'E-mail already in use' });
        }
        const hashedPassword = await bcrypt.hash(value.password, 10);
        const user = new userModel({ username: value.username, email: value.email, password: hashedPassword, profilephoto });
        await user.save();
        res.status(201).json({ message: "user registered successsfully" });
    } catch (error) {
        next(error);
    }
}


export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { error, value } = loginValidator.validate(req.body)
        if (error) {
            return next({ status: 400, message: error.message });
        }
        const user = await userModel.findOne({ email: value.email });
        if (!user) {
            return next({ status: 401, message: 'no user found' });
        }

        const isValidPassword = await bcrypt.compare(value.password, user.password);
        if (!isValidPassword) {
            return next({ status: 401, message: 'Invalid email or password' });
        }
        const accessToken = generateAccesstoken(user._id as string)
        const refreshToken = generateRefreshToken(user._id as string)

        res.cookie('accesstoken', accessToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        });
        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            sameSite: 'lax',
        });
        res.status(200).json({
            message: 'Login successful'
        });
    } catch (error) {
        next(error);
    }
}


export const refreshTokenController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const access_token = req.accesstoken
        if (!access_token) return next({ status: 401, message: 'no access token found' })
        res.cookie('accesstoken', access_token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        });
        res.status(200).json({
            message: 'access token created successfully'
        });
    } catch (error) {
        next(error);
    }
}


export const toggleBlock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const objectId: Types.ObjectId = new mongoose.Types.ObjectId(id);
        const userId = req.user
        const user = await userModel.findById(userId);
        if (user?.blockedUsers) {
            const isBlocked = user.blockedUsers.includes(objectId);
            if (isBlocked) {
                user.blockedUsers = user.blockedUsers.filter(
                    (id) => id !== id
                );
            } else {
                user.blockedUsers.push(objectId);
            }
            await user.save();
            res.status(200).json({
                message: isBlocked ? "User unblocked successfully" : "User blocked successfully"
            });
        }
    } catch (error) {
        next(error)
    }
}