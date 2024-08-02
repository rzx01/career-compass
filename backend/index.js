import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv"

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
