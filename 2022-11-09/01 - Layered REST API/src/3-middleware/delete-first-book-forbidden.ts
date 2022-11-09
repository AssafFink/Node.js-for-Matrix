import { NextFunction, Request, Response } from "express";

function deleteFirstBookForbidden(request: Request, response: Response, next: NextFunction) {

    const id = +request.params.id;

    if(id === 1) {
        response.send("Delete first book forbidden!");
        return;
    }

    // Continue the flow to next target (next middleware or route):
    next();
    
}

export default deleteFirstBookForbidden;
