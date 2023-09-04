
// import { useState, useEffect, useRef } from "react";
import React, { useState, useEffect, useRef, useContext } from "react";

import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { getSchemaForQuestion, getUiSchemaForQuestion } from '../schemas/schemaUtils';
import FormContext from "../Components/FormContext";


export const PersonalInformation = () => {
  const { updateFormData } = useContext(FormContext);

  const [formData, setFormData] = useState({});
  const formDataRef = useRef(formData);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFieldEmpty, setIsFieldEmpty] = useState(true);

  useEffect(() => {
    fetch("/api/parent-questions")
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(data => {
        const filteredQuestions = data.filter(q => q.section === "Personal information");
        setQuestions(filteredQuestions);
        setCurrentQuestionIndex(0); 
        console.log(filteredQuestions)
      })
      .catch(error => console.error("Error fetching questions:", error));
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
        updateFormData({ [currentQuestion.questionText]: formData }); // Store the form data in the context
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

  console.log('Current Question:', currentQuestion);
  console.log('Schema:', getSchemaForQuestion(currentQuestion));
  console.log('UI Schema:', getUiSchemaForQuestion(currentQuestion));
  console.log('Form Data:', formData);
 

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