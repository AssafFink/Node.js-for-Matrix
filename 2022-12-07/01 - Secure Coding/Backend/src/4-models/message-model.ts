import Joi from "joi";

class MessageModel {
    
    public id: number;
    public sender: string;
    public text: string;

    public constructor(message: MessageModel) {
        this.id = message.id;
        this.sender = message.sender;
        this.text = message.text;
    }

    private static ValidationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        sender: Joi.string().required().min(2).max(30),
        text: Joi.string().required().min(2).max(1000)
    });

    public validate(): string {
        const result = MessageModel.ValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default MessageModel;
