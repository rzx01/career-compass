import CareerMap from "../models/CareerMap.js";

export const getCareerMapData = async (req, res) => {
    try {
        const searchQuery = req.query.search;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

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

        const totalRecords = await CareerMap.countDocuments(filter);
        const totalPages = Math.ceil(totalRecords / limit);

        const careers = await CareerMap.find(filter).skip(skip).limit(limit);

        res.json({ careers, totalPages });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving careers', error });
    }
};
