import { NextFunction, Request, Response } from "express";
import logger from "../2-utils/logger";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {

    // log to file:
    logger.logError("Some error in catch all", err);

    // log to console:
    console.log("Error: " + err.message);

    // Get error status code: 
    const status = err.status ? err.status : 500;

    // send back error: 
    response.status(status).send(err.message);

}

export default catchAll;
