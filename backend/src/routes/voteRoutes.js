import express from "express";
import protect from "../middleware/authMiddleware.js";
import { upvoteFeature } from "../controllers/voteController.js";

const router = express.Router();

router.post("/:id", protect, upvoteFeature);

export default router;