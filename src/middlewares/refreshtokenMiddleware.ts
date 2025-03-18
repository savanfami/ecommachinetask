import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
import { generateAccesstoken } from "../utils/generateToken";
import { userModel } from "../models/userMode";
config()


interface jwtPayload {
    userId: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        accesstoken?: string;  
    }
}


export const refreshTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshtoken;
    if (!token) {
        return next({ status: 401, message: "no refresh token found" });
    }
    try {
        const secretKey = process.env.REFRESH_SECRET;
        if (!secretKey) {
            throw new Error('refresh token is not defined');
        }
        const decoded = jwt.verify(token, secretKey) as jwtPayload;
        const userId = decoded.userId
        if (!decoded) {
            return next({ status: 401, message: "refresh token is invalid" });
        }
        const generateAccessToken = generateAccesstoken(userId as string)
        req.accesstoken = generateAccessToken
        next();
    } catch (error) {
        res.status(403).json({ message: 'failed to authenticate token' });
    }
};