import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
const router = express.Router();

// localhost:5000/users/signup POST request
router.post("/signup", async (req, res) => {
  try {
    //console.log(req.body)
    const { fullname, password, phoneNumber, email } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    return res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    return res.json({ message: "User creation failed!" });
  }
});

// localhost:5000/users/signin POST request
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong password" });

    return res
      .status(200)
      .json({ user, message: "Authentication successful." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// localhost:5000/users/changename put request
router.put("users/:id", async (req, res) => {
  try {
    const { fullname } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10)

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: {fullname} },
            { new: true }
          );
        
        return res.status(200).json({ updatedUser, message: 'Informations changed succesfully' })
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
})

router.delete("/:id", async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
      } 
      catch (err) {
        return res.status(400).json({ message: error.message })
      }
})

export default router;
