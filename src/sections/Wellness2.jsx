import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";

export const Wellness2 = () => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormdata] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  // const [uiSchemaWithRules, setUiSchemaWithRules] = (initialUiSchema);

  useEffect(() => {
    fetch("/api/parent-questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.slice(21, 26));

        // console.log('Questions:', data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  

    const formStructure = [
      {
        step: 1,
        question: questions[0]?.questionText,
        inputField: "heightUnits",
        options: questions[0]?.optionValues.split(";").trim(),
        condition1: (formData) => formData.heightUnits === "Centimetres",
        condition2: (formData) => formData.heightUnits === "Feet/Inches",
      },

      {
        step: 2,
        question: questions[2]?.questionText,
        inputField: "heightUnits",
        options: questions[2]?.optionValues.split(";").trim(),
        condition1: (formData) => formData.heightUnits === "Pounds",
        condition2: (formData) => formData.heightUnits === "Kilograms",
      },

      
      {
        step: 3,
        question: questions[4]?.questionText,
        inputField: "heightUnits",
        options: questions[4]?.optionValues.split(";").trim(),
        condition1: (formData) => formData.heightUnits === "Yes",
        condition2: (formData) => formData.heightUnits === "No",
      },
    ];
  

  return <div>Wellness2</div>;
};
