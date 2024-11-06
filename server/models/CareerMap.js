import mongoose from 'mongoose';

const CareerMapSchema = new mongoose.Schema({
    Career: {
        type: String,
        required: true,
    },
}, { collection: "CareerMap" });

const CareerMap = mongoose.model("CareerMap", CareerMapSchema);
export default CareerMap;
