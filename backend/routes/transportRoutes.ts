import express from "express"
import protect from "../middleware/authMiddlware";

import tController from "../controllers/transportController"

const router = express.Router();

//get all relevant (2019+) data from transport
router.get('/', tController.get)

//post parameters to get results :)
router.post('/', protect, tController.post)

//get all from given year
router.get('/date/:date', tController.getDate)

export default router;