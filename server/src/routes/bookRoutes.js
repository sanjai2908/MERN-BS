import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// ✅ Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    res.json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ Add new book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json({ success: true, data: savedBook });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ Update existing book
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    res.json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ✅ Delete book
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    res.json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
