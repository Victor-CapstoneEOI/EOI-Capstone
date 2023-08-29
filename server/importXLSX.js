import xlsx from 'xlsx';
import mongoose from 'mongoose';

// Load Excel file
const workbook = xlsx.readFile('EOI_Form_Data_(English).xlsx');
const parentWorksheet = workbook.Sheets['Parent Questions'];
const childWorksheet = workbook.Sheets['Child Questions'];

// Define your Mongoose schemas
const childQuestionSchema = new mongoose.Schema({
  labelText: String,
  formControlType: String,
  optionValues: String,
  // Add other attributes as needed
});

const ChildQuestion = mongoose.model('ChildQuestion', childQuestionSchema);

const parentQuestionSchema = new mongoose.Schema({
  questionText: String,
  section: String,
  subSection1: String,
  subSection2: String,
  formControlType: String,
  childQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChildQuestion' }],
  // Add other attributes as needed
});

const ParentQuestion = mongoose.model('ParentQuestion', parentQuestionSchema);

async function main() {
  // Connect to MongoDB using Mongoose
  await mongoose.connect('mongodb+srv://lmercedes03:kWfRIlNOecaTp8rU@cluster0.wssqiab.mongodb.net/eoi_form?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const parentData = xlsx.utils.sheet_to_json(parentWorksheet, { raw: true });
  const childData = xlsx.utils.sheet_to_json(childWorksheet, { raw: true });

  const childQuestions = []; // Store inserted child question IDs

  for (const childRow of childData) {
    const childQuestion = new ChildQuestion({
      labelText: childRow['Label Text'],
      formControlType: childRow['Form Control Type'],
      optionValues: childRow['Option Values'],
      // Add other attributes as needed
    });

    const savedChildQuestion = await childQuestion.save();
    childQuestions.push(savedChildQuestion._id); // Store the ID in the array
  }

  for (const parentRow of parentData) {
    const matchingChildQuestions = childData.filter(child => child['Sub-Form ID'] === parentRow['Sub-Form ID']);

    const parentQuestion = new ParentQuestion({
      questionText: parentRow['Question Text'],
      section: parentRow['Section'],
      subSection1: parentRow['Sub-Section 1'],
      subSection2: parentRow['Sub-Section 2'],
      formControlType: parentRow['Form Control Type'],
      childQuestions: matchingChildQuestions.map(child => childQuestions[childData.indexOf(child)]),
      // Add other attributes as needed
    });

    await parentQuestion.save();
  }

  // Close the MongoDB connection after data insertion
  mongoose.connection.close();
}

main().catch(err => {
  console.error('Error:', err);
});
