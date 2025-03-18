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

        const existingBrand = await brandModel.findOne({ brand_name });
        if (existingBrand) {
           throw ErrorResponse.conflict('brand already exist')
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


export const getAllBrand=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const brands=await brandModel.find().select('brand_name categories')
        if(brands.length===0){
            throw ErrorResponse.notFound('no brands found')
        }
        res.status(200).json({message:'brand fetched successfully',brands});
    } catch (error) {
        next(error)
    }
}