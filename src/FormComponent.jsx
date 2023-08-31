import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';

export const FormComponent = ({ index }) => {
  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    fetch('/api/parent-questions/Lifestyle')  // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        console.log('Questions:', data);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const previous = () => {
    setCurrent(current - 1);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const currentQuestion = questions[current];
  const nestedQuestions = currentQuestion?.childQuestions || [];

  const question = currentQuestion?.questionText;
  const formControl = currentQuestion?.formControlType;
  let optionsArray;
  let questionSchema = {};
  let uiSchema = {};

  if (formControl === 'Buttons' || formControl === 'Checkboxes' || formControl === 'Drop-down list') {
    optionsArray = currentQuestion?.optionValues.split(';');
  }

  switch (formControl) {
    case 'Buttons':
    case 'Checkboxes':
      questionSchema = {
        type: 'object',
        properties: {
          answer: {
            type: 'string',
            enum: optionsArray,
          },
        },
      };

      uiSchema = {
        type: 'Group',
        label: question,
        elements: [
          {
            type: 'Control',
            scope: '#/properties/answer',
            options: {
              format: 'radio',
            },
          },
        ],
      };
      break;

    // Handle other cases...

    default:
      break;
  }

  const handleRadioChange = event => {
    const value = event.target.value;
    setData({ ...data, answer: value }); // Set the selected answer in the data
  };

  return (
    <>
      <JsonForms
        schema={questionSchema}
        uischema={uiSchema}
        data={data}
        renderers={materialRenderers}
        onChange={({ errors, data }) => setData(data)}
      />

      {data.answer === 'Yes' && nestedQuestions.length > 0 && (
        <div>
          <h4>Nested Questions</h4>
          {nestedQuestions.map((nestedQuestion, nestedIndex) => (
            <div key={nestedIndex}>
              <p>{nestedQuestion.labelText}</p>
              {/* Render nested question controls here */}
              {/* Use the dynamic UI schema for nestedQuestion */}
              <JsonForms
                schema={nestedQuestion.dynamicSchema}
                uischema={nestedQuestion.dynamicUISchema}
                data={data}
                renderers={materialRenderers}
                onChange={({ errors, data }) => setData(data)}
              />
            </div>
          ))}
        </div>
      )}

      <button onClick={previous} disabled={current === 0}>
        Previous
      </button>
      <button onClick={next} disabled={current === questions.length - 1}>
        Next
      </button>
    </>
  );
};
