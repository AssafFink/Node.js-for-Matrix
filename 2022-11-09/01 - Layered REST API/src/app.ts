import express from "express";
import catchAll from "./3-middleware/catch-all";
import logRequest from "./3-middleware/log-request";
import routeNotFound from "./3-middleware/route-not-found";
import booksController from "./6-controllers/books-controller";

const server = express();

server.use(express.json());

// Run middleware:
server.use(logRequest);

server.use("/api", booksController);
// server.use("/api", customersController);
// server.use("/api", employeesController);
// server.use("/api", suppliersController);
// server.use("/api", inventoryController);
server.use("*", routeNotFound);

server.use(catchAll);

server.listen(4000, () => console.log("listening on http://localhost:4000"));
