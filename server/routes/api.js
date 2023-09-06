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
    if (!req.body || !req.body.sections || !req.body.signature) {
        return res.status(400).json({ error: "Missing or invalid request body" });
    }

    const { sections, signature } = req.body;
  
    try {
        const newFullFormAnswer = new FullFormAnswer({
            sections,
            signature  // Add the signature field here
        });
  
        await newFullFormAnswer.save();
          
        res.status(201).json({ message: "Form saved successfully" });
    } catch (error) {
        console.error("Error while saving form:", error); // Log the error for more clarity
        res.status(500).json({ error: error.message });
    }
});

// API endpoint to fetch form data
router.get('/getFormData', async (req, res) => {
  try {
    const formData = await FullFormAnswer.find({}); 
    res.json({ formData });
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch the latest data entry
router.get('/getLastFormData', async (req, res) => {
    try {
     
      const latestData = await FullFormAnswer.findOne().sort({ timestamp: -1 });
      if (!latestData) {
        return res.status(404).json({ message: 'No data found' });
      }
      res.json({ formData: latestData });
    } catch (error) {
      console.error('Error fetching latest form data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
export default router;