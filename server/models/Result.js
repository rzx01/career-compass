import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['ocean', 'aptitude'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now 
    },
    user_id: {
        type: String, 
        required: true
    },
    oceanScore: { type: Object } ,
    aptitudeScore: { type: Object } ,
    career_names: {
        type: [String], 
        required: true
    }
});

const Result = mongoose.model('Result', resultSchema);

export default Result;
