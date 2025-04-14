import express from "express"
import csvController from "../controllers/csvController";

const router = express.Router();

//import and display transport data from csv
router.get('/transport', csvController.transport);

//import and display who data from csv
router.get('/who', csvController.who);

export default router;