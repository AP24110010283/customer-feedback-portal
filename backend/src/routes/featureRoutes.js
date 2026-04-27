import express from "express";
import { createFeature, getFeatures, updateFeature, deleteFeature } from "../controllers/featureController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createFeature);
router.get("/", getFeatures);
router.put("/:id", protect, updateFeature);
router.delete("/:id", protect, deleteFeature);

export default router;