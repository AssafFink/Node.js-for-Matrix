import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MessageModel from "../../../Models/MessageModel";
import forumService from "../../../Services/ForumService";
import notifyService from "../../../Services/NotifyService";
import "./Forum.css";

function Forum(): JSX.Element {

    const [messages, setMessages] = useState<MessageModel[]>([]);
    const { register, handleSubmit, reset } = useForm<MessageModel>();

    useEffect(() => {
        (async () => await updateList())();
    }, []);

    async function updateList(): Promise<void> {
        try {
            const messages = await forumService.getAllMessages();
            setMessages(messages);
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    async function send(message: MessageModel) {
        try {
            await forumService.addMessage(message);
            await updateList();
            reset();
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Forum">

            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map(p =>
                            <tr key={p.id}>
                                <td>{p.sender}</td>
                                {/* Following made only to simulate HTML XSS (React won't allow scripts XSS) */}
                                <td dangerouslySetInnerHTML={{__html: p.text}}></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            <section>
                <form onSubmit={handleSubmit(send)}>

                    <label>👱‍♂️</label>
                    <input type="text" placeholder="Sender..." {...register("sender")} required minLength={2} maxLength={20} autoFocus />

                    <label>📝</label>
                    <input type="text" placeholder="Message..." {...register("text")} required minLength={2} maxLength={1000} />

                    <button>Send</button>

                </form>
            </section>

        </div>
    );
}

export default Forum;


