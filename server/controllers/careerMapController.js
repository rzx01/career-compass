import CareerMap from "../models/CareerMap.js";

export const getCareerMapData = async (req, res) => {
    try {
        const searchQuery = req.query.search;
        let filter = {};

        if (searchQuery) {
            if (searchQuery === "manager") {
                filter = { Career: { $regex: "manager$", $options: "i" } }; 
            } else if (searchQuery === "engineer") {
                filter = { Career: { $regex: "engineer$", $options: "i" } }; 
            } else if (searchQuery === "analyst") {
                filter = { Career: { $regex: "analyst$", $options: "i" } }; 
            } else {
                filter = { Career: { $regex: searchQuery, $options: "i" } }; 
            }
        }

        const careers = await CareerMap.find(filter);
        res.json(careers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving careers', error });
    }
};