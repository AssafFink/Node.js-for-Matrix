import { ResourceNotFoundError, ValidationError } from "../4-models/error-models";
import { IProductModel, ProductModel } from "../4-models/product-model";

// Get all products:
async function getAllProducts(): Promise<IProductModel[]> {

    // Get all products without virtual fields: 
    // return ProductModel.find().exec();

    // Get all products with virtual field named "category":
    return ProductModel.find().populate("category").exec();
}

// Get one product: 
async function getOneProduct(_id: string): Promise<IProductModel> {
    const product = await ProductModel.findById(_id).exec();
    if (!product) throw new ResourceNotFoundError(_id);
    return product;
}

// Add new product:
async function addProduct(product: IProductModel): Promise<IProductModel> {
    const error = product.validateSync();
    if (error) throw new ValidationError(error.message);
    return product.save();
}

// Update product:
async function updateProduct(product: IProductModel): Promise<IProductModel> {
    const error = product.validateSync();
    if (error) throw new ValidationError(error.message);

    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec();
    if (!updatedProduct) throw new ResourceNotFoundError(product._id);

    return updatedProduct;
}

// Update product:
async function updatePartialProduct(product: IProductModel): Promise<IProductModel> {

    const error = product.validateSync(["price", "stock"]);
    if (error) throw new ValidationError(error.message);

    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec();
    if (!updatedProduct) throw new ResourceNotFoundError(product._id);

    return updatedProduct;
}

// Get one product: 
async function deleteProduct(_id: string): Promise<void> {
    const deleteProduct = await ProductModel.findByIdAndDelete(_id).exec();
    if (!deleteProduct) throw new ResourceNotFoundError(_id);
}

// Mongo Query Language:

// Get products by price: 
async function getProductsByPrice(minPrice: number, maxPrice: number): Promise<IProductModel[]> {

    // SELECT * FROM products WHERE price BETWEEN 10 AND 20:
    // return ProductModel.find({ price: { $gte: minPrice, $lte: maxPrice } }).exec();

    // SELECT _id, name, price FROM products WHERE price BETWEEN 10 AND 20:
    // return ProductModel.find({ price: { $gte: minPrice, $lte: maxPrice } }, ["name", "price"]).exec();

    // SELECT name, price FROM products WHERE price BETWEEN 10 AND 20 ORDER BY price:
    // return ProductModel.find({ price: { $gte: minPrice, $lte: maxPrice } }, { name: true, price: true, _id: false }).exec();

    // SELECT name, price FROM products WHERE price BETWEEN 10 AND 20:
    // return ProductModel.find({
    //     price: { $gte: minPrice, $lte: maxPrice } // Filter
    // },
    //     { name: true, price: true, _id: false },  // Projection
    //     { sort: { price: 1 } } // Options
    // ).exec();

    // SELECT name, price FROM products WHERE price = 10 OR price = 20:
    return ProductModel.find({
        $or: [{ price: 10 }, { price: 20 }] // Filter
    },
        { name: true, price: true, _id: false },  // Projection
        { sort: { price: 1 } } // Options
    ).exec();
}

async function getUniqueProducts(minStock: number, maxPrice: number): Promise<IProductModel[]> {

    // SELECT name, price, stock FROM products WHERE stock > 0 AND price < 50 ORDER BY price DESC
    return ProductModel.find({
        stock: { $gt: minStock }, price: { $lt: maxPrice } // Filter
    },
        { name: true, price: true, stock: true, _id: false },  // Projection
        { sort: { price: -1 } } // Options
    ).exec();

}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    updatePartialProduct,
    getProductsByPrice,
    getUniqueProducts
};

