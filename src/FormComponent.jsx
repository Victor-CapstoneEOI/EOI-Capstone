import { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react'; 
import { Generate } from '@jsonforms/core'; 
import { materialRenderers } from '@jsonforms/material-renderers'; 

export const FormComponent = ({ index }) => {
  const [data, setData] = useState('');
  const [parentQuestions, setParentQuestions] = useState([]);
  const [current, setCurrent] = useState(index);
  const [showNestedQuestions, setShowNestedQuestions] = useState(false);

  useEffect(() => {
    fetch('/api/parent-questions/Lifestyle')
      .then(response => response.json())
      .then(data => {
        setParentQuestions(data);
        console.log('Parent Questions:', data);
      })
      .catch(error => console.error('Error fetching parent questions:', error));
  }, []);

  const handleShowNestedChange = event => {
    setShowNestedQuestions(event.target.value === 'Yes');
  };
  const previous = () => {
    setCurrent(current - 1);
  };
  const next = () => {
    setCurrent(current + 1);
  };

  const question = parentQuestions[current]?.questionText;
  const formControl = parentQuestions[current]?.formControlType;
  let optionsArray;
  let questionSchema = {};
  let uiSchema = {};

  if (formControl === 'Buttons' || formControl === 'Checkboxes' || formControl === 'Drop-down list') {
    optionsArray = parentQuestions[current]?.optionValues.split(';');
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
      
    case 'Drop-down list':
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
          },
        ],
      };
      break;

    case 'Textbox':
      questionSchema = {
        type: 'object',
        properties: {
          answer: {
            type: 'string',
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
          },
        ],
      };
      break;
      
    // Handle other cases...

    default:
      break;
  }
  return (
    <>
      <JsonForms
        schema={questionSchema}
        uischema={uiSchema}
        data={data}
        renderers={materialRenderers}
        onChange={({ errors, data }) => setData(data)}
      />

      <div>
        <label htmlFor="showNested">Show Nested Questions?</label>
        <select id="showNested" onChange={handleShowNestedChange}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      
      {showNestedQuestions && parentQuestions[current]?.nestedQuestions && (
        <div>
          <h4>Nested Questions</h4>
          {parentQuestions[current].nestedQuestions.map((nestedQuestion, nestedIndex) => (
            <div key={nestedIndex}>
              <p>{nestedQuestion.questionText}</p>
              {/* You can render additional properties of the nested question */}
              {nestedQuestion.formControlType === 'Textbox' && (
                <input type="text" placeholder="Answer" />
              )}
              {nestedQuestion.formControlType === 'Buttons' && (
                <div>
                  {/* Render radio buttons or other appropriate controls */}
                  {nestedQuestion.optionValues.split(';').map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input type="radio" name={`radio-${nestedIndex}`} value={option} />
                      {option}
                    </label>
                  ))}
                </div>
              )}
              {/* Handle other form control types */}
            </div>
          ))}
        </div>
      )}

      <button onClick={previous}>Previous</button>
      <button onClick={next}>Next</button>
    </>
  );
};