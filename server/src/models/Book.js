import mongoose from "mongoose";

// ------------------------------------------------------------
// 📚 Book Schema Definition
// ------------------------------------------------------------
const bookSchema = new mongoose.Schema(
  {
    // 🏷️ Title of the book
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      minlength: [2, "Title must have at least 2 characters"],
    },

    // ✍️ Author name
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },

    // 🎭 Genre (optional)
    genre: {
      type: String,
      trim: true,
      default: "General",
    },

    // 💰 Price (must be positive)
    price: {
      type: Number,
      required: [true, "Book price is required"],
      min: [1, "Price must be greater than 0"],
    },

    // 📆 Published Year (optional)
    publishedYear: {
      type: Number,
      min: [1800, "Year must be after 1800"],
      max: [new Date().getFullYear(), "Year cannot be in the future"],
      default: new Date().getFullYear(),
    },

    // 🟩 Availability (in stock or not)
    inStock: {
      type: Boolean,
      default: true,
    },

    // 📝 Short description (optional)
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description too long (max 500 characters)"],
    },

    // 🖼️ Optional image URL
    image: {
      type: String,
      trim: true,
      default: "https://via.placeholder.com/150x200?text=No+Image",
    },
  },
  {
    timestamps: true, // ⏰ Adds createdAt & updatedAt fields
  }
);

// ------------------------------------------------------------
// 🧠 Model Export
// ------------------------------------------------------------
const Book = mongoose.model("Book", bookSchema);
export default Book;
