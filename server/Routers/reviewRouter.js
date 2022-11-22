import express from "express";
import { addReview, fetchReview } from "../controllers/reviewController.js";

const router = express.Router();


router.post("/add", addReview);
router.get("/:id", fetchReview);



export default router;
