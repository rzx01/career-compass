import mongoose from 'mongoose';

const choiceSchema = new mongoose.Schema({
  text: { type: String, required: true },
  score: { type: Number, required: true },
  color: { type: Number, required: true }
});

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  keyed: { type: String, required: true },
  domain: { type: String, required: true },
  facet: { type: Number, required: true },
  num: { type: Number, required: true }
});

const Choice = mongoose.model('Choice', choiceSchema);
const Question = mongoose.model('Question', questionSchema);

export { Choice, Question };