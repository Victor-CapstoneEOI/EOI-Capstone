import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";

export const Wellness = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState({});
  const [showChildQuestion, setShowChildQuestion] = useState(false);
  const [childSchema, setChildSchema] = useState(null);
  const [uiChildSchema, setUiChildSchema] = useState(null);

  useEffect(() => {
    fetch("/api/parent-questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.slice(21, 26));

        // console.log('Questions:', data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Setting up all dynamic values for schema and uiSchemas
  let questionSchema = {};
  let uiSchema = {};

  let section = questions[current]?.section;
  let subSection = questions[current]?.subSection1;
  let question = questions[current]?.questionText;
  let formType = questions[current]?.formControlType;
  let optionValues;

  if (formType == "Drop-down List" || formType == "Buttons") {
    optionValues = questions[current]?.optionValues.split(";");
    console.log(optionValues);
  }

  // Handling next and previous button for form logic

  const getNextQuestion = (currentIndex, questions, userAnswer) => {
    const currentQuestion = questions[currentIndex];

    if (userAnswer.answer?.trim() === "Yes" && currentQuestion.childQuestions) {
      console.log(currentQuestion);
      childQuestionsSchemas(currentQuestion);
      setShowChildQuestion(true);
    }

    let nextIndex = currentIndex + 1;
    while (nextIndex === 1 || nextIndex === 3) {
      nextIndex++;
    }

    // Ensure the next index is within bounds
    if (nextIndex < questions.length) {
      return nextIndex;
    }

    return currentIndex;
  };

  const handleNext = () => {
    const newIndex = getNextQuestion(current, questions, userAnswer);
    if (newIndex < questions.length) {
      setCurrent(newIndex);
    }
    // setShowChildQuestion(false);
  };

  //Previous
  const handlePrevious = () => {
    let newIndex = current - 1;

    // Find the previous valid question index
    while (newIndex >= 0) {
      if (newIndex === 1 || newIndex === 3) {
        newIndex--;
      } else {
        break;
      }
    }

    if (newIndex >= 0) {
      setCurrent(newIndex);
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
      console.log("inside 'if'");
      console.log(question.childQuestions[0]?.optionValues.split(";"));

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
  };

  return (
    <div>
      <h2>{section}</h2>
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
