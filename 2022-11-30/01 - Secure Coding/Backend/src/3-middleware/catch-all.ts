import { NextFunction, Request, Response } from "express";
import appConfig from "../2-utils/app-config";
import logger from "../2-utils/logger";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {

    const status = err.status || 500;

    console.log(err);

    // 1. Must log server errors: 
    if(status === 500) {
        logger.logError("catchAll Error", err);
    }

    // 2. Never return system error on production: 
    const message = (appConfig.isDevelopment || status !== 500) ? err.message : "Some error, please try again...";

    response.status(status).send(message);
}

export default catchAll;
