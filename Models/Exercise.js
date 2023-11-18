const mongoose = require("mongoose");
const ExerciseSchema = mongoose.Schema({
    user: {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        date:{type:Date,default:Date.now}
    }
})
const Exercise = mongoose.model('Exercise', ExerciseSchema);