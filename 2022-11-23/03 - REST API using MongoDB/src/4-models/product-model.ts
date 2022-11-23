import mongoose from "mongoose";
import { CategoryModel } from "./category-model";

// 1. Interface describing our model:
export interface IProductModel extends mongoose.Document {
    // _id - don't need to specify.
    name: string;
    price: number;
    stock: number;
    categoryId: mongoose.Schema.Types.ObjectId;
}

// 2. Schema describing more things:
export const ProductSchema = new mongoose.Schema<IProductModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "Name too long"],
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },
    stock: {
        type: Number,
        required: [true, "Missing stock"],
        min: [0, "Stock can't be negative"],
        max: [1000, "Stock can't exceed 1000"]
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true}, // Get virtual fields when converting to JSON
    id: false // Don't duplicate _id into id
});

ProductSchema.virtual("category", {
    ref: CategoryModel, // Which model we're talking about
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

// 3. Model class - this is our model:
export const ProductModel = mongoose.model<IProductModel>("ProductModel", ProductSchema, "products"); // Model name, Model schema, DB collection
