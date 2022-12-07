import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";

function chatService(httpServer: HttpServer): void {

    // Create socket.io server on top of the http server:
    const socketIoServer = new SocketIoServer(httpServer, { cors: { origin: "http://localhost:3000" } });

    // 1. Listen to client connections: 
    socketIoServer.sockets.on("connection", (socket: Socket) => {
        console.log("One client has been connected.");

        // 3. Listen to client messages: 
        socket.on("msg-from-client", (msg: string) => {
            console.log("Client sent message: " + msg);

            // 6. Send back given message to all clients (per our chat logic): 
            socketIoServer.sockets.emit("msg-from-server", msg);
        });

        // 7. Listen to client disconnect:
        socket.on("disconnect", () => {
            console.log("One Client has disconnected");
        });

    });

}


export default chatService;