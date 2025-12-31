import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import express from "express";
import router from "../src/routes/note.route.js";
import errorMiddleware from "../src/middlewares/error.middleware.js";

let mongoServer;
const app = express();
app.use(express.json());
app.use("/api", router);
app.use(errorMiddleware);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("Notes API", () => {
    let noteId;

    it("should create a new note", async () => {
        const res = await request(app).post("/api/notes").send({
            title: "Test Note",
            description: "Test Description",
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.data).toHaveProperty("_id");
        noteId = res.body.data._id;
    });

    it("should get all notes", async () => {
        const res = await request(app).get("/api/notes");
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("should get a note by ID", async () => {
        const res = await request(app).get(`/api/notes/${noteId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.title).toEqual("Test Note");
    });

    it("should update a note", async () => {
        const res = await request(app).patch(`/api/notes/${noteId}`).send({
            title: "Updated Note",
            description: "Updated Description",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.title).toEqual("Updated Note");
    });

    it("should return 409 for duplicate title", async () => {
        await request(app).post("/api/notes").send({
            title: "Duplicate Title",
            description: "Desc",
        });
        const res = await request(app).post("/api/notes").send({
            title: "Duplicate Title",
            description: "Another Desc",
        });
        expect(res.statusCode).toEqual(409);
    });

    it("should soft delete a note", async () => {
        const res = await request(app).delete(`/api/notes/${noteId}`);
        expect(res.statusCode).toEqual(200);

        const getRes = await request(app).get("/api/notes");
        const deletedNote = getRes.body.data.find(n => n._id === noteId);
        expect(deletedNote).toBeUndefined();
    });
});
