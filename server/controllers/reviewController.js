
import Review from "../models/reviewModel.js";
import { updateRating } from "./refereeController.js";

export const addReview = async (req, res) => {
    const { referee, comment, rating, writtenBy } = req.body;
  
    try {
        
        if (!referee || !comment || !rating)
        {
          return res.status(400).json({ message: "All fields required" });
        }
        
  
      const createdUser = await Review.create({
        referee,
        comment,
        rating,
        writtenBy
        
      });
  updateRating(referee, rating)
    
      res.status(201).json({ createdUser });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };

  export const fetchReview = async (req, res) => {


    try {

      const review = await Review.find({ referee: req.params.id });

      if (!review) {
       return
      }
      else {
        
        
        return res.status(200).json({ review});
      }
  
    }
    catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };
  
