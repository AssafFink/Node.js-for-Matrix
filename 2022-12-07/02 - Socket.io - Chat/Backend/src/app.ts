import express from "express";
import chatService from "./servers/chat-service";

// Create express server:
const expressServer = express();


// Listen by express server and get back Node.js internal http server:
const httpServer = expressServer.listen(3001, () => console.log("Listening on http://localhost:3001"));

// Send http server to chat logic:
chatService(httpServer);