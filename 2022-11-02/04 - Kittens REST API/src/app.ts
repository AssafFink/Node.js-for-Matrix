import express, { NextFunction, Request, Response } from "express";
import kittens from "./data/kittens";

const server = express();

// Create request.body object containing the json object resides in the HTTP Request body (if exists)
server.use(express.json());

// GET "http://localhost:4000/api/kittens"
server.get("/api/kittens", (request: Request, response: Response, next: NextFunction) => {
    console.log("Client requested GET /api/kittens");
    response.json(kittens);
});

// GET "http://localhost:4000/api/kittens/:id"
server.get("/api/kittens/:id", (request: Request, response: Response, next: NextFunction) => {
    console.log("Client requested GET /api/kittens/:id");
    const id = +request.params.id;
    const kitten = kittens.find(k => k.id === id);
    response.json(kitten);
});

// POST "http://localhost:4000/api/kittens"
server.post("/api/kittens", (request: Request, response: Response, next: NextFunction) => {
    console.log("Client requested POST /api/kittens");
    const kitten = request.body;
    kitten.id = kittens[kittens.length - 1].id + 1;
    kittens.push(kitten);
    response.status(201).json(kitten);
});

// PUT "http://localhost:4000/api/kittens/:id"
server.put("/api/kittens/:id", (request: Request, response: Response, next: NextFunction) => {
    console.log("Client requested PUT /api/kittens/:id");
    const id = +request.params.id;
    request.body.id = id;
    const index = kittens.findIndex(k => k.id === id);
    kittens[index] = request.body;
    response.json(kittens[index]);
});

// PATCH "http://localhost:4000/api/kittens/:id"
server.patch("/api/kittens/:id", (request: Request, response: Response, next: NextFunction) => {
    console.log("Client requested PATCH /api/kittens/:id");
    const id = +request.params.id;
    request.body.id = id;
    const index = kittens.findIndex(k => k.id === id);
    const kitten = kittens[index];
    for(const prop in kitten) {
        if(prop in request.body) {
            kitten[prop] = request.body[prop];
        }
    }
    response.json(kitten);
});

// DELETE "http://localhost:4000/api/kittens/:id"
server.delete("/api/kittens/:id", (request: Request, response: Response, next: NextFunction) => {
    console.log("Client requested DELETE /api/kittens/:id");
    const id = +request.params.id;
    const index = kittens.findIndex(k => k.id === id);
    kittens.splice(index, 1); // 1 = Delete one item
    response.sendStatus(204);
});

// GET "http://localhost:4000/api/kittens-by-age/:minAge/:maxAge"
server.get("/api/kittens/:minAge/:maxAge", (request: Request, response: Response, next: NextFunction) => {
    console.log("Client requested GET /api/kittens/:minAge/:maxAge");
    const minAge = +request.params.minAge;
    const maxAge = +request.params.maxAge;
    const filteredKittens = kittens.filter(k => k.age >= minAge && k.age <= maxAge);
    response.json(filteredKittens);
});

// Same but with Query String parameters:
// GET "http://localhost:4000/api/kittens-by-age-range?minAge=___&maxAge=___"
server.get("/api/kittens-by-age-range", (request: Request, response: Response, next: NextFunction) => {
    console.log("Client requested GET /api/kittens-by-age-range?minAge=___&maxAge=___");
    const minAge = +request.query.minAge;
    const maxAge = +request.query.maxAge;
    const filteredKittens = kittens.filter(k => k.age >= minAge && k.age <= maxAge);
    response.json(filteredKittens);
});

server.listen(4000, () => console.log("listening on http://localhost:4000"));

