import React, { useRef, useState, useEffect, useContext } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import FormContext from "../Components/FormContext";
import { getSchemaForQuestion, 
  getUiSchemaForQuestion, 
  getCombinedSchemaForChildQuestions, 
  getCombinedUiSchemaForChildQuestions } from '../schemas/schemaUtils'; 

export const MedicalSection = () => {
  const { formData, updateFormData, activeSection, setActiveSection } = useContext(FormContext); // Use context values
  const formDataRef = useRef(formData);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
    formDataRef.current = formData; // Keep the ref updated with the latest value
  }, [formData]);

  const doesQuestionHaveChild = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return false;

    const currentQuestionText = currentQuestion.questionText;
    const answerValue = formData[currentQuestionText]?.answer?.answer;

    if (currentQuestionIndex === 0 && !isNaN(parseInt(answerValue, 10)) && parseInt(answerValue, 10) > 0) {
      return true;
    }
    if ([1, 2].includes(currentQuestionIndex) && answerValue !== 'Unknown' && answerValue !== 'None of the above') {
        return true;
    } 
    if (currentQuestion.subFormTrigger && currentQuestion.subFormTrigger.includes(`Selecting '${answerValue}'`)) {
        return true;
    } 
    if (currentQuestionIndex === 16 && answerValue !== 'None of the above') {
        return true;
    }
    return false;
};

  const handleNavigation = (direction) => {
    const currentQuestionText = (isChildQuestion ? currentParentQuestion : questions[currentQuestionIndex]).questionText;
    const isCurrentFieldEmpty = !formData[currentQuestionText] || formData[currentQuestionText].answer === "";

    if (direction === "next") {
        if (isCurrentFieldEmpty) {
            alert("Please fill in the required fields before proceeding.");
            return;
        }
        if (isChildQuestion) {
            setIsChildQuestion(false);
            setCurrentQuestionIndex(current => current + 1);
        } else {
            if (doesQuestionHaveChild()) {
                setIsChildQuestion(true);
                setCurrentParentQuestion(questions[currentQuestionIndex]);
                setChildQuestions(questions[currentQuestionIndex].childQuestions);
            } else {
                setIsChildQuestion(false);
                setCurrentQuestionIndex(current => current + 1);
            }
        }

        if (currentQuestionIndex >= questions.length - 1 && !isChildQuestion) {
            setActiveSection(activeSection + 1);
        }
        setNavigationHistory(prevHistory => [...prevHistory, {
            index: currentQuestionIndex,
            isChild: isChildQuestion
        }]);
    }

      if (direction === "previous") {
        if (navigationHistory.length > 0) {
            const lastState = navigationHistory.pop();
            setCurrentQuestionIndex(lastState.index);
            setIsChildQuestion(lastState.isChild);
            setNavigationHistory([...navigationHistory]);
        }
    }
  };
  
  const handleKeyPress = event => {
    if (event.key === "Enter") handleNavigation("next");
  };

  let currentSchema, currentUISchema;

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

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
      {/* {displayQuestion?.section && <h2>{displayQuestion.section}</h2>} */}
      {displayQuestion?.subSection1 && <h3>{displayQuestion.subSection1}</h3>}
      {displayQuestion?.subSection2 && <h4>{displayQuestion.subSection2}</h4>}

      <JsonForms
        schema={currentSchema}
        uischema={currentUISchema}
        data={formData[displayQuestion.questionText]?.answer || {}}
        renderers={[...materialRenderers, ...materialCells]}
        onChange={({ data }) => updateFormData({ 
            [displayQuestion.questionText]: {
                answer: data,
                metadata: {
                    section: displayQuestion.section,
                    id: displayQuestion._id 
                }
            }
        })}
        liveValidate={true}
      />
        <button type="button" onClick={() => handleNavigation("previous")} className="previous">
          Previous
        </button>
        <button type="button" onClick={() => handleNavigation("next")} disabled={!formData[displayQuestion.questionText] || formData[displayQuestion.questionText].answer === ""} className="next">
          Next
        </button>
    </div>
  );
};