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


export const editProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.user;                                                  
        let updatedData = req.body;
        const product_image = req.file?.filename
        const product = await ProductModel.findById(id)
        if (!product) {
            throw ErrorResponse.notFound('Product not found')
        }
        if (product.addedBy.toString() !== userId) {
            throw ErrorResponse.unauthorized('Unauthorised to edit the product')
        }

        if (updatedData.brand) {
            const brandDocument = await brandModel.findOne({ brand_name: updatedData.brand })
            if (!brandDocument) {
                throw ErrorResponse.badRequest('brand not found')
            }
            if (updatedData.category && !JSON.parse(brandDocument.categories[0]).includes(updatedData.category)) {
                throw ErrorResponse.badRequest('category not found in brand')
            }
        }

        if (product_image) {
            updatedData = { ...updatedData, product_image };
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true })
        res.status(200).json({ message: 'product updated successfully', product: updatedProduct })

    } catch (error) {
        next(error)
    }
}


// export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params;
//         const userId = req.user;                                                  
//         const product_image = req.file?.filename
//         const product = await ProductModel.findById(id)
//         if (!product) {
//             throw ErrorResponse.notFound('Product not found')
//         }
//         if (product.addedBy.toString() !== userId) {
//             throw ErrorResponse.unauthorized('Unauthorised to edit the product')
//         }

//         if (updatedData.brand) {
//             const brandDocument = await brandModel.findOne({ brand_name: updatedData.brand })
//             if (!brandDocument) {
//                 throw ErrorResponse.badRequest('brand not found')
//             }
//             if (updatedData.category && !JSON.parse(brandDocument.categories[0]).includes(updatedData.category)) {
//                 throw ErrorResponse.badRequest('category not found in brand')
//             }
//         }

//         if (product_image) {
//             updatedData = { ...updatedData, product_image };
//         }

//         const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true })
//         console.log(updatedProduct,'updated product')
//         res.status(200).json({ message: 'product updated successfully', product: updatedProduct })

//     } catch (error) {
//         next(error)
//     }
// }