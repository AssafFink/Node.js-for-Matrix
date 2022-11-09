import dal from "../2-utils/dal";
import BookModel from "../4-models/book-model";
import { ResourceNotFoundError, ValidationError } from "../4-models/error-models";

// Get all books:
async function getAllBooks(): Promise<BookModel[]> {
    const books = await dal.getAllBooksFromDB();
    return books;
}

// Get one book:
async function getOneBook(id: number): Promise<BookModel> {
    const books = await dal.getAllBooksFromDB();
    const book = books.find(b => b.id === id);
    if(!book) throw new ResourceNotFoundError(id);
    return book;
}

// Add one book:
async function addBook(book: BookModel): Promise<BookModel> {
    
    const error = book.validate();
    if(error) throw new ValidationError(error);

    const books = await dal.getAllBooksFromDB();
    book.id = books[books.length - 1].id + 1;
    books.push(book);
    await dal.saveAllBooksToDB(books);
    return book;
}

// Update book:
async function updateBook(book: BookModel): Promise<BookModel> {

    const error = book.validate();
    if(error) throw new ValidationError(error);

    const books = await dal.getAllBooksFromDB();
    const index = books.findIndex(b => b.id == book.id);
    if(index === -1) throw new ResourceNotFoundError(book.id);
    books[index] = book;
    await dal.saveAllBooksToDB(books);
    return book;
}

// Delete book:
async function deleteBook(id: number): Promise<void> {
    const books = await dal.getAllBooksFromDB();
    const index = books.findIndex(b => b.id == id);
    if(index === -1) throw new ResourceNotFoundError(id);
    books.splice(index, 1);
    await dal.saveAllBooksToDB(books);
}

export default {
    getAllBooks,
    getOneBook,
    addBook,
    updateBook,
    deleteBook
}