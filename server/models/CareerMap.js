import mongoose from 'mongoose';

const CareerMapSchema = new mongoose.Schema({
    Career: {
        type: String,
        required: true,
        unique: true, 
    },
    Similar_Jobs: {
        type: [[String]], 
        required: true,
    },
    r: {
        type: Number,
        default: 1, 
    }
}, { collection:"CareerMap" }); 

const CareerMap = mongoose.model('CareerMap', CareerMapSchema);

export default CareerMap;
