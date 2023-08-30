import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import axios from "axios";

export const PersonalInformation = () => {
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    axios
      .get("/api/parent-questions")
      .then((response) => response.data)
      .then((data) => {
        setQuestions(data);
        console.log("Parent Questions:", data);
      })
      .catch((error) =>
        console.error("Error fetching parent questions:", error)
      );
  }, []);

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setFormData({}); // Clear the input field
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
      setFormData({}); // Clear the input field
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleNext();
    }
  };

  const handleSubmit = () => {
    // Perform basic validation
    const currentQuestion = questions[currentQuestionIndex];
    const requiredFields = currentQuestion.requiredFields || [];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    // Assuming you have an API endpoint for saving form data
    axios
      .post("/api/submit-form", formData)
      .then((response) => {
        console.log("Form Data Submitted:", response.data);
        // Optionally, you can navigate to a success page or perform other actions
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle error, e.g., display an error message to the user
      });
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Form Complete</div>;
  }

  const section = currentQuestion.section;
  const subSection1 = currentQuestion.subSection1;
  const subSection2 = currentQuestion.subSection2;

  return (
    <div>
      <h2>{section}</h2>
      {subSection1 && <h3>{subSection1}</h3>}
      {subSection2 && <h4>{subSection2}</h4>}

      <JsonForms
        schema={getSchemaForQuestion(currentQuestion)}
        uischema={getUiSchemaForQuestion(currentQuestion)}
        data={formData}
        renderers={materialRenderers}
        onChange={({ data }) => setFormData(data)}
        onKeyDown={handleKeyPress} // Handle Enter key press
        liveValidate={false} // Prevent live validation on input change
      >
        <button type="button" onClick={handlePrevious}>
          Previous
        </button>
        <button type="button" onClick={handleNext}>
          Next
        </button>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </JsonForms>
    </div>
  );
};

const getSchemaForQuestion = (question) => {
  const formControl = question.formControlType;
  let schema = {
    type: "object",
    properties: {},
    required: [], // Define required fields if needed
  };

  switch (formControl) {
    case "Buttons":
    case "Checkboxes":
      schema.properties.answer = {
        type: "string",
        enum: question.optionValues.split(";").map((option) => option.trim()),
      };
      break;

    case "Drop-down list":
      schema.properties.answer = {
        type: "string",
        enum: question.optionValues.split(";").map((option) => option.trim()),
      };
      break;

    case "Textbox":
      schema.properties.answer = {
        type: "string",
      };
      schema.required = ["answer"]; // Make answer field required
      break;

    default:
      break;
  }

  return schema;
};

const getUiSchemaForQuestion = (question) => {
  const formControl = question.formControlType;
  let uiSchema = {};

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleNext();
    }
  };

  switch (formControl) {
    case "Buttons":
    case "Checkboxes":
      uiSchema = {
        type: "Group",
        label: question.questionText,
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

    case "Drop-down list":
      uiSchema = {
        type: "Group",
        label: question.questionText,
        elements: [
          {
            type: "Control",
            scope: "#/properties/answer",
          },
        ],
      };
      break;

      case "Textbox":
        uiSchema = {
          type: "Group",
          label: question.questionText,
          elements: [
            {
              type: "Control",
              scope: "#/properties/answer",
              onKeyDown: handleKeyPress,
            },
          ],
        };
        break;

    default:
      break;
  }

  return uiSchema;
};
