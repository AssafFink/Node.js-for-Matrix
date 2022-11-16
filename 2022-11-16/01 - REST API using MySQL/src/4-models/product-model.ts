import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class ProductModel {
    
    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public prodImage: UploadedFile;
    public imageName: string;

    public constructor(product: ProductModel) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
        this.prodImage = product.prodImage;
        this.imageName = product.imageName;
    }

    private static validationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        name: Joi.string().required().min(3).max(50),
        price: Joi.number().required().min(0).max(1000),
        stock: Joi.number().required().min(0).max(1000),
        prodImage: Joi.object().optional(),
        imageName: Joi.string().optional().min(10).max(100)
    });

    public validate(): string {
        const result = ProductModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default ProductModel;