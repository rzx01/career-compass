import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import JobData from "./models/career.js";
import cors from "cors";
import { Choice, Question } from './models/questions.js';
import { getItems, getInfo, getChoices, getQuestions } from'@alheimsins/b5-johnson-120-ipip-neo-pi-r';

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.get("/getCareerCard", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const careerData = await JobData.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const totalRecords = await JobData.countDocuments();
    console.log(totalRecords);

    res.json({
      careers: careerData,
      totalPages: Math.ceil(totalRecords / limit),
    });
  } catch (error) {
    console.error("Error fetching career data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function postDataToMongoDB() {
  try {
    const items = getItems();
    const choices = getChoices();

    const choiceDocs = [];
    for (const itemId in choices) {
      if (choices.hasOwnProperty(itemId)) {
        choices[itemId].forEach((choice) => {
          choiceDocs.push({
            ...choice,
            questionId: itemId,
          });
        });
      }
    }

    await Choice.insertMany(choiceDocs);

    const formattedData = items.map((item) => ({
      id: item.id,
      text: item.text,
      keyed: item.keyed,
      domain: item.domain,
      facet: item.facet,
      num: item.num,
    }));

    await Question.insertMany(formattedData);

    console.log("Data successfully inserted into MongoDB");
  } catch (err) {
    console.error("Error:", err);
  }
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
