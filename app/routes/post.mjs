import express from "express";
import post from "../controllers/posts.mjs";
import authJwt from "../middleware/authJwt.mjs";


const router = express.Router();

// Get a list of 50 posts
router.get("/", post.getAll);

// Fetches the latest posts
router.get("/latest", post.getLastest);

// Get a single post
router.get("/:id", post.getSingle);

// Add a new document to the collection
router.post("/", post.insertOne);

// Update the post with a new comment
router.patch("/comment/:id", post.addComment );

// Delete an entry
router.delete("/:id", post.deleteOne);

export default router;
