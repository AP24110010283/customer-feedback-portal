import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createFeedback, getFeedback, updateFeedback, deleteFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", protect, createFeedback);
router.get("/", getFeedback);
router.put("/:id", protect, updateFeedback);
router.delete("/:id", protect, deleteFeedback);

export default router;