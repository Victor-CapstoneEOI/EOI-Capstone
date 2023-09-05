import mongoose from 'mongoose';

const childAnswerSchema = mongoose.Schema({
    childQuestionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChildQuestion'
    },
    answer: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

const parentAnswerSchema = mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ParentQuestion'
    },
    answer: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    childAnswers: [childAnswerSchema]
});

const sectionAnswerSchema = mongoose.Schema({
    section: {
        type: String,
        required: true
    },
    answers: [parentAnswerSchema]
});

const formDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    address: String,
  });
  
  const fullFormAnswerSchema = mongoose.Schema({
    sections: [sectionAnswerSchema],
    signature: {
      type: String,
      required: true,
    },
    formData: formDataSchema, 
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });

const FullFormAnswer = mongoose.model('FullFormAnswer', fullFormAnswerSchema);

export default FullFormAnswer;
