import React, {useState, useEffect} from 'react'
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';


export const Wellness = () => {
    const [questions, setQuestions] = useState([])
    const [current, setCurrent] = useState(0)
    const [userAnswer, setUserAnswer] = useState({})
    const [showChildQuestion, setShowChildQuestion] = useState(false)
    

    useEffect(() => {
        fetch('/api/parent-questions')  
          .then(response => response.json())
          .then(data => {
            setQuestions(data.slice(21,26));
           
            // console.log('Questions:', data);
          })
          .catch(error => console.error('Error fetching questions:', error));
      }, []);

      // Setting up all dynamic values for schema and uiSchemas
      let questionSchema = {}
      let uiSchema = {} 

      let section = questions[current]?.section
      let subSection = questions[current]?.subSection1
      let question = questions[current]?.questionText
      let formType = questions[current]?.formControlType
      let optionValues; 

    
      if (formType== "Drop-down List"|| formType== "Buttons"){
        optionValues = questions[current]?.optionValues.split(";")
        console.log(optionValues)
       }

    
      // Handling next and previous button for form logic 

      //Next
      const handleNext = () => {
        const newIndex = current + 1;
        if (newIndex === 1 || newIndex === 3 ) {
          setCurrent(newIndex + 1); 
        } else if (newIndex < questions.length){
          setCurrent(newIndex);
        }

        if (userAnswer.answer?.trim() == 'Feet/Inches') {
          setShowChildQuestion(true);
        } else {
          setShowChildQuestion(false);
        }

    };
        
      //Previous
      const handlePrevious = () => {
        const newIndex = current - 1;
        if (newIndex === 1 || newIndex === 3 && newIndex === current - 1) {
          setCurrent(newIndex - 1); 
        } else if (newIndex > questions.length){
          setCurrent(newIndex);
        }
        setShowChildQuestion(false);
      };

      // Assign schemas to render questions with Json forms 
      switch (formType) {

        case "Drop-down List":
            questionSchema = {
                "type": "object",
                "properties": {
                  "answer": {
                    "type": 'string',
                    "enum": optionValues
                  }
                }
              }
              
            uiSchema = {
              "type": "Group",
              "label": question,
                "elements": 
                [{
                    "type": "Control",
                    "scope": "#/properties/answer"
                  }]
              }
              break;

        case "Textbox":
            questionSchema = {
                "type": "object",
                "properties": {
                  "answer": {
                    "type": 'string'
                  }
                }
              }
              
          uiSchema = {
                "type": "Group",
                "label": question,
                "elements": 
                [{
                    "type": "Control",
                    "scope": "#/properties/answer"
                  }]
              }

            break; 

            case "Buttons":
              questionSchema = {
                  "type": "object",
                  "properties": {
                    "answer": {
                      "type": 'string',
                      "enum": optionValues
                    }
                  }
                }
                
              uiSchema = {
                "type": "Group",
                "label": question,
                  "elements": 
                  [{
                      "type": "Control",
                      "scope": "#/properties/answer",
                      "options":{
                          "format": "radio"
                      }
                    }]
                }
                break;
    
      default:
      break;
    }   
    

    //Setting up values for child question schemas 
    
    let childSchema = {}
    let uiChildSchema = {}
    let childQuestion; 
    let childQuestion2;

    if((userAnswer.answer?.trim() == 'Feet/Inches')){
      childQuestion = questions[current]?.childQuestions[0].labelText
      

      childSchema = {
        type: 'object',
        properties: {
          
          answer1: {
            type: 'string',
            title: 'Answer 1',
            enum: ['Option 1A', 'Option 1B', 'Option 1C'],
          },
          answer2: {
            type: 'string',
            title: 'Answer 2',
            enum: ['Option 2A', 'Option 2B', 'Option 2C'],
          },
        },
      };

      uiChildSchema = {
        type: 'VerticalLayout',
        elements: [
          
          {
            type: 'Control',
            label: 'Answer 1',
            scope: '#/properties/answer1',
            options: {
              enum: ['Option 1A', 'Option 1B', 'Option 1C'],
            },
          },
          {
            type: 'Control',
            label: 'Answer 2',
            scope: '#/properties/answer2',
            options: {
              enum: ['Option 2A', 'Option 2B', 'Option 2C'],
            },
          },
        ],
      };
      


    }

    
  
    if ((userAnswer.answer?.trim()) == 'Centimetres'){
      childQuestion = questions[current + 1]?.childQuestions[0].labelText
      console.log(childQuestion)

      childSchema = {
        "type": "object",
                "properties": {
                  "answer": {
                    "type": 'string'
                  }
                }
      }

      uiChildSchema = {
        "type": "Group",
        "label": childQuestion,
        "elements": 
        [{
            "type": "Control",
            "scope": "#/properties/answer"
          }]

      }

    }

    console.log(userAnswer.answer)
    
      
  return (
    <div>
  
      <h2>{section}</h2>
      <h3>{subSection}</h3>

      <JsonForms
        schema={questionSchema}
        uischema={uiSchema}
        data={userAnswer}
        renderers={materialRenderers}
        onChange={({ errors, data }) => setUserAnswer(data)}
      />

{showChildQuestion && (
      <div>
        <JsonForms
          schema={childSchema}
          uischema={uiChildSchema}
          data={userAnswer}
          renderers={materialRenderers}
          onChange={({ errors, data }) => setUserAnswer(data)}
        />
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    )}

    {!showChildQuestion && (
      <div>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    )}
        

    </div>
  )
  
}
