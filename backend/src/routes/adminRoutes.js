import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import { updateFeatureStatus } from "../controllers/adminController.js";

const router = express.Router();

router.put("/feature/:id", protect, admin, updateFeatureStatus);

export default router;