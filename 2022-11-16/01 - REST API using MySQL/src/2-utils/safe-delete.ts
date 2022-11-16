import logger from "./logger";
import fs from "fs";
import path from "path";

function safeDelete(imageName: string): void {
    try {
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        if(!absolutePath) return;
        fs.unlink(absolutePath, () => {});
    }
    catch(err: any) {
        logger.logError("safeDelete crash", err);
    }
}

export default safeDelete;