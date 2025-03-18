import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/common/ErrorResponse";


export const brandController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { brand_name, categories } = req.body
        const brand_logo = req.file
        if (!brand_name || !categories || !brand_logo) {
            throw ErrorResponse.badRequest('all fields required(brand_name,brand_logo,categories)')
        }

    } catch (error) {
        next(error)
    }
}