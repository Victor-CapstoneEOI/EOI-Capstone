import React, { useState, useEffect, useRef } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import axios from "axios";

export const PersonalInformation = () => {
  const [formData, setFormData] = useState({});
  const formDataRef = useRef(formData);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFieldEmpty, setIsFieldEmpty] = useState(true);

  useEffect(() => {
    // Fetch questions only once
    axios
      .get("/api/parent-questions")
      .then(response => response.data)
      .then(data => {
        const filteredQuestions = data.filter(question => question.section === 'Personal information');
        setQuestions(filteredQuestions);
      })
      .catch(error => console.error("Error fetching parent questions:", error));
  }, []);

  useEffect(() => {
    const savedData = sessionStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    formDataRef.current = formData; // Keep the ref updated with the latest value
  }, [formData]);

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
        setIsFieldEmpty(true);
        return;
    }
    
    const schema = getSchemaForQuestion(currentQuestion);
    const requiredFields = schema.required || [];

    // If the question is optional, do not check for empty fields and allow users to proceed
    if (currentQuestion.questionText.toLowerCase().includes("(optional)")) {
      setIsFieldEmpty(false);
      return;
    }

    const emptyFields = requiredFields.filter(field => !formData[field]);
    setIsFieldEmpty(emptyFields.length > 0);
}, [currentQuestionIndex, questions, formData]);


  useEffect(() => {
    const currentFormData = JSON.parse(sessionStorage.getItem(`formData-${currentQuestionIndex}`) || '{}');
    setFormData(currentFormData);
  }, [currentQuestionIndex]);

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      handleNext();
    }
  };

  const handleNext = () => {
    if (isFieldEmpty) {
        alert("Please fill in the required fields before proceeding.");
        return;
    }
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
        sessionStorage.setItem(`formData-${currentQuestionIndex}`, JSON.stringify(formData));
        setCurrentQuestionIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentQuestionIndex - 1;
    if (prevIndex >= 0) {
        sessionStorage.setItem(`formData-${currentQuestionIndex}`, JSON.stringify(formData));
        setCurrentQuestionIndex(prevIndex);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Form Complete</div>;
  }

  return (
    <div onKeyDown={handleKeyPress} >
      <h2>{currentQuestion.section}</h2>
      {currentQuestion.subSection1 && <h3>{currentQuestion.subSection1}</h3>}
      {currentQuestion.subSection2 && <h4>{currentQuestion.subSection2}</h4>}

      <JsonForms
        key={currentQuestionIndex}
        schema={getSchemaForQuestion(currentQuestion)}
        uischema={getUiSchemaForQuestion(currentQuestion)}
        data={formData}
        renderers={materialRenderers}
        onChange={({ data }) => setFormData(data)}
        liveValidate={true}
      />

      <button type="button" onClick={handlePrevious}>
        Previous
      </button>
      <button type="button" onClick={handleNext} disabled={isFieldEmpty}>
        Next
      </button>
    </div>
  );
};

const getSchemaForQuestion = (question) => {
  const formControl = question.formControlType;
  let schema = {
    type: "object",
    properties: {},
    required: question.requiredFields || [],
  };

  const isDateQuestion = question.questionText.includes("date") || question.questionText.includes("Date");
  const isOptional = question.questionText.toLowerCase().includes("(optional)");
  const isAddressQuestion = question.questionText.includes('Address');

  if (isAddressQuestion) {
    schema.properties.address = {
      type: "object",
      properties: {
        street: { type: "string", title: "Street" },
        street2: { type: "string", title: "Street" },
        city: { type: "string", title: "City" },
        state: { type: "string", title: "State" },
        zip: { type: "string", title: "ZIP" }
      }
    };
    if (!isOptional) {
      schema.required = ["address"];
    }
  } else if (isDateQuestion) {
    schema.properties.answer = {
      type: "string",
      format: "date"
    };
    if (!isOptional) {
      schema.required = ["answer"];
    }
  } else {
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
        if (!isOptional) {
          schema.required = ["answer"];
        }
        break;

      default:
        break;
    }
  }

  return schema;
};


const getUiSchemaForQuestion = (question) => {
  const formControl = question.formControlType;
  let uiSchema = {};

  const isDateQuestion = question.questionText.includes("date") || question.questionText.includes("Date");
  const isAddressQuestion = question.questionText.includes('Address');

  if (isAddressQuestion) {
    uiSchema = {
      type: "Group",
      label: question.questionText,
      elements: [
        {
          type: "Control",
          scope: "#/properties/address/properties/street"
        },
        {
          type: "Control",
          scope: "#/properties/address/properties/street2"
        },
        {
          type: "Control",
          scope: "#/properties/address/properties/city"
        },
        {
          type: "Control",
          scope: "#/properties/address/properties/state"
        },
        {
          type: "Control",
          scope: "#/properties/address/properties/zip"
        }
      ]
    };
  } else if (isDateQuestion) {
    uiSchema = {
      type: "Group",
      label: question.questionText,
      elements: [
        {
          type: "Control",
          scope: "#/properties/answer",
          options: {
            widget: "date"
          }
        }
      ]
    };
  } else {
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
            },
          ],
        };
        break;

      default:
        break;
    }
  }
  
  return uiSchema;
};

export default PersonalInformation;