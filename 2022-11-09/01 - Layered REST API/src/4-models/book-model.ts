import Joi from "joi";

class BookModel {

    public id: number;
    public name: string;
    public price: number;

    public constructor(book: BookModel) { // Copy Constructor
        this.id = book.id;
        this.name = book.name;
        this.price = book.price;
    }

    private static ValidationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        name: Joi.string().required().min(3).max(100),
        price: Joi.number().required().min(0).max(1000)
    });

    public validate(): string {
        const result = BookModel.ValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default BookModel;