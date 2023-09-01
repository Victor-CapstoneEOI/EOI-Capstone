import React, {useState, useEffect} from 'react'
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';


export const Wellness = () => {
    const [questions, setQuestions] = useState([])
    const [current, setCurrent] = useState(0)
    const [data, setData] = useState({})
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

      let section = questions[current]?.section
      let subSection = questions[current]?.subSection1
      let question = questions[current]?.questionText
      // let subFormTrigger = questions[current]?.subFormTrigger
      let formType = questions[current]?.formControlType
      let optionValues; 

      let questionSchema = {}
      let uiSchema = {}


      if (formType== "Drop-down List"|| formType== "Buttons"){
        optionValues = questions[current]?.optionValues.split(";")
       }

    

      const handleNext = () => {
        const newIndex = current + 1;
        if (newIndex === 1 || newIndex === 3 && newIndex === current + 1) {
          setCurrent(newIndex + 1); 
        } else if (newIndex < questions.length){
          setCurrent(newIndex);
        }

        if (data.answer == 'Centimetres') {
          setShowChildQuestion(true);
        } else {
          setShowChildQuestion(false);
        }

    };
        
    
      const handlePrevious = () => {
        const newIndex = current - 1;
        if (newIndex === 1 || newIndex === 3 && newIndex === current - 1) {
          setCurrent(newIndex - 1); 
        } else if (newIndex > questions.length){
          setCurrent(newIndex);
        }
      };

      // get schemas to render questions with Json forms 
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

    //Next needs to skip index 22 nad 24 (index 1 and 3 for my section), but logic needs to include
    //what happends when you select it
   

      //check if question has trigger option
      // if(subFormTrigger.includes(data)){
      //   console.log("child question")
      // }

    
    //conditionally render the question if trigger option is selected
    //(Make sure it render just one question at a time)
    // console.log(questions[current + 1]?.childQuestions[0].labelText)
    let childSchema = {}
    let uiChildSchema = {}
    if (data.answer == 'Centimetres'){
      question = questions[current + 1]?.childQuestions[0].labelText
      console.log(question)

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
        "label": question,
        "elements": 
        [{
            "type": "Control",
            "scope": "#/properties/answer"
          }]

      }

    }
    


        console.log(current)
        console.log(data.answer)
      
  return (
    <div>
  
      <h2>{section}</h2>
      <h3>{subSection}</h3>

      <JsonForms
        schema={questionSchema}
        uischema={uiSchema}
        data={data}
        renderers={materialRenderers}
        onChange={({ errors, data }) => setData(data)}
      />

{showChildQuestion && (
      <div>
        <JsonForms
          schema={childSchema}
          uischema={uiChildSchema}
          data={data}
          renderers={materialRenderers}
          onChange={({ errors, data }) => setData(data)}
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

      
      

      {/* <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button> */}


    </div>
  )
}
