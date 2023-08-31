import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react'; 
import { Generate } from '@jsonforms/core'; 
import { materialRenderers } from '@jsonforms/material-renderers'; 

function FormComponent() {
  const [parentQuestions, setParentQuestions] = useState([]);

  useEffect(() => {
    fetch('/api/parent-questions')
      .then(response => response.json())
      .then(data => {
        setParentQuestions(data);
        console.log('Parent Questions:', data);
      })
      .catch(error => console.error('Error fetching parent questions:', error));
  }, []);

  function generateSchemaForQuestion(question) {
    const schema = {
      type: 'object',
      properties: {
        [question._id]: {
          type: 'string',
          title: question.questionText,
        },
      },
    };
    return schema;
  }
  return (
    <div>
      <h2>Parent Questions Form</h2>
      {parentQuestions.map(question => (
        <div key={question._id}>
          <h3>{question.questionText}</h3>
         
          <JsonForms
            schema={generateSchemaForQuestion(question)}
            uischema={Generate.uiSchema(generateSchemaForQuestion(question))}
            data={{}} 
            renderers={materialRenderers}
          />
        </div>
      ))}
    </div>
  );
}

export default FormComponent;
