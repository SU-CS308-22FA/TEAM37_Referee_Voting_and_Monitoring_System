import express from "express";
import { addDislike, addLike, addReview, fetchReview, removeDislike, removeLike, report1 } from "../controllers/reviewController.js";

const router = express.Router();


router.post("/add", addReview);
router.put("/addlike", addLike);
router.put("/adddislike", addDislike);
router.put("/removelike", removeLike);
router.put("/removedislike", removeDislike);
router.put("/report", report1);
router.get("/:id/:week", fetchReview);





export default router;
