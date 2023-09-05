import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { generateQuestionSchemaAndUISchema } from '../schemas/generateQuestionSchemaAndUISchema';

export const LifeStyleSection = ({ index }) => {
  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(index);

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
    setCurrent(current - 1);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const currentQuestion = questions[current];
  const nestedQuestions = currentQuestion?.childQuestions || [];

  const question = currentQuestion?.questionText;
  const formControl = currentQuestion?.formControlType;

  const { questionSchema, uiSchema } = generateQuestionSchemaAndUISchema(currentQuestion);

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

               <JsonForms
                schema={generateQuestionSchemaAndUISchema(nestedQuestions[nestedIndex]).questionSchema}
                uischema={generateQuestionSchemaAndUISchema(nestedQuestions[nestedIndex]).uiSchema}
                data={nestedQuestion}
                renderers={materialRenderers}
                onChange={({ errors, data }) => nestedQuestion(data)}
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
