import express from "express";
import {
  allNotes,
  createNote,
  deleteNoteById,
  getNoteById,
  updateNoteById,
} from "../controllers/note.controller.js";

const router = express.Router();

router.post("/notes", createNote);
router.get("/notes", allNotes);
router
  .route("/notes/:id")
  .get(getNoteById)
  .patch(updateNoteById)
  .delete(deleteNoteById);

export default router;
