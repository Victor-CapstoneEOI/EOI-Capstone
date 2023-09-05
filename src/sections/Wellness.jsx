import { useState, useEffect, useContext } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import FormContext from "../Components/FormContext";


export const Wellness = () => {
  const [questions, setQuestions] = useState([]);
  const [currentParent, setCurrentParent] = useState(0);
  const [userAnswer, setUserAnswer] = useState({});

  const [showChildQuestion, setShowChildQuestion] = useState(false);
  const [childSchema, setChildSchema] = useState(null);
  const [uiChildSchema, setUiChildSchema] = useState(null);

  const [nestedIndex, setNestedIndex] = useState(0)
  const nestedQuestions = questions[4]?.childQuestions
  const {setActiveSection, activeSection} = useContext(FormContext)
  console.log(nestedQuestions)

  useEffect(() => {
    fetch("/api/parent-questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.slice(21, 26));

        
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Setting up all dynamic values for schema and uiSchemas
  let questionSchema = {};
  let uiSchema = {};

  let subSection = questions[currentParent]?.subSection1;
  let question = questions[currentParent]?.questionText;
  let formType = questions[currentParent]?.formControlType;
  let optionValues;

  if (formType == "Drop-down List" || formType == "Buttons") {
    optionValues = questions[currentParent]?.optionValues.split(";");
    console.log(optionValues);
  }

 

  const getNextQuestion = (parentIndex, questions, userAnswer) => {
  const currentQuestion = questions[parentIndex];

    if (userAnswer.answer?.trim() === "Feet/Inches" || userAnswer.answer?.trim() === "Centimetres" 
    ||userAnswer.answer?.trim() === "Pounds"|| userAnswer.answer?.trim() === "Kilograms"){
      childQuestionsSchemas(currentQuestion)
      setShowChildQuestion(true)
    }


    if (showChildQuestion){
      parentIndex +=2
      setShowChildQuestion(false)
      console.log(parentIndex)
    }


    if (userAnswer.answer?.trim() === "Yes" && currentQuestion.childQuestions) {

      childQuestionsSchemas(currentQuestion);
      setShowChildQuestion(true);
    } 

    if (userAnswer.answer?.trim() === "No" && parentIndex == 4){
      setActiveSection(activeSection + 1)
    }



    return parentIndex;
  };
  

  const handleNext = () => {
    const newParentIndex = getNextQuestion(currentParent, questions, userAnswer);
    if (newParentIndex < questions.length) {
      setCurrentParent(newParentIndex);
    }
  };

  //Previous
  const handlePrevious = () => {
    let newParentIndex = currentParent - 1;
    // Find the previous valid question index
    while (newParentIndex >= 0) {
      if (newParentIndex === 1 || newParentIndex === 3) {
        newParentIndex--;
      } else {
        break;
      }
    }

    if (newParentIndex >= 0) {
      setCurrentParent(newParentIndex);
    }
    setShowChildQuestion(false);
  };

  // Assign schemas to render questions with Json forms
  switch (formType) {
    case "Drop-down List":
      questionSchema = {
        type: "object",
        properties: {
          answer: {
            type: "string",
            enum: optionValues,
          },
        },
      };

      uiSchema = {
        type: "Group",
        label: question,
        elements: [
          {
            type: "Control",
            scope: "#/properties/answer",
          },
        ],
      };
      break;

    case "Textbox":
      questionSchema = {
        type: "object",
        properties: {
          answer: {
            type: "string",
          },
        },
      };

      uiSchema = {
        type: "Group",
        label: question,
        elements: [
          {
            type: "Control",
            scope: "#/properties/answer",
          },
        ],
      };

      break;

    case "Buttons":
      questionSchema = {
        type: "object",
        properties: {
          answer: {
            type: "string",
            enum: optionValues,
          },
        },
      };

      uiSchema = {
        type: "Group",
        label: question,
        elements: [
          {
            type: "Control",
            scope: "#/properties/answer",
            options: {
              format: "radio",
            },
          },
        ],
      };
      break;

    default:
      break;
  }

  //Setting up values for child question schemas
  console.log(userAnswer.answer);

  const childQuestionsSchemas = (question) => {

    if (userAnswer.answer?.trim() === "Yes") {
    
      let childSchema = {
        type: "object",
        properties: {
          answer: {
            type: "string",
            enum: question.childQuestions[0]?.optionValues.split(";"),
          },
        },
      };
      let uiChildSchema = {
        type: "Group",
        label: question.childQuestions[0]?.labelText,
        elements: [
          {
            type: "Control",
            scope: "#/properties/answer",
            options: {
              format: "radio",
            },
          },
        ],
      };

      setChildSchema(childSchema);
      setUiChildSchema(uiChildSchema);
    }

    if (userAnswer.answer?.trim() === "Feet/Inches") {
    
      let childSchema = {
        type: "object",
        properties: {
          Feet: {
            type: 'string',
            title: question.childQuestions[0]?.labelText,
            enum: question.childQuestions[0]?.optionValues.split(";"),
          },
          Inches: {
            type: 'string',
            title: question.childQuestions[1]?.labelText,
            enum: question.childQuestions[1]?.optionValues.split(";"),
          },
        },
      };
      let uiChildSchema = {
        type: "HorizontalLayout",
        elements: [
          {
            type: 'Control',
            label: question.childQuestions[0]?.labelText,
            scope: '#/properties/Feet',
            
          },
          {
            type: 'Control',
            label: question.childQuestions[1]?.labelText,
            scope: '#/properties/Inches',
          },
        ],
      };

      setChildSchema(childSchema);
      setUiChildSchema(uiChildSchema);
    }

    if (userAnswer.answer?.trim() === "Centimetres") {
    
      let childSchema = {
        type: "object",
        properties: {
          Centimetres: {
            type: "number",
          },
        },
      };
      let uiChildSchema = {
        type: "Group",
        label: questions[1].childQuestions[0]?.labelText,
        elements: [
          {
            type: "Control",
            scope: "#/properties/Centimetres",
          },
        ],
      };

      setChildSchema(childSchema);
      setUiChildSchema(uiChildSchema);
    }

    if (userAnswer.answer?.trim() === "Pounds") {
    
      let childSchema = {
        type: "object",
        properties: {
          pounds: {
            type: "number",
          },
        },
      };
      let uiChildSchema = {
        type: "Group",
        label: question.childQuestions[0]?.labelText,
        elements: [
          {
            type: "Control",
            scope: "#/properties/pounds",
          },
        ],
      };

      setChildSchema(childSchema);
      setUiChildSchema(uiChildSchema);
    }

    if (userAnswer.answer?.trim() === "Kilograms") {
    
      let childSchema = {
        type: "object",
        properties: {
          kilograms: {
            type: "number",
          },
        },
      };
      let uiChildSchema = {
        type: "Group",
        label: questions[3].childQuestions[0]?.labelText,
        elements: [
          {
            type: "Control",
            scope: "#/properties/kilograms",
          },
        ],
      };

      setChildSchema(childSchema);
      setUiChildSchema(uiChildSchema);
    }
  };

  console.log(userAnswer)

  return (
    <div>
      {/* <h2>{section}</h2> */}
      <h3>{subSection}</h3>

      {!showChildQuestion && (
        <div>
          <JsonForms
            schema={questionSchema}
            uischema={uiSchema}
            data={userAnswer}
            renderers={materialRenderers}
            onChange={({ errors, data }) => setUserAnswer(data)}
          />
        </div>
      )}

      {showChildQuestion && childSchema && uiChildSchema && (
        <div>
          <JsonForms
            schema={childSchema}
            uischema={uiChildSchema}
            data={userAnswer}
            renderers={materialRenderers}
            onChange={({ errors, data }) => setUserAnswer(data)}
          />
        </div>
      )}

      <div>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};
