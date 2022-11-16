import express from "express";
import expressFileUpload from "express-fileupload";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import productsController from "./6-controllers/products-controller";

const server = express();

server.use(express.json());
server.use(expressFileUpload());

server.use("/api", productsController);
server.use("*", routeNotFound);

server.use(catchAll);

server.listen(appConfig.port, () => console.log("listening on http://localhost:" + appConfig.port));
