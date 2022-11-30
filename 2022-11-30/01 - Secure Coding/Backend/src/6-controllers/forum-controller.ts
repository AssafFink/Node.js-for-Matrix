import express, { Request, Response, NextFunction } from "express";
import MessageModel from "../4-models/message-model";
import forumService from "../5-services/forum-service";

const router = express.Router();

router.get("/forum", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const messages = await forumService.getAllMessages();
        response.json(messages);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/forum", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const message = new MessageModel(request.body);
        const addedMessage = await forumService.addMessage(message);
        response.status(201).json(addedMessage);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;