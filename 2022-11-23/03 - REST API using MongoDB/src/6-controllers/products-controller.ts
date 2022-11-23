import express, { NextFunction, Request, Response } from "express";
import { ProductModel } from "../4-models/product-model";
import productsService from "../5-services/products-service";

const router = express.Router();

router.get("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsService.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const product = await productsService.getOneProduct(_id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await productsService.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        const product = new ProductModel(request.body);
        const updatedProduct = await productsService.updateProduct(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.patch("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        const product = new ProductModel(request.body);
        const updatedProduct = await productsService.updatePartialProduct(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await productsService.deleteProduct(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/products-by-price/:minPrice/:maxPrice", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const minPrice = +request.params.minPrice;
        const maxPrice = +request.params.maxPrice;
        const products = await productsService.getProductsByPrice(minPrice, maxPrice)
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/unique-products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const minStock = +request.query.minStock;
        const maxPrice = +request.query.maxPrice;
        const products = await productsService.getUniqueProducts(minStock, maxPrice);
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;