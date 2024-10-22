import { Question, Choice, AptitudeQuestion } from "../models/Question.js";
export const getOceanQuestions = async (req, res, next) => {
    try {
        const domains = ["O", "C", "E", "A", "N"];
        const plusKey = "plus";
        const minusKey = "minus";
        
        const allQuestions = [];

        for (const domain of domains) {
            const plusQuestions = await Question.find({
                domain: domain,
                keyed: plusKey,
            }).limit(7); 

            const minusQuestions = await Question.find({
                domain: domain,
                keyed: minusKey,
            }).limit(5); 

            allQuestions.push(...plusQuestions, ...minusQuestions);
        }

        const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);

        const choices = await Choice.find({});
        const sortedChoices = choices.sort((a, b) => a.score - b.score);

        res.json({ questions: shuffledQuestions, choices: sortedChoices });
    } catch (error) {
        next(error);
    }
};


export const getAptitudeQuestions = async (req, res, next) => {
    try{
        const aptitudeQuestions = await AptitudeQuestion.find({});
        const shuffledQuestions = aptitudeQuestions.sort(() => Math.random() - 0.5);
    
        res.status(200).json({shuffledQuestions});
    } catch(error){
        next(error);
    }
};