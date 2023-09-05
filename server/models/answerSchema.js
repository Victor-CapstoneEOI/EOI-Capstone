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

const fullFormAnswerSchema = mongoose.Schema({
    sections: [sectionAnswerSchema],
    signature: {  // Add this field for the signature
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const FullFormAnswer = mongoose.model('FullFormAnswer', fullFormAnswerSchema);

export default FullFormAnswer;
