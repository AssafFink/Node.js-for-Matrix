import express from "express";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import authController from "./6-controllers/auth-controller";
import productsController from "./6-controllers/products-controller";
import forumController from "./6-controllers/forum-controller";
import cors from "cors";
import sanitize from "./3-middleware/sanitize";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";

const server = express();

server.use("/api/", expressRateLimit({
    windowMs: 1000, // Time window
    max: 10 // Max requests in that time window
}));

server.use(helmet());

// 3. Enable CORS for our website (or any website if needed):
// server.use(cors()); // Enable any frontend.
server.use(cors({ origin: appConfig.frontendUrl })); // Enable only to our frontend.

server.use(express.json());
server.use(sanitize);
server.use("/api", authController);
server.use("/api", productsController);
server.use("/api", forumController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));



