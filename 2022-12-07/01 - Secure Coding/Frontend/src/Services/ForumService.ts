import axios from "axios";
import appConfig from "../Utils/AppConfig";
import MessageModel from "../Models/MessageModel";

class ForumService {

    public async getAllMessages(): Promise<MessageModel[]> {
        const response = await axios.get<MessageModel[]>(appConfig.forumUrl);
        const messages = response.data;
        return messages;
    }

    public async addMessage(message: MessageModel): Promise<void> {
        await axios.post(appConfig.forumUrl, message);
    }

}

const forumService = new ForumService();

export default forumService;
