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


export const jwtMiddleware = (requiredRole?: string) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log('inside jwt')
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
            console.log(decoded,'decoded value from jwt')
            req.user = decoded;
            // if (requiredRole && req.user.role !== requiredRole) {
            //     res.status(403).json({ message: 'Access denied' });
            //     return
            // }
            next();
        } catch (error) {
            res.status(403).json({ message: 'failed to authenticate token' });
        }
    };
}