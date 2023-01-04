import mongoose from 'mongoose'


const refereeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    
    matches: {
        type: String,
        required: true
    },

    redcard: {
        type: String,
        required: true
    },

    yellowcard: {
        type: String,
        required: true
    },

    yellowcard: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
       default: 0
    },
    reviewcount: {
        type: Number,
        default: 0
    },
    averagerating: {
        type: Number,
        default: 0
    },
})

export default mongoose.model('Referee', refereeSchema)