import React, {useEffect, useState} from 'react'
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { getSchemaForQuestion, 
    getUiSchemaForQuestion, 
    getCombinedSchemaForChildQuestions, 
    getCombinedUiSchemaForChildQuestions } from '../schemas/schemaUtils'; 



export const PastApplications = () => {
    const [questions, setQuestions] = useState([])
    const [userAnswer, setUserAnswer] = useState({})
    const [showchildQuestion, setShowChildQuestion] = useState(false)

    useEffect(() => {
        fetch("/api/parent-questions")
          .then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
          })
          .then(data => {
            const pastApplications = data.filter(q => q.section.includes("Past applications"));
            setQuestions(pastApplications);
          })
          .catch(error => console.error("Error fetching questions:", error));
      }, []);

    
      console.log(questions[0])

      let questionSchema = {
        "type": "object",
        "properties": {
          "answer": {
            "type": 'string',
            "enum": questions[0]?.optionValues.split(";").map((option) => option.trim()),
          }
        }
      }
      
    let uiSchema = {
        type: "Group",
        label: questions[0]?.questionText,
        elements: [
          {
            type: "Control",
            scope: "#/properties/answer",
            options: { format: "radio" }
          }
        ]
      };

      const handleNext = () => {

        if (userAnswer.answer === 'Yes'){
            setShowChildQuestion(true)
            console.log(showchildQuestion)
        }
      }
      
  return (
    <div>
        <h2>{questions[0]?.section}</h2>
        <h3>{questions[0]?.subSection1}</h3>

        <JsonForms
        schema = {questionSchema}
        uischema = {uiSchema}
        data = {userAnswer}
        renderers={materialRenderers}
        onChange ={({errors, data}) => setUserAnswer(data)} />
        
        <button onClick = {handleNext}>Previous</button>
        <button onClick = {handleNext}>Next</button>
        
    </div>
  )
}
