import {useState, useEffect}from 'react'
import { JsonForms } from '@jsonforms/react'
import { materialRenderers} from '@jsonforms/material-renderers'
// import { Next } from './Next'


// eslint-disable-next-line react/prop-types
export const Parent = ({index}) => {
    const [data, setData] = useState('')
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

    // console.log(parentQuestions[index])

    let question = parentQuestions[index].questionText // Questions to be asked to user
    let formControl = parentQuestions[index].formControlType 
    let optionsArray; 
    let questionSchema = {}
    let uiSchema = {}


    // to populate schema for options (checklist, or dropdown list)
    if (formControl == "buttons" || formControl == "checkboxes" ||formControl == "Drop-down List"){
      optionsArray = parentQuestions[index].optionValues.split(";")
    }

    
    //switch statement defines schemas for Json forms depending on the type of input

    switch ( formControl ) {
        case "buttons" || "checkboxes": // buttons no available in json forms; will use radio enum
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
            "type": "VerticalLayout",
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
                "type": "VerticalLayout",
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

    const next = () =>{
      index++
    }

    const previous = () =>{
      index--
    }
  return (
    <>
        <JsonForms
        schema = {questionSchema}
        uischema = {uiSchema}
        data = {data}
        renderers = {materialRenderers}
        onChange = {({errors, data}) => setData(data)}/>
        <button onClick={next}>Next</button>
        <button onClick={previous}>Previous</button>
    </>
  )
}
