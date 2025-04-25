import express from "express"
import whoController from "../controllers/whoController";
import protect from "../middleware/authMiddlware";

const router = express.Router();

//get all data
router.get('/', whoController.get)

//get all from given year
router.get('/date/:date', whoController.getDate)

//post data to get filtered data
router.post('/', protect,  whoController.post)

export default router;