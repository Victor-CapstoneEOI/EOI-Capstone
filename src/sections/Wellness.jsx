import React, {useState, useEffect} from 'react'
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';

import {generateQuestionSchemaAndUISchema} from '../schemas/schemaUtils'


export const Wellness = () => {
    const [questions, setQuestions] = useState([])
    const [current, setCurrent] = useState(0)
    const [data, setData] = useState({})

    useEffect(() => {
        fetch('/api/parent-questions')  
          .then(response => response.json())
          .then(data => {
            setQuestions(data.slice(21,26));
            // console.log('Questions:', data);
          })
          .catch(error => console.error('Error fetching questions:', error));
      }, []);

      let section = questions[current]?.section
      let subSection = questions[current]?.subSection1
      let question = questions[current]?.questionText
      let subFormTrigger = questions[current]?.subFormTrigger
      let formType = questions[current]?.formControl
      let optionValues; 


      if (formType== "Drop-down List" ){
        optionValues = questions[current]?.optionValues.split(";")
       }

      const handleNext = () => {
        const newIndex = current + 1;
        if (newIndex < questions.length) {
          setCurrent(newIndex);
        }
      };
    
      const handlePrevious = () => {
        const newIndex = current - 1;
        if (newIndex >= 0) {
          setCurrent(newIndex);
        }
      };

      // get schemas to render questions with Json forms 

      
      //check if question has trigger option
      //also check if question has children question
        //conditionally render the question if trigger option is selected
        //(Make sure it render just one question at a time)
      
  return (
    <div>
  
      <h2>{section}</h2>
      <h3>{subSection}</h3>
      <h4>{question}</h4>
{/* 
      <JsonForms
        schema={questionSchema}
        uischema={uiSchema}
        data={data}
        renderers={materialRenderers}
        onChange={({ errors, data }) => setData(data)}
      /> */}


    </div>
  )
}
