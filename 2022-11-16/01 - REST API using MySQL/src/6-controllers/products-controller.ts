import express, { NextFunction, Request, Response } from "express";
import path from "path";
import ProductModel from "../4-models/product-model";
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

router.get("/products/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const product = await productsService.getOneProduct(id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.prodImage = request.files?.prodImage;
        const product = new ProductModel(request.body);
        const addedProduct = await productsService.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/products/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.prodImage = request.files?.prodImage;
        request.body.id = request.params.id;
        const product = new ProductModel(request.body);
        const updatedProduct = await productsService.updateProduct(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/products/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await productsService.deleteProduct(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/products/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        console.log(absolutePath);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;