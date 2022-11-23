import mongoose from "mongoose";

// 1. Interface
export interface ICategoryModel extends mongoose.Document {
    name: string;
    description: string;
}

// 2. Schema
export const CategorySchema = new mongoose.Schema<ICategoryModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "Name too long"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "Missing description"],
        minlength: [2, "Description too short"],
        maxlength: [1000, "Description too long"],
        trim: true,
        unique: true
    }
}, { versionKey: false });

// 3. Model
export const CategoryModel = mongoose.model<ICategoryModel>("CategoryModel", CategorySchema, "categories");
