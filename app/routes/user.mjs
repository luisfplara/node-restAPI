import express from "express";
import user from "../controllers/user.mjs";
import authJwt from "../middleware/authJwt.mjs";


const router = express.Router();

// Get a list of 50 users
router.get("/", user.getAll);


// Get a single user
router.get("/:id", user.getSingle);

// Delete an entry
router.delete("/:id", user.deleteOne);

export default router;
