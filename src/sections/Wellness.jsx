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

        if (userAnswer.answer?.trim() == 'Yes') {
          setShowChildQuestion(true);
        } else {
          setShowChildQuestion(false);
        }

    };
        
      //Previous
      const handlePrevious = () => {
        const newIndex = current - 1;
        if (newIndex === 1 || newIndex === 3){
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
    // let childQuestion; 
    // let childQuestion2;

    if((userAnswer.answer?.trim() == 'Yes')){
      // childQuestion = questions[current]?.childQuestions[0].labelText
    

    }

    
  

    console.log(userAnswer.answer)
    
      
    return (
      <div>
        <h2>{section}</h2>
        <h3>{subSection}</h3>

        {!showChildQuestion && (
          <div>
            
            <JsonForms
              schema={questionSchema}
              uischema={uiSchema}
              data={userAnswer}
              renderers={materialRenderers}
              onChange={({ errors, data }) => setUserAnswer(data)}
            />
          </div>
        )}
  
        {showChildQuestion && (
          <div>
            <JsonForms
              schema={childSchema}
              uischema={uiChildSchema}
              data={userAnswer}
              renderers={materialRenderers}
              onChange={({ errors, data }) => setUserAnswer(data)}
            />
          </div>
        )}
  
        <div>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    );
  };
