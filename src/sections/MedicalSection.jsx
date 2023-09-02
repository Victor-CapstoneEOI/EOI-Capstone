import React, { useRef, useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { getSchemaForQuestion, 
  getUiSchemaForQuestion, 
  getCombinedSchemaForChildQuestions, 
  getCombinedUiSchemaForChildQuestions } from '../schemas/schemaUtils';  // Import your functions

export const MedicalSection = () => {
  const [formData, setFormData] = useState({});
  const formDataRef = useRef(formData);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFieldEmpty, setIsFieldEmpty] = useState(true);

  const [childQuestions, setChildQuestions] = useState([]);
  const [isChildQuestion, setIsChildQuestion] = useState(false);
 

  useEffect(() => {
    fetch("/api/parent-questions")
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(data => {
        const medicalQuestions = data.filter(q => q.section.startsWith("Medical"));
        setQuestions(medicalQuestions);
      })
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  useEffect(() => {
    determineChildQuestionStatus();
  }, [formData, currentQuestionIndex, questions]);

  useEffect(() => {
    formDataRef.current = formData; // Keep the ref updated with the latest value
  }, [formData]);

  const determineChildQuestionStatus = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    let shouldShowChildQuestions = false;
    const answer = formData.answer;

    if (currentQuestionIndex === 0 && !isNaN(parseInt(answer, 10)) && parseInt(answer, 10) > 0) {
        shouldShowChildQuestions = true;
    } else if ([1, 2].includes(currentQuestionIndex)) {
        if (answer !== 'Unknown' && answer !== 'None of the above') {
            shouldShowChildQuestions = true;
        }
    } else if (currentQuestion.subFormTrigger && currentQuestion.subFormTrigger.includes("Yes")) {
        shouldShowChildQuestions = true;
    }

    if (shouldShowChildQuestions) {
      setChildQuestions(currentQuestion.childQuestions);
      setIsChildQuestion(true);
    } else {
      setIsChildQuestion(false);
      setChildQuestions([]);
    }
};

const handleNavigation = (direction) => {
  if (direction === "next") {
      if (isFieldEmpty) {
          alert("Please fill in the required fields before proceeding.");
          return;
      }

      // If currently at a child question, always move to the next parent question
      if (isChildQuestion) {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsChildQuestion(false);
      } else {
        const nextParentQuestion = questions[currentQuestionIndex + 1];
        if (nextParentQuestion && determineChildQuestionStatus(nextParentQuestion)) {
          setIsChildQuestion(true);
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
        }
      }
  } else if (direction === "previous" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
  }
};

  const handleKeyPress = event => {
    if (event.key === "Enter") handleNavigation("next");
  };

  let currentSchema, currentUISchema;

  if (isChildQuestion) {
    currentSchema = getCombinedSchemaForChildQuestions(childQuestions);
    currentUISchema = getCombinedUiSchemaForChildQuestions(childQuestions);
  } else {
    const currentQuestion = questions[currentQuestionIndex];
    currentSchema = currentQuestion ? getSchemaForQuestion(currentQuestion) : {};
    currentUISchema = currentQuestion ? getUiSchemaForQuestion(currentQuestion, false) : {};
  }

  const determineCurrentQuestion = () => {
    const parentQuestion = questions[currentQuestionIndex];
    return parentQuestion;
  };

  let currentQuestion = determineCurrentQuestion();
  
  return (
    <div onKeyDown={handleKeyPress}>
      {currentQuestion?.section && <h2>{currentQuestion.section}</h2>}
      {currentQuestion?.subSection1 && <h3>{currentQuestion.subSection1}</h3>}
      {currentQuestion?.subSection2 && <h4>{currentQuestion.subSection2}</h4>}


      <JsonForms
        schema={currentSchema}
        uischema={currentUISchema}
        data={formData}
        renderers={[...materialRenderers, ...materialCells]}
        onChange={({ data }) => {
          setFormData(data);
          setIsFieldEmpty(!data.answer || data.answer === "");
        }}
        liveValidate={true}
      />

      <button type="button" onClick={() => handleNavigation("previous")}>
        Previous
      </button>
      <button type="button" onClick={() => handleNavigation("next")} disabled={!formData.answer || formData.answer === ""}>
        Next
      </button>
    </div>
  );
};
 