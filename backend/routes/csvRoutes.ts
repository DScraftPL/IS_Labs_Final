import express from "express"
import csvController from "../controllers/csvController";

const router = express.Router();

router.get('/transport', csvController.transport);

router.get('/who', csvController.who);

export default router;