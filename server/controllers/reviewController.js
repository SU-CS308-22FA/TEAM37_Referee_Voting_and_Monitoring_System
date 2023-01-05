
import Review from "../models/reviewModel.js";
import { removeRating, updateRating } from "./refereeController.js";

export const addReview = async (req, res) => {
    const { referee, comment, rating, writtenBy, week, user } = req.body;
  
    try {
        
        if (!referee || !comment || !rating || !week || !user)
        {
          return res.status(400).json({ message: "All fields required" });
        }
        
  
      const createdUser = await Review.create({
        referee,
        user,
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
      const temp= await Review.findOneAndUpdate({_id: id},{$inc : {'likecount' : 1}})
      res.status(200).json(done);
      
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }


  }

  export const addDislike = async (req, res) => {
    const { id,user } = req.body;
   
    try {
      const done= await Review.findOneAndUpdate({_id: id}, {$push:{dislike:user}}, {new: true})
      const temp= await Review.findOneAndUpdate({_id: id},{$inc : {'dislikecount' : 1}})
      
      res.status(200).json(done);
      
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }


  }
  export const removeLike = async (req, res) => {
    const { id,user } = req.body;
    try {
      const done= await Review.findByIdAndUpdate({_id: id}, {$pull:{likedislike:user}}, {new: true})
      const temp= await Review.findByIdAndUpdate({_id: id},{$inc : {'likecount' : -1}})

      res.status(200).json( done );
      
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }


  }

  export const removeDislike = async (req, res) => {
    const { id,user } = req.body;
    try {
      const done= await Review.findByIdAndUpdate({_id: id}, {$pull:{dislike:user}}, {new: true})
      const temp= await Review.findByIdAndUpdate({_id: id},{$inc : {'dislikecount' : -1}})

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
   // function for delete a review
  // route: localhost:5000/review/delete/reviewid
  export const deleteReview = async (req, res) => {
    
    try {
      const done= await Review.findByIdAndDelete(req.params.id, {new: true})
removeRating(done.referee, done.rating)
      res.status(200).json(done);
      
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }


  }


  // function for update review
  // route: localhost:5000/review/update/reviewid
  export const updateReview = async (req, res) => {

    const {rating, comment  } = req.body;
    try {
      const reviewUpdate = await Review.findByIdAndUpdate(
        req.params.id,
        { $set: { rating, comment } },
        { new: true }
        
      );
      return res
        .status(200)
        .json({ review: reviewUpdate, message: "Informations changed succesfully", success: true });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  export const getAllReview = async (req, res) => {

  

    try {

      const review = await Review.find({  }).sort({ likedislike: 1 });;

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
