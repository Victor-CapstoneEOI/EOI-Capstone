import express from 'express';
import ChildQuestion from '../models/childQuestionSchema';
import ParentQuestion from '../models/parentQuestionSchema';

const router = express.Router();

router.get("/parent-questions", async (req, res) => {
    try {
      const parentQuestions = await ParentQuestion.find().populate('childQuestions');
      res.json(parentQuestions);
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

export default router;
