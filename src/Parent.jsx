import {useState, useEffect}from 'react'
import { JsonForms } from '@jsonforms/react'
import { materialRenderers} from '@jsonforms/material-renderers'
// import { Axios } from 'axios'
// import { Next } from './Next'


// eslint-disable-next-line react/prop-types
export const Parent = ({index}) => {
    const [data, setData] = useState('')
    const [parentQuestions, setParentQuestions] = useState([]);
    const [current, setCurrent] = useState(index)

    useEffect(() => {
      fetch('/api/parent-questions')
        .then(response => response.json())
        .then(data => {
          setParentQuestions(data);
          console.log('Parent Questions:', data);
        })
        .catch(error => console.error('Error fetching parent questions:', error));
    }, []);


    if (parentQuestions.length > 0){
    console.log(parentQuestions[current])

    let question = parentQuestions[current].questionText // Questions to be asked to user
    let formControl = parentQuestions[current].formControlType 
    let optionsArray;
    let questionSchema = {}
    let uiSchema = {}


    // to populate schema for options (checklist, or dropdown list)
    if (formControl == "Buttons" || formControl == "Checkboxes"||formControl == "Drop-down list" ){
     optionsArray = parentQuestions[current].optionValues.split(";")
    }

    // console.log(optionsArray)

    
    // switch statement defines schemas for Json forms depending on the type of input
    switch ( formControl ) {
        case "Buttons"|| "Checkboxes": // buttons no available in json forms; will use radio enum
        questionSchema = {
            "type": "object",
            "properties": {
              "answer": {
                "type": 'string',
                "enum": optionsArray
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
        
        case "Drop-down List":
            questionSchema = {
                "type": "object",
                "properties": {
                  "answer": {
                    "type": 'string',
                    "enum": optionsArray
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
    
    //     //TODO case "Textboxes": // Date and signature for consent page
    }

    const handleNext = () => {
      const newIndex = current + 1;
      if (newIndex < parentQuestions.length) {
        setCurrent(newIndex);
      }
    };
  
    const handlePrevious = () => {
      const newIndex = current - 1;
      if (newIndex >= 0) {
        setCurrent(newIndex);
      }
    };

  return (
    <>
        <JsonForms
        schema = {questionSchema}
        uischema = {uiSchema}
        data = {data}
        renderers = {materialRenderers}
        onChange = {({errors, data}) => setData(data)}/>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
        
    </>
  )
}
}
