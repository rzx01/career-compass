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

const aptitudeQuestionSchema = new mongoose.Schema({
  id:{type:Number},
  question:{type:String, required:true},
  correct_answer:{type:String},
  options:{type:[String], required:true},
  category:{type:String,required:true, enum :["Numerical Aptitude", "Spacial Aptitude", "Abstract Reasoning", "Perceptual Aptitude"]}
},{collection:"aptitude_questions"});

const Choice = mongoose.model('Choice', choiceSchema);
const Question = mongoose.model('Question', questionSchema);
const AptitudeQuestion = mongoose.model('AptitudeQuestion', aptitudeQuestionSchema);
export { Choice, Question, AptitudeQuestion};