import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { ErrorResponse } from "../utils/common/ErrorResponse";
config();

interface jwtPayload {
    userId: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: string;  
    }
}

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction)=> {
    const token = req.cookies.accesstoken;
    if (!token) {
        return next({ statusCode: 404, message: 'No token Found' });
    }
    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error("ACCESS_TOKEN_SECRET is not defined");
        }
        const decoded = jwt.verify(token, secretKey) as jwtPayload;
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({ message: "failed to authenticate token" });
    }
};