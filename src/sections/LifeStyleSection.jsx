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
  
  // Track if the main question's field is empty
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
        // Navigate to the next parent question
        if (current < questions.length - 1) {
          setCurrent(current + 1);
          initializeCurrentQuestionData();
        }
        setNestedIndex(0);
      }
    } else {
      // Handle validation error, e.g., show an error message to the user
      console.error('Validation error: Answer is required.');
    }
  };

  const validateAnswer = (data) => {
    // Add your validation logic here
    // For example, check if the "answer" field is not empty or null
    return data.answer !== undefined && data.answer !== null && data.answer !== '';
  };

  const initializeCurrentQuestionData = () => {
    setCurrentQuestionData({});
    setNestedQuestionData({});
  };

  const currentQuestion = questions[current];
  const nestedQuestions = currentQuestion?.childQuestions || [];

  const { questionSchema, uiSchema } = generateQuestionSchemaAndUISchema(currentQuestion);

  const handleRadioChange = event => {
    const value = event.target.value;
    setCurrentQuestionData({ ...currentQuestionData, answer: value });
  };

  const handleNestedRadioChange = event => {
    const value = event.target.value;
    setNestedQuestionData({ ...nestedQuestionData, answer: value });
  };

  // Update the main field's empty state when it changes
  useEffect(() => {
    setIsMainFieldEmpty(!currentQuestionData.answer);
  }, [currentQuestionData]);

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
              // Update the nested field's empty state
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
