import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/common/ErrorResponse";
import { brandModel } from "../models/brandModel";


export const addBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { brand_name, categories } = req.body
        const userId = req.user
        const brand_logo = req.file?.filename
        if (!brand_name || !categories || !brand_logo) {
            throw ErrorResponse.badRequest('all fields required(brand_name,brand_logo,categories)')
        }

        const newBrand = new brandModel({
            brand_name,
            brand_logo,
            categories,
            createdBy: userId
        })

        await newBrand.save()
        res.status(201).json({ message: 'brand created successfully' })

    } catch (error) {
        next(error)
    }
}

