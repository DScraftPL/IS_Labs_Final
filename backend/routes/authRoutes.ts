import authController from "../controllers/authController";
import protect from "../middleware/authMiddlware";
import { Router } from "express";

const router = Router();
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/update", protect, authController.updateName);
router.post("/refresh", authController.refeshToken);
router.post("/delete", protect, authController.deleteUser);

export default router;