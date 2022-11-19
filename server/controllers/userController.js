import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

const secret = 'test';

export const signin = async (req, res) => {

    const { email, password } = req.body;

    try {

      if (!password || !email)
        {
          return res.status(400).json({ message: "All fields required" });
        }
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User does not exist." });
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });

      return res.status(200).json({ user: user, token: token });
       
    } 
    catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };
  export const Gsignin = async (req, res) => {

    const { email, name } = req.body;

    try {

      const user = await User.findOne({ email });

      if (!user) {
        const password = "Google";
        const user = await User.create({
          fullname: name,
          nickname: name,
          email,
          password,
        });
        const token = jwt.sign( { email: user.email, id: user._id }, secret, { expiresIn: "1h" } );
        res.status(200).json({ user, token });
      }
      else {
        
        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });
        return res.status(200).json({ user: user, token: token});
      }
  
    }
    catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };

  export const signup = async (req, res) => {
    const { fullname, nickname, password, email } = req.body;
  
    try {
        
        if (!fullname || !nickname || !password || !email)
        {
          return res.status(400).json({ message: "All fields required" });
        }
        const userExists = await User.findOne({ email });
  
      if (userExists) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const createdUser = await User.create({
        fullname,
        nickname,
        email,
        password: hashedPassword,
      });
  
      const token = jwt.sign( { email: createdUser.email, id: createdUser._id }, secret, { expiresIn: "1h" } );
  
      res.status(201).json({ createdUser, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };

 export const updateUser = async (req, res) => {
    
    const { fullname, nickname, email } = req.body;
    try {
          const updatedUser = await User.findByIdAndUpdate(
              req.params.id,
              { $set: {fullname, nickname, email}},
              { new: true }
            );
          return res.status(200).json({ user: updatedUser, message: 'Informations changed succesfully' })
      } catch (error) {
          return res.status(400).json({ message: error.message})
      }
  };

  export const deleteUser = async (req, res) => {
    try {
         await User.findByIdAndDelete(req.params.id);
         res.status(200).json("User has been deleted.");
      } 
      catch (err) {
        return res.status(400).json({ message: err.message })
      }
};