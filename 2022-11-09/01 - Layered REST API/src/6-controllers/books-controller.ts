import express, { NextFunction, Request, Response } from "express";
import deleteFirstBookForbidden from "../3-middleware/delete-first-book-forbidden";
import deleteMsg from "../3-middleware/delete-msg";
import BookModel from "../4-models/book-model";
import booksService from "../5-services/books-service";

const router = express.Router();

router.get("/books", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const books = await booksService.getAllBooks();
        response.json(books);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/books/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;

        // Demo for some crash: 
        // if(id === 4) {
        //     console.log(Math.PI.toPrecision(-50)); // Demo for crash
        // }
        
        const book = await booksService.getOneBook(id);
        response.json(book);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/books", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const book = new BookModel(request.body);
        const addedBook = await booksService.addBook(book);
        response.status(201).json(addedBook);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/books/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.id = id;
        const book = new BookModel(request.body);
        const updatedBook = await booksService.updateBook(book);
        response.json(updatedBook);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/books/:id([0-9]+)", [deleteMsg, deleteFirstBookForbidden], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await booksService.deleteBook(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
