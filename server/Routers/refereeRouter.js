import express from "express";
import { addReferee, fetchReferee, fetchRefereeById, updateReferee , deleteReferee} from "../controllers/refereeController.js";

const router = express.Router();


router.post("/add", addReferee);
router.get("/", fetchReferee);
router.get("/:id", fetchRefereeById);
router.put("/:id", updateReferee);
router.delete("/:id", deleteReferee);

export default router;
