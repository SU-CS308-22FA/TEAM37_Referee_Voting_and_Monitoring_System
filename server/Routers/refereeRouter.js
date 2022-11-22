import express from "express";
import { addReferee, fetchReferee, fetchRefereeById } from "../controllers/refereeController.js";

const router = express.Router();


router.post("/add", addReferee);
router.get("/", fetchReferee);
router.get("/:id", fetchRefereeById);


export default router;
