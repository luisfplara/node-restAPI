import express from "express";
import db from "../../db/conn.mjs";
import { ObjectId } from "mongodb";
import auth from "../controllers/auth.mjs";
import verifySignUp from "../middleware/verifySigUp.mjs";

const router = express.Router();

// Get a list of 50 posts
router.post("/signin", auth.signin);
router.post("/signout",  auth.signout);
router.post("/signup", verifySignUp.checkDuplicateUsernameOrEmail,auth.signup);
router.get("/refreshtoken", auth.refreshToken);



export default router;
