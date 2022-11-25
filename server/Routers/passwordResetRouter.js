import express from "express";
import {
  sendPasswordLink,
  verifyPasswordLink,
  setNewPassword,
} from "../controllers/resetPasswordController.js";

const router = express.Router();

router.post("/", sendPasswordLink);
router.get("/:id/:token", verifyPasswordLink);
router.post("/:id/:token", setNewPassword);

export default router;
