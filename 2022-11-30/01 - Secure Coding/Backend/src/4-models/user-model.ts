import Joi from "joi";

class UserModel {

    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
    }

    private static ValidationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(4).max(50),
        password: Joi.string().required().min(4).max(50),
    });

    public validate(): string {
        const result = UserModel.ValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default UserModel;