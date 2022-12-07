import express, { Request, Response, NextFunction } from "express";
import blockNonLoggedIn from "../3-middleware/block-non-logged-in";
import productsService from "../5-services/products-service";

const router = express.Router();

router.get("/products", blockNonLoggedIn ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsService.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;