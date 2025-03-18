import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
config()


interface jwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: jwtPayload;
        }
    }
}


export const jwtMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log('inside verificaiton jwt')
        const token = req.cookies.access_token;
        if (!token) {
            res.status(401).json({ message: 'no token found' });
            return;
        }
        try {
            const secretKey = process.env.JWT_SECRET;
            if (!secretKey) {
                throw new Error('ACCESS_TOKEN_SECRET is not defined');
            }
            const decoded = jwt.verify(token, secretKey) as jwtPayload;
            req.user = decoded;
            next();
        } catch (error) {
            res.status(403).json({ message: 'failed to authenticate token' });
        }
    };
}