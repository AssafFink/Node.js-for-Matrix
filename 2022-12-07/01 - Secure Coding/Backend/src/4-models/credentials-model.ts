import Joi from "joi";

class CredentialsModel {

    public username: string;
    public password: string;

    public constructor(user: CredentialsModel) {
        this.username = user.username;
        this.password = user.password;
    }

    private static ValidationSchema = Joi.object({
        username: Joi.string().required().min(4).max(50),
        password: Joi.string().required().min(4).max(50),
    });

    public validate(): string {
        const result = CredentialsModel.ValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default CredentialsModel;