import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/common/ErrorResponse";
import { ProductModel } from "../models/productMode";
import { brandModel } from "../models/brandModel";
import { queryObject } from "../utils/types";
import { userModel } from "../models/userMode";
import mongoose from "mongoose";

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
        if (!brandDocument.categories.includes(category)) {
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
            if (updatedData.category && !brandDocument.categories.includes(updatedData.category)) {
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


export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.user;
        const product = await ProductModel.findById(id);
        if (!product) {
            throw ErrorResponse.notFound('no product found with the provided id')
        }
        if (product.addedBy.toString() !== userId) {
            throw ErrorResponse.unauthorized('Unauthorised to delete the product')
        }
        await ProductModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'product deleted successfully' })
    } catch (error) {
        next(error)
    }
}

export const allProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user;
        let query: any = {};
        if (req.query.brand) query.brand = req.query.brand;
        if (req.query.category) query.category = req.query.category;

        const sortField = req.query.sortBy === "price" ? "price" : "product_name";
        const sortOrder = req.query.order === "desc" ? -1 : 1;

        //users who have blocked the current logged in user
        const usersBlockingMe = await userModel.find({
            blockedUsers: { $in: [userId] }
        }).select('_id');

        const blockedByUserIds = usersBlockingMe.map(user => user._id);
        if (blockedByUserIds.length > 0) {
            query.addedBy = { $nin: blockedByUserIds };
        }

        const products = await ProductModel.find(query)
            .sort({ [sortField]: sortOrder });
    
        if(products.length===0){
            throw ErrorResponse.notFound('No products found matching the search criteria ')
        }
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};