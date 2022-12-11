import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    referee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Referee',
        required: true,
    },

    comment: {
      type: String,
      required: true,
     
    },
    likedislike: [
     {
      type: String,
     }
    ],
    dislike: [
     {
      type: String,
     }
    ],
     
    
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    
    writtenBy: {
      type: String,
      default: 'Author Name'
      
    },
    week: {
      type: String,
      default: 'week1'
      
    },
    
  },
  {
    timestamps: true,
  }
)

const Review = mongoose.model('Review', reviewSchema)

export default Review