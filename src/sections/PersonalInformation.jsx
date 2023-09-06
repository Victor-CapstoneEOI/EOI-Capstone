import { useState, useEffect, useContext } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { getSchemaForQuestion, getUiSchemaForQuestion } from '../schemas/schemaUtils';
import FormContext from "../Components/FormContext";


export const PersonalInformation = () => {
  const { formData, updateFormData, activeSection, setActiveSection } = useContext(FormContext);
  
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
      })
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
        setIsFieldEmpty(true);
        return;
    }
    
    const schema = getSchemaForQuestion(currentQuestion);
    const requiredFields = schema.required || [];

    if (currentQuestion.questionText.toLowerCase().includes("(optional)")) {
      setIsFieldEmpty(false);
      return;
    }

    const emptyFields = requiredFields.filter(field => !formData[currentQuestion.questionText]);
    setIsFieldEmpty(emptyFields.length > 0);
  }, [currentQuestionIndex, questions, formData]);

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
        setCurrentQuestionIndex(nextIndex);
    } else {
        // Assuming you would like to increment the activeSection to move to the next form
        setActiveSection(activeSection + 1);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentQuestionIndex - 1;
    if (prevIndex >= 0) {
        setCurrentQuestionIndex(prevIndex);
    }
  };


  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Form Complete</div>;
  }
  // console.log(currentQuestion)
  return (
    <div onKeyDown={handleKeyPress}>
      <h2>{currentQuestion.section}</h2>
      {currentQuestion.subSection1 && <h3>{currentQuestion.subSection1}</h3>}
      {currentQuestion.subSection2 && <h4>{currentQuestion.subSection2}</h4>}
    
      <JsonForms
    key={currentQuestionIndex}
    schema={getSchemaForQuestion(currentQuestion)}
    uischema={getUiSchemaForQuestion(currentQuestion)}
    data={formData[currentQuestion.questionText]?.answer || {}}
    renderers={materialRenderers}
    onChange={({ data }) => updateFormData({ 
        [currentQuestion.questionText]: {
            answer: data,
            metadata: {
                section: currentQuestion.section, // Assuming 'section' is part of the question data
                questionText:currentQuestion.questionText,
                id: currentQuestion._id // Assuming each question has an 'id' field
            }
        }
    })}
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
