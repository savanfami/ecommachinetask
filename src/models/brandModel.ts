import mongoose, { Document, Schema } from "mongoose";


interface IBrand extends Document {
    brand_name: string;
    brand_logo: string;
    categories: string[];
    createdBy: Schema.Types.ObjectId;
}

const brandSchema = new Schema<IBrand>(
    {
        brand_name: { type: String, required: true, unique: true },
        brand_logo: { type: String, required: true },
        categories: { type: [String], required: true },
        createdBy: {
            type: Schema.Types.ObjectId,
            required: [true, 'creator ID is required'],
        }
    },
    { timestamps: true }
)


export const brandModel = mongoose.model<IBrand>('brand', brandSchema)