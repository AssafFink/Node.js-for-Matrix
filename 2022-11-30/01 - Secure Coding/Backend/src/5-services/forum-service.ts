import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ValidationError } from "../4-models/error-models";
import MessageModel from "../4-models/message-model";

async function getAllMessages() {

    const sql = "SELECT * FROM forum";

    const messages = await dal.execute(sql);

    return messages;
}

async function addMessage(message: MessageModel): Promise<MessageModel> {

    const error = message.validate();
    if(error) throw new ValidationError(error);

    const sql = `INSERT INTO forum VALUES(DEFAULT, '${message.sender}', '${message.text}')`;

    const info: OkPacket = await dal.execute(sql);

    message.id = info.insertId;

    return message;
}

export default {
    getAllMessages,
    addMessage
};
