const Joi = require("joi");
const BaseModel = require("./base-model");

class ProductModel extends BaseModel {

    constructor(product) {
        super(product.id);
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
    }

    static #postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        name: Joi.string().required().min(2).max(100).regex(/^[A-Z].*$/).custom(BaseModel.multipleSpacesValidation),
        price: Joi.number().required().min(0).max(10000),
        stock: Joi.number().required().integer().min(0).max(10000)
    }).error(BaseModel.customErrors);

    static #putValidationSchema = Joi.object({
        id: Joi.number().required().integer().positive(),
        name: Joi.string().required().min(2).max(100).regex(/^[A-Z].*$/).custom(BaseModel.multipleSpacesValidation),
        price: Joi.number().required().min(0).max(10000),
        stock: Joi.number().required().integer().min(0).max(10000)
    }).error(BaseModel.customErrors);

    static #patchValidationSchema = Joi.object({
        id: Joi.number().required().integer().positive(),
        name: Joi.string().optional().min(2).max(100).regex(/^[A-Z].*$/).custom(BaseModel.multipleSpacesValidation),
        price: Joi.number().optional().min(0).max(10000),
        stock: Joi.number().optional().integer().min(0).max(10000)
    }).error(BaseModel.customErrors);

    validatePost() {
        const result = ProductModel.#postValidationSchema.validate(this, { abortEarly: false });
        return result.error?.details.map(err => err.message); // For returning a single string containing all errors: result.error?.message
    }

    validatePut() {
        const result = ProductModel.#putValidationSchema.validate(this, { abortEarly: false });
        return result.error?.details.map(err => err.message);
    }

    validatePatch() {
        const result = ProductModel.#patchValidationSchema.validate(this, { abortEarly: false });
        return result.error?.details.map(err => err.message);
    }
}

module.exports = ProductModel;