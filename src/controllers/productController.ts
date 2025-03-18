import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/common/ErrorResponse";
import { ProductModel } from "../models/productMode";
import { brandModel } from "../models/brandModel";

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { product_name, description, category, brand, price } = req.body
        const product_image = req.file?.filename
        const userId = req.user
        if (!product_name || !description || !price || !category || !brand || !product_image) {
            throw ErrorResponse.badRequest('Field name missing: Ensure all required fields are provided.')
        }

        const brandDocument = await brandModel.findOne({ brand_name: brand });
        console.log(brandDocument, 'brandexist')
        if (!brandDocument) {
            throw ErrorResponse.notFound('brand not found ')
        }
        if (!JSON.parse(brandDocument.categories[0]).includes(category)) {
            throw ErrorResponse.notFound('Product category not found in brand category');
          }
        const product = new ProductModel({
            product_name,
            description,
            price,
            category,
            brand,
            product_image,
            addedBy: userId
        });
        await product.save()
        res.status(201).json({ message: 'product created successfully', product })

    } catch (error) {
        next(error)
    }
}