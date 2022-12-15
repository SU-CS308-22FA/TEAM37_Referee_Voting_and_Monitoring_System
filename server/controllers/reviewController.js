
import Review from "../models/reviewModel.js";
import { updateRating } from "./refereeController.js";

export const addReview = async (req, res) => {
    const { referee, comment, rating, writtenBy, week } = req.body;
  
    try {
        
        if (!referee || !comment || !rating || !week)
        {
          return res.status(400).json({ message: "All fields required" });
        }
        
  
      const createdUser = await Review.create({
        referee,
        comment,
        rating,
        writtenBy,
        week
        
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

      const review = await Review.find({referee: req.params.id});

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
  

  export const addLike = async (req, res) => {
    const { id,user } = req.body;
   
    try {
      const done= await Review.findOneAndUpdate({_id: id}, {$push:{likedislike:user}}, {new: true})

      
      res.status(200).json(done);
      
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }


  }

  export const addDislike = async (req, res) => {
    const { id,user } = req.body;
   
    try {
      const done= await Review.findOneAndUpdate({_id: id}, {$push:{dislike:user}}, {new: true})

      
      res.status(200).json(done);
      
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }


  }
  export const removeLike = async (req, res) => {
    const { id,user } = req.body;
    try {
      const done= await Review.findByIdAndUpdate({_id: id}, {$pull:{likedislike:user}}, {new: true})

      res.status(200).json( done );
      
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }


  }

  export const removeDislike = async (req, res) => {
    const { id,user } = req.body;
    try {
      const done= await Review.findByIdAndUpdate({_id: id}, {$pull:{dislike:user}}, {new: true})

      res.status(200).json(done);
      
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }


  }
  export const report1 = async (req, res) => {
    const { id,user } = req.body;
    try {
      const done= await Review.findOneAndUpdate({_id: id}, {$push:{report:user}}, {new: true})

      res.status(200).json( done );
    
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }


  }
  export const updateComment = async (text) => {
    return { text };
  };
  
  export const deleteComment = async () => {
    return {};
  };
