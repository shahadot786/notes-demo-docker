import Note from "../models/note.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createNote = asyncHandler(async (req, res) => {
  const { title, description, tags, isPinned, isArchived, isDeleted } = req.body;

  if (!title || !description) {
    const error = new Error("Title & Description are required!");
    error.status = 400;
    throw error;
  }

  const existsTitle = await Note.findOne({ title });
  if (existsTitle) {
    const error = new Error(`Already exists this title - (${title})`);
    error.status = 409;
    throw error;
  }

  const noteData = await Note.create({
    title,
    description,
    tags,
    isPinned,
    isArchived,
    isDeleted,
  });

  res.status(201).json({
    status: "Success",
    message: "Note created successfully.",
    data: noteData,
  });
});

export const allNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ isDeleted: { $ne: true } }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    status: "Success",
    message: "All notes retrieved successfully.",
    data: notes,
  });
});

export const getNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);

  if (!note) {
    const error = new Error("Note not found!");
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    status: "Success",
    message: "Note found successfully.",
    data: note,
  });
});

export const updateNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, tags, isPinned, isArchived, isDeleted } = req.body;

  if (!title || !description) {
    const error = new Error("Title & Description are required!");
    error.status = 400;
    throw error;
  }

  const existsTitle = await Note.findOne({
    title,
    _id: { $ne: id },
  });

  if (existsTitle) {
    const error = new Error(`Already exists this title (${title})`);
    error.status = 409;
    throw error;
  }

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { title, description, tags, isPinned, isArchived, isDeleted },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedNote) {
    const error = new Error("Note not found!");
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    status: "Success",
    message: "Note updated successfully.",
    data: updatedNote,
  });
});

export const deleteNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedNote = await Note.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!deletedNote) {
    const error = new Error("Note not found!");
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    status: "Success",
    message: "Note deleted successfully.",
  });
});
