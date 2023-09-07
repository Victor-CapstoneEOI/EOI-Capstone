import { useState, useRef,useEffect, useContext } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import FormContext from "../Components/FormContext";
import { WellnessPrevious } from "./WellnessPrevious";

export const Wellness = () => {
  const [questions, setQuestions] = useState([]);
  const [currentParent, setCurrentParent] = useState(0);
  const [userAnswer, setUserAnswer] = useState({});

  const [showChildQuestion, setShowChildQuestion] = useState(false);
  const [childSchema, setChildSchema] = useState(null);
  const [uiChildSchema, setUiChildSchema] = useState(null);

  const [nestedIndex, setNestedIndex] = useState(0);
  const nestedQuestions = questions[4]?.childQuestions;
  const { formData, setActiveSection, activeSection, updateFormData } = useContext(FormContext);
  
    useEffect(() => {
      
        fetch("/api/parent-questions")
          .then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
          })
          .then(data => {
            const WellnessQuestions = data.filter(q => q.section.startsWith("Wellness"));
            setQuestions(WellnessQuestions);
          })
          .catch(error => console.error("Error fetching questions:", error));
      
    }, []);
  

    const getNextQuestion = (parentIndex, questions, userAnswer) => {
      const currentQuestion = questions[parentIndex];
    
      const answer = userAnswer?.answer; // Check if userAnswer and answer exist
    
      if (
        answer?.trim() === "Feet/Inches" ||
        answer?.trim() === "Centimetres" ||
        answer?.trim() === "Pounds" ||
        answer?.trim() === "Kilograms"
      ) {
        childQuestionsSchemas(currentQuestion, answer); // Pass answer to childQuestionsSchemas
        setShowChildQuestion(true);
      }
    
      if (showChildQuestion) {
        parentIndex += 2;
        setShowChildQuestion(false);
        console.log(parentIndex);
      }
    
      if (answer?.trim() === "Yes" && currentQuestion.childQuestions) {
        childQuestionsSchemas(currentQuestion, answer); // Pass answer to childQuestionsSchemas
        setShowChildQuestion(true);
      }
    
      if (answer?.trim() === "No" && parentIndex == 4) {
        setActiveSection(activeSection + 1);
      }
    
      return parentIndex;
    };

  const handleNext = () => {
    const newParentIndex = getNextQuestion(
      currentParent,
      questions,
      userAnswer
    );
  
    if (newParentIndex < questions.length) {
      setCurrentParent(newParentIndex);
    }

  };

  //Previous
  const handlePrevious = () => {
    if (showChildQuestion) setShowChildQuestion(false)
    if (currentParent == 0) setActiveSection(activeSection - 1);
    
  };

  // Setting up all dynamic values for schema and uiSchemas
  let questionSchema = {};
  let uiSchema = {};

  let subSection = questions[currentParent]?.subSection1;
  let question = questions[currentParent]?.questionText;
  let formType = questions[currentParent]?.formControlType;
  let option;

  if (formType == "Drop-down List" || formType == "Buttons" || formType == "Checkboxes") {
    option = questions[currentParent]?.optionValues.split(";");
    
  }
  
  // Assign schemas to render questions with Json forms
  switch (formType) {
    case "Drop-down List":
      questionSchema = {
        type: "object",
        properties: {
          answer: {
            type: "string",
            enum: option,
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
            enum: option,
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
  const childQuestionsSchemas = (question, userAnswer) => {
    if (userAnswer.answer?.trim() === "Yes") {
      let childSchema = {
        type: "object",
        properties: {
          answer: {
            type: "string",
            enum: question.childQuestions[0]?.option.split(";"),
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
            type: "string",
            title: question.childQuestions[0]?.labelText,
            enum: question.childQuestions[0]?.option.split.split(";"),
          },
          Inches: {
            type: "string",
            title: question.childQuestions[1]?.labelText,
            enum: question.childQuestions[1]?.option.split(";"),
          },
        },
      };
      let uiChildSchema = {
        type: "HorizontalLayout",
        elements: [
          {
            type: "Control",
            label: question.childQuestions[0]?.labelText,
            scope: "#/properties/Feet",
          },
          {
            type: "Control",
            label: question.childQuestions[1]?.labelText,
            scope: "#/properties/Inches",
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

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  
  console.log("Child Questions:", questions[currentParent].childQuestions)
  console.log("Child Questions Id:", questions[currentParent].childQuestions[currentParent]._id)
  console.log("Child Questions Text:", questions[currentParent].childQuestions[currentParent].labelText)

  return (
    <div>
      
      {!showChildQuestion && (
        <div>
          <h3>{subSection}</h3>
          <JsonForms
            schema={questionSchema}
            uischema={uiSchema}
            data={formData[question]?.answer || {}}
            renderers={materialRenderers}
            onChange={({ errors, data }) => {
              setUserAnswer(data)
              if (question && questions[currentParent]) {
                updateFormData({ 
                  [question]: {
                    answer: data,
                    metadata: {
                      section: "Wellness",
                      id: questions[currentParent]?._id,
                      questionText: questions[currentParent]?.questionText
                    }
                  }
                });
              }
            }}
          />
        </div>
      )}

      {showChildQuestion && childSchema && uiChildSchema && (
        <div>
          <JsonForms
            schema={childSchema}
            uischema={uiChildSchema}
            data={formData[question.childQuestions?.labelText]}
            renderers={materialRenderers}
            onChange={({ errors, data }) => {setUserAnswer(data)
              if (question.childQuestions) {
                const childQuestionKey = question.childQuestions.labelText;
                const childQuestionId = questions[currentParent]?.childQuestions[currentParent]._id;
                const childQuestionLabelText = questions[currentParent]?.childQuestions[currentParent].labelText;
              
                updateFormData({ 
                  [childQuestionKey]: {
                    answer: data,
                    metadata: {
                      section: "Wellness",
                      id: childQuestionId,
                      labelText: childQuestionLabelText
                    }
                  }
                });
              }
            }}
          />

        </div>
      )}
    
      <div>
        <button onClick={handlePrevious} className="previous">Previous</button>
        <button onClick={handleNext} className="next">Next</button>
      </div>
    </div>
  );
};
  