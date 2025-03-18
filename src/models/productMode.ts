import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
  product_name: string;
  description?: string;
  price: string;
  category: string;
  brand: string;
  product_image: string;
  addedBy: Schema.Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    product_name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    product_image: {
      type: String,
      trim: true,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      required: [true, 'creator ID is required'],
    },
  },
  {
    timestamps: true,
  }
);


export const ProductModel = mongoose.model<IProduct>('product', productSchema);