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
  const [shouldCheckChildStatus, setShouldCheckChildStatus] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState([]);

  const [childQuestions, setChildQuestions] = useState([]);
  const [isChildQuestion, setIsChildQuestion] = useState(false);
  const [currentParentQuestion, setCurrentParentQuestion] = useState(null);


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
    if (shouldCheckChildStatus) {
        determineChildQuestionStatus();
        setShouldCheckChildStatus(false);  // Reset after checking
    }
}, [formData, currentQuestionIndex, questions, shouldCheckChildStatus]);


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
    } else if (currentQuestion.subFormTrigger && currentQuestion.subFormTrigger.includes(`Selecting '${answer}'`)) {
      shouldShowChildQuestions = true;

    } if (currentQuestionIndex === 16 && answer !== 'None of the above') { // indices are 0-based, so 16 represents the 17th question
      shouldShowChildQuestions = true;
    }
    if (shouldShowChildQuestions) {
      setCurrentParentQuestion(currentQuestion);  // Store the current parent question
      setChildQuestions(currentQuestion.childQuestions);
      setIsChildQuestion(true);
    } else {
      setCurrentParentQuestion(null);
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

      // Push current state to the navigation history stack
      setNavigationHistory(prevHistory => [...prevHistory, {
        index: currentQuestionIndex,
        isChild: isChildQuestion
    }]);

    if (isChildQuestion) {
      setIsChildQuestion(false); // When on child questions, go back to the parent question's main content
    } else {
      determineChildQuestionStatus(); // Determine child status for current parent question
      if (!isChildQuestion) {
        setCurrentQuestionIndex(prev => prev + 1); // Increment to the next parent question only if we're not showing child questions
      }
    }
    } else if (direction === "previous") {
      if (navigationHistory.length > 0) {
          // Pop the last state from the navigation history stack
          const lastState = navigationHistory.pop();
          setCurrentQuestionIndex(lastState.index);
          setIsChildQuestion(lastState.isChild);
          setNavigationHistory([...navigationHistory]);  // This line updates the state with the modified history
      }
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
  let displayQuestion = isChildQuestion ? currentParentQuestion : currentQuestion;

  return (
    <div onKeyDown={handleKeyPress}>
      {displayQuestion?.section && <h2>{displayQuestion.section}</h2>}
      {displayQuestion?.subSection1 && <h3>{displayQuestion.subSection1}</h3>}
      {displayQuestion?.subSection2 && <h4>{displayQuestion.subSection2}</h4>}


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
 