import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../4-models/error-models";

function routeNotFound(request: Request, response: Response, next: NextFunction) {

    next(new RouteNotFoundError(request.originalUrl));
    
}

export default routeNotFound;
