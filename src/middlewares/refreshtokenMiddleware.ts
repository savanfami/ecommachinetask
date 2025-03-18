import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
import { generateAccesstoken } from "../utils/generateToken";
import { userModel } from "../models/userMode";
config()


interface jwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: jwtPayload;
            accesstoken?:any
        }
    }
}


export const refreshTokenMiddleware = () => {
     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log('inside jwt refresh token')
        const token = req.cookies.refreshToken;
        if (!token) {
            return next({ status: 401, message: "no refresh token found" });
        }
        try {
            const secretKey = process.env.REFRESH_SECRET;
            if (!secretKey) {
                throw new Error('refresh token is not defined');
            }
            const decoded = jwt.verify(token, secretKey) as jwtPayload;
            const userId=decoded.id
            if (!decoded) {
                return next({ status: 401, message: "refresh token is invalid" });
            }
            const generateAccessToken = generateAccesstoken(userId as string)
            req.accesstoken=generateAccessToken
            next();
        } catch (error) {
            res.status(403).json({ message: 'failed to authenticate token' });
        }
    };
}