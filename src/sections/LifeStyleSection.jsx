import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";

import { generateQuestionSchemaAndUISchema } from '../schemas/generateQuestionSchemaAndUISchema';

export const LifeStyleSection = ({ index }) => {
  const [currentQuestionData, setCurrentQuestionData] = useState({});
  const [nestedQuestionData, setNestedQuestionData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(index);
  const [nestedIndex, setNestedIndex] = useState(0);
  
  
  const [isMainFieldEmpty, setIsMainFieldEmpty] = useState(true);

  useEffect(() => {
    fetch('/api/parent-questions/Lifestyle')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        console.log('Questions:', data);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const previous = () => {
    if (nestedIndex === 0) {
      if (current > 0) {
        setCurrent(current - 1);
        initializeCurrentQuestionData();
      }
      setNestedIndex(0);
    } else {
      setNestedIndex(nestedIndex - 1);
    }
  };

  const next = () => {
    // Validate the current question's answer field
    const isMainValid = validateAnswer(currentQuestionData);

    // Validate the nested question's answer field
    const isNestedValid = validateAnswer(nestedQuestionData);

    if (isMainValid && isNestedValid) {
      if (nestedIndex < nestedQuestions.length - 1) {
        setNestedIndex(nestedIndex + 1);
      } else {
        if (current < questions.length - 1) {
          setCurrent(current + 1);
          initializeCurrentQuestionData();
        }
        setNestedIndex(0);
      }
    } else {
      console.error('Validation error: Answer is required.');
    }
  };

  const validateAnswer = (data) => {
   
    return data.answer !== undefined && data.answer !== null && data.answer !== '';
  };

  const initializeCurrentQuestionData = () => {
    setCurrentQuestionData({});
    setNestedQuestionData({});
  };

  const currentQuestion = questions[current];
  const nestedQuestions = currentQuestion?.childQuestions || [];

  const { questionSchema, uiSchema } = generateQuestionSchemaAndUISchema(currentQuestion);
  
  const parseDisplayLogic = (logic) => {
    if (!logic) return null;

    const questionMatch = logic.match(/\[(.*?)\]/);
    const answerMatch = logic.match(/\(('.*?')\)/);

    if (questionMatch && answerMatch) {
        const question = questionMatch[1];
        const answer = answerMatch[1].replace(/'/g, "");
        
        return { question, answer };
    }
    return null;
  };

  const shouldDisplayNestedQuestion = (nestedQuestion, childData) => {
    const logic = nestedQuestion["displayQuestionLogic"];
    if (!logic) return false;
    if (logic === "Page Load") return true;

    const parsedLogic = parseDisplayLogic(logic);
    
    return parsedLogic && childData[parsedLogic.question] === parsedLogic.answer;
  };


const next = () => {
  console.log("Next button clicked. Parent answer:", parentData.answer, "Subform trigger:", currentQuestion?.subFormTrigger);

  // If showing nested questions, store the current nested question answer into childData.
  if (showNestedQuestions && currentNestedIndex < nestedQuestions.length) {
    const questionText = nestedQuestions[currentNestedIndex].labelText;
    setChildData(prevData => ({ ...prevData, [questionText]: childData[questionText] }));
  }

  if (showNestedQuestions) {
    let foundMatch = false;

    for (let i = currentNestedIndex + 1; i < nestedQuestions.length; i++) {
      const nextNestedQuestion = nestedQuestions[i];

      console.log('Checking nested question:', nextNestedQuestion);
      console.log('Child data:', childData);
      
      if (shouldDisplayNestedQuestion(nextNestedQuestion, childData)) {
        console.log('Match found for:', nextNestedQuestion);
        setCurrentNestedIndex(i);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      setCurrent(prevCurrent => prevCurrent + 1);
      setShowNestedQuestions(false);
      setCurrentNestedIndex(0);  // Reset nested index for future questions
    }
  } else if (doesAnswerMatchSubFormTrigger(parentData.answer, currentQuestion?.subFormTrigger) && nestedQuestions.length) {
    setShowNestedQuestions(true);
    
    // Initially check for any question with the "Page Load" logic to set as the first question
    const pageLoadIndex = nestedQuestions.findIndex(q => q["Display Question Logic"] === "Page Load");
    setCurrentNestedIndex(pageLoadIndex >= 0 ? pageLoadIndex : 0);
  } else {
    setCurrent(prevCurrent => prevCurrent + 1);
    setShowNestedQuestions(false);  // Reset for the next question
    setChildData({});  // Clear childData for the next question
  }
};


const previous = () => {
  console.log("Previous button clicked");
  
  // If showing nested questions and not at the first nested question
  if (showNestedQuestions && currentNestedIndex > 0) {
    setCurrentNestedIndex(prevNestedIndex => prevNestedIndex - 1);
  } else {
    setCurrent(prevCurrent => prevCurrent - 1);
    // If the previous parent question has nested questions
    if (current - 1 >= 0 && questions[current - 1].childQuestions?.length) {
      setShowNestedQuestions(true);
      setCurrentNestedIndex(questions[current - 1].childQuestions.length - 1);  // Go to the last nested question of the previous parent question
    } else {
      setShowNestedQuestions(false); // Reset for previous question
    }
  }
  setChildData({});
};

const handleKeyPress = event => {
  if (event.key === "Enter") {
    next();
  }
};

const disableNext = (current >= questions.length - 1 && (!nestedQuestions.length || !doesAnswerMatchSubFormTrigger(parentData.answer, currentQuestion?.subFormTrigger))) || questions.length === 0;
const disablePrevious = current <= 0 && currentNestedIndex <= 0;

  return (
    <>
      <h2>{currentQuestion?.section}</h2>

      <JsonForms
        schema={questionSchema}
        uischema={uiSchema}
        data={currentQuestionData}
        renderers={[...materialRenderers, ...materialCells]}
        onChange={({ errors, data }) => setCurrentQuestionData(data)}
      />

      {currentQuestionData.answer === 'Yes' && nestedQuestions.length > 0 && (
        <div>
          <h4>{currentQuestion.subSection1}</h4>

          <h4>{nestedQuestions[nestedIndex].subSection1}</h4>

          <p>{nestedQuestions[nestedIndex].labelText}</p>

          <JsonForms
            schema={generateQuestionSchemaAndUISchema(nestedQuestions[nestedIndex]).questionSchema}
            uischema={generateQuestionSchemaAndUISchema(nestedQuestions[nestedIndex]).uiSchema}
            data={nestedQuestionData}
            renderers={[...materialRenderers, ...materialCells]}
            onChange={({ errors, data }) => {
              setNestedQuestionData(data);
              setIsMainFieldEmpty(!data.answer);
            }}
          />
        </div>
      )}

      <button onClick={previous} disabled={current === 0 && nestedIndex === 0}>
        Previous
      </button>
      <button
        onClick={next}
        disabled={(current === questions.length - 1 && nestedIndex === nestedQuestions.length - 1) || isMainFieldEmpty}
      >
        Next
      </button>
    </>
  );
};
