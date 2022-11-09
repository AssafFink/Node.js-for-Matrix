import fsPromises from "fs/promises";
import BookModel from "../4-models/book-model";

const booksFile = "./src/1-assets/db/books.json";

async function getAllBooksFromDB(): Promise<BookModel[]> {
    const content: string = await fsPromises.readFile(booksFile, "utf-8");
    const books: BookModel[] = JSON.parse(content);
    return books;
}

async function saveAllBooksToDB(books: BookModel[]): Promise<void> {
    const content: string = JSON.stringify(books, null, 4);
    await fsPromises.writeFile(booksFile, content);
}

export default {
    getAllBooksFromDB,
    saveAllBooksToDB
}
