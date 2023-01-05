import express from "express";
import { addDislike, addLike, addReview, deleteReview, fetchReview, getAllReview, removeDislike, removeLike, report1, updateReview, getAllReviewByUserId } from "../controllers/reviewController.js";

const router = express.Router();


router.post("/add", addReview);
router.put("/addlike", addLike);
router.put("/adddislike", addDislike);
router.put("/removelike", removeLike);
router.put("/removedislike", removeDislike);
router.put("/report", report1);
router.get("/:id/:week", fetchReview);
router.get("/getallreview", getAllReview);
router.get("/:id", getAllReviewByUserId);
// this is review delete route
router.delete("/delete/:id", deleteReview);
// this is review update route
router.put("/update/:id", updateReview);




export default router;
