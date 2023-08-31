// LifeStyleSection.js
import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import LifeStyleChildQuestion from './LifeStyleChildQuestions';

function LifeStyleSection() {
  const [parentQuestions, setParentQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showChildQuestions, setShowChildQuestions] = useState(false);

  useEffect(() => {
    fetch('/api/parent-questions/Lifestyle')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Data:', data);
        setParentQuestions(data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error fetching parent questions:', error);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const handleAnswer = (index, answer) => {
    setUserAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = answer;
      return updatedAnswers;
    });

    // Determine whether to show child questions based on the answer
    if (answer.toLowerCase() === 'yes') {
      setShowChildQuestions(true);
    } else {
      setShowChildQuestions(false);
    }
  };

  const selectedQuestion = parentQuestions[current];
  const formControl = selectedQuestion.formControlType;

  const optionsArray =
    formControl === 'Buttons' || formControl === 'Checkboxes' || formControl === 'Drop-down list'
      ? selectedQuestion.optionValues.split(';')
      : [];

  const questionSchema = {
    type: 'object',
    properties: {
      answer: {
        type: 'string',
        enum: optionsArray,
      },
    },
  };

  const uiSchema = {
    type: 'Group',
    label: selectedQuestion.questionText,
    elements: [
      {
        type: 'Control',
        scope: '#/properties/answer',
        options: {
          format: formControl === 'Buttons' || formControl === 'Checkboxes' ? 'radio' : undefined,
        },
      },
    ],
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const previous = () => {
    setCurrent(current - 1);
  };

 
  return (
    <>
      <JsonForms
        schema={questionSchema}
        uischema={uiSchema}
        data={userAnswers[current]}
        renderers={materialRenderers}
        onChange={({ data }) => handleAnswer(current, data.answer)}
      />
      <button onClick={previous}>Previous</button>
      <button onClick={next}>Next</button>

      <div>
        {showChildQuestions && selectedQuestion.childQuestions && (
          selectedQuestion.childQuestions.map(childQuestion => (
            <LifeStyleChildQuestion
              key={childQuestion._id}
              childQuestion={childQuestion}
              showChildQuestions={showChildQuestions}
              setShowChildQuestions={setShowChildQuestions}
            />
          ))
        )}
      </div>
    </>
  );
}

export default LifeStyleSection;