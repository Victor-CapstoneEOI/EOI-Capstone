import mongoose from 'mongoose';

const parentQuestionSchema = new mongoose.Schema({
  questionText: String,
  section: String,
  subSection1: String,
  subSection2: String,
  formControlType: String,
  optionValues: String,
  subFormTrigger: String,

  childQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChildQuestion' }],

});

const ParentQuestion = mongoose.model('ParentQuestion', parentQuestionSchema);

export default ParentQuestion;
