import express from "express";
import role from "../controllers/role.mjs";
import authJwt from "../middleware/authJwt.mjs";


const router = express.Router();

// Get a list of 50 posts
router.get("/", role.getAll);

// Get a single post
router.get("/:id", role.getSingle);

// Add a new document to the collection
router.post("/", role.insertOne);

router.post("/addroletouser", role.addRoleToUser);

// Delete an entry
router.delete("/:id", role.deleteOne);

export default router;
