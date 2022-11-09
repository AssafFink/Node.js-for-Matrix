import { NextFunction, Request, Response } from "express";

function deleteMsg(request: Request, response: Response, next: NextFunction) {

    console.log("Client is going to delete something...");

    // Continue the flow to next target (next middleware or route):
    next();
    
}

export default deleteMsg;
