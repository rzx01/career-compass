import express from 'express';
import { Question, Choice } from '../models/Question.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find({});
    const choices = await Choice.find({});
    res.json({ questions, choices });
  } catch (error) {
    console.error("Error fetching questions and choices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
