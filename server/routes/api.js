import express from 'express';
import ChildQuestion from '../models/childQuestionSchema.js';
import ParentQuestion from '../models/parentQuestionSchema.js';
import FullFormAnswer from '../models/answerSchema.js';

const router = express.Router();

router.get("/parent-questions", async (req, res) => {
    try {
      const parentQuestions = await ParentQuestion.find().populate('childQuestions');
      res.json(parentQuestions);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/parent-questions/Lifestyle", async (req, res) => {
    try {
        const sections = ["Lifestyle questions (1 of 3)", "Lifestyle questions (2 of 3)", "Lifestyle questions (3 of 3)"];
        const questionsPerSection = 3;
        const allQuestions = [];

        for (const section of sections) {
            const parentQuestionsInSection = await ParentQuestion.find({ section }).limit(questionsPerSection).populate('childQuestions');
            allQuestions.push(...parentQuestionsInSection);
        }

        if (allQuestions.length === 0) {
            res.status(404).json({ error: "No questions found" });
        } else {
            res.json(allQuestions);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/child-questions", async (req, res) => {
    try {
      const childQuestions = await ChildQuestion.find();
      res.json(childQuestions);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/save-full-form", async (req, res) => {
    // Check if the request body or the sections property is missing
    if (!req.body || !req.body.sections) {
        return res.status(400).json({ error: "Missing or invalid request body" });
    }

    const { sections } = req.body;
  
    try {
        const newFullFormAnswer = new FullFormAnswer({
            sections
        });
  
        await newFullFormAnswer.save();
          
        res.status(201).json({ message: "Form saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

  
export default router;