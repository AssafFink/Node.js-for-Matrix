import { Component, SyntheticEvent } from "react";
import { Socket, io } from "socket.io-client";
import "./Chat.css";

interface ChatState {
    messageToSend: string;
    messagesReceived: string[];
}

class Chat extends Component<{}, ChatState> {

    private socket: Socket;

    public constructor(props: {}) {
        super(props);
        this.state = { messageToSend: "", messagesReceived: [] };
    }

    private messageHandler = (args: SyntheticEvent) => {
        const messageToSend = (args.target as HTMLInputElement).value;
        this.setState({ messageToSend });
    }

    private connect = () => {

        // 2. Create a connection between frontend to backend:
        this.socket = io("http://localhost:3001");

        // 5. Listen to messages from server: 
        this.socket.on("msg-from-server", (msg: string) => {
            const duplicateArray = [...this.state.messagesReceived, msg];
            this.setState({ messagesReceived: duplicateArray });
        });

    }

    private send = () => {

        // 4. Send message from client to server:
        this.socket.emit("msg-from-client", this.state.messageToSend);
    }

    private disconnect = () => {

        // 8. Disconnect from server: 
        this.socket.disconnect();
    }

    public render(): JSX.Element {
        return (
            <div className="Chat">

                <button onClick={this.connect}>Connect</button>
                <button onClick={this.disconnect}>Disconnect</button>
                <br /><br />

                <input type="text" onChange={this.messageHandler} value={this.state.messageToSend} />
                <button onClick={this.send}>Send</button>
                <br /><br />

                <div>
                    {this.state.messagesReceived.map((msg, index) => <div key={index}>{msg}</div>)}
                </div>

            </div>
        );
    }
}

export default Chat;
