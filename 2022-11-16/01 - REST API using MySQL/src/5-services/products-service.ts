import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/error-models";
import ProductModel from "../4-models/product-model";
import { v4 as uuid } from "uuid";
import safeDelete from "../2-utils/safe-delete";

// Get all products:
async function getAllProducts(): Promise<ProductModel[]>  {
    const sql = `
        SELECT
            ProductID AS id,
            ProductName AS name,
            UnitPrice AS price,
            UnitsInStock AS stock,
            imageName
        FROM products
    `;
    const products = await dal.execute(sql);
    return products;   
}

// Get one product
async function getOneProduct(id: number): Promise<ProductModel>  {
    // const sql = `
    //     SELECT
    //         ProductID AS id,
    //         ProductName AS name,
    //         UnitPrice AS price,
    //         UnitsInStock AS stock,
    //         imageName
    //     FROM products
    //     WHERE ProductID = ${id}
    // `;

    const sql = `
    SELECT
        ProductID AS id,
        ProductName AS name,
        UnitPrice AS price,
        UnitsInStock AS stock,
        imageName
    FROM products
    WHERE ProductID = ?
`;
    const products = await dal.execute(sql, [id]);
    const product = products[0];
    if(!product) throw new ResourceNotFoundError(id);
    return product;
}

// Add new product:
async function addProduct(product: ProductModel): Promise<ProductModel> {
    const error = product.validate();
    if(error) throw new ValidationError(error);
    // const sql = `INSERT INTO products (ProductName, UnitPrice, UnitsInStock) VALUES('${product.name}', ${product.price}, ${product.stock})`;
    
    if(product.prodImage) {
        // GUID - Global Unique IDentifier
        // UUID - Universal Unique IDentifier
        const extension = product.prodImage.name.substring(product.prodImage.name.lastIndexOf("."));
        product.imageName = uuid() + extension // 36 chars
        await product.prodImage.mv("./src/1-assets/images/" + product.imageName);
        delete product.prodImage;
    }

    const sql = "INSERT INTO products (ProductName, UnitPrice, UnitsInStock, imageName) VALUES(?, ?, ?, ?)";
    const info: OkPacket = await dal.execute(sql, [product.name, product.price, product.stock, product.imageName]);
    product.id = info.insertId;
    return product;
}

// Update product:
async function updateProduct(product: ProductModel): Promise<ProductModel> {
    const error = product.validate();
    if(error) throw new ValidationError(error);

    if(product.prodImage) {
        safeDelete(product.imageName);
        const extension = product.prodImage.name.substring(product.prodImage.name.lastIndexOf("."));
        product.imageName = uuid() + extension // 36 chars
        await product.prodImage.mv("./src/1-assets/images/" + product.imageName);
        delete product.prodImage;
    }

    const sql = "UPDATE products SET ProductName = ?, UnitPrice = ?, UnitsInStock = ?, imageName = ? WHERE ProductID = ?";
    const info: OkPacket = await dal.execute(sql, [product.name, product.price, product.stock, product.imageName, product.id]);
    if(info.affectedRows === 0) throw new ResourceNotFoundError(product.id);
    return product;
}

// Delete product:
async function deleteProduct(id: number): Promise<void> {
    const productToDelete = await getOneProduct(id);
    safeDelete(productToDelete.imageName);
    const sql = "DELETE FROM products WHERE ProductID = ?";
    const info: OkPacket = await dal.execute(sql, [id]);
    if(info.affectedRows === 0) throw new ResourceNotFoundError(id);
}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct
};

