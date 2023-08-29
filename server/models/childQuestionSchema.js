import mongoose from 'mongoose';

const childQuestionSchema = new mongoose.Schema({
  labelText: String,
  formControlType: String,
  optionValues: String,

});

const ChildQuestion = mongoose.model('ChildQuestion', childQuestionSchema);

export default ChildQuestion;