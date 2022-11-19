import express from "express";

const router = express.Router();

import { Gsignin,signup,signin, updateUser,deleteUser}  from "../controllers/userController.js";


router.post("/Gsignin", Gsignin);

// localhost:5000/users/signup POST request
router.post("/signup", signup);

// localhost:5000/users/signin POST request
router.post("/signin", signin);

// localhost:5000/users/changename put request
router.put("/:id", updateUser);

router.delete("/:id",deleteUser);

export default router;
