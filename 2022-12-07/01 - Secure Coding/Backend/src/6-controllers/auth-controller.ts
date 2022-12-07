import express, { Request, Response, NextFunction } from "express";
import blockNonLoggedIn from "../3-middleware/block-non-logged-in";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import authService from "../5-services/auth-service";

const router = express.Router();

router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authService.register(user);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});


router.get("/users/:id", blockNonLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const user = await authService.getOneUser(id);
        response.json(user);
    }
    catch (err: any) {
        next(err);
    }
});

router.patch("/users/:id", blockNonLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;
        const user = new UserModel(request.body);
        const updatedUser = await authService.updateUser(user);
        response.json(updatedUser);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;

