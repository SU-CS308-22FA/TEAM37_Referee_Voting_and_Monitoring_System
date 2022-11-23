import Referee from "../models/refereeModel.js";

export const addReferee = async (req, res) => {
    const { name, age, imageurl, description, matches, redcard, yellowcard } = req.body;
  
    try {
        
        if (!name || !age || !imageurl || !redcard)
        {
          return res.status(400).json({ message: "All fields required" });
        }
        
  
      const createdUser = await Referee.create({
        name,
        age,
        imageurl,
        description,
        matches,
        redcard,
        yellowcard
      });
  
    
      res.status(201).json({ createdUser });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };

  export const fetchReferee = async (req, res) => {

  

    try {

      const referee = await Referee.find({  });

      if (!referee) {
       return
      }
      else {
        
        
        return res.status(200).json({ referee});
      }
  
    }
    catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };
  export const fetchRefereeById = async (req, res) => {

    try {

      const referee = await Referee.findOne({_id: req.params.id });

      if (!referee) {
       return
      }
      else {
        
        
        return res.status(200).json({ referee});
      }
  
    }
    catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };
  export const updateRating = async (id,rating) => {

    try {
      const referee = await Referee.findOneAndUpdate({_id : id}, {$inc : {'reviewcount' : 1, 'rating': rating}})
      return true
  
    }
    catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };
