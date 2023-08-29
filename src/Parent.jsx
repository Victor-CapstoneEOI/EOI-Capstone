import {useState, useEffect}from 'react'
import { JsonForms } from '@jsonforms/react'
import { materialRenderers} from '@jsonforms/material-renderers'
// import axios from 'axios'
// import { Generate } from '@jsonforms/core'

const sample = {
    
    "medical": {
    "questionText": "In the past 2 years have you flown as a private pilot or taken part in any hazardous sports, or do you expect to take part in the next 12 months?",
    "formControl": "textbox",
    "optionValues": null,
    "subFormTrigger":null,
    "childQuestions":[]
},

"wellness": {
    "questionText": "Height Measurement",
    "formControl": "Drop-down List",
    "optionValues": "Feet/Inches;Centimetres",
    "subFormTrigger":"selecting Feet/Inches ",
    "childQuestions":["1"]
},

"lifestyle questions": {
    "questionText": "In the past 2 years have you flown as a private pilot or taken part in any hazardous sports, or do you expect to take part in the next 12 months?",
    "formControl": "Buttons",
    "optionValues": "Yes;No",
    "subFormTrigger":"selecting 'Yes'",
    "childQuestions":["2"]
}, 


}

const sampleChild = {
    "1":{
        "labelText": "Feet",
        "formControl": "Drop-down List",
        "optionValues": "0;1;2;3;4;5;6;7;8;9;"
        
    },
    "2":{
        "labelText": "In the past 2 years, have you participated in, or plan to participate in, the following activities: Check all that apply",
        "formControl": "Checkboxes",
        "optionValues": "Aviation, including private piloting or ultralight;Backcountry snow sports, including skiing, snowboarding, snowmobiling, high-marking;Hang-gliding, parachuting, base-jumping, sky-diving;Heli-skiing;Ice, rock, and mountain climbing;Racing of all kinds;Scuba diving"  
    }

}



export const Parent = () => {
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
    // console.log(sample.medical.questionText)

    console.log(parentQuestions[1])

    let question = sample.medical.questionText// this variable needs to loop thru all question text, Questions to be asked to user
    let formControl; 

    // to populate schema 
    let optionsArray = sample.wellness.optionValues.split(";")// list of options for checklist, or dropdown list 

    // to populate UI schema 
    let typeUI = 'Control'

    let questionSchema = {}
    let uiSchema = {}

    questionSchema = {
        "type": "object",
        "properties": {
          "answer": {
            "type": 'string',
            "enum": optionsArray
          }
        }
      }
      
    uiSchema = 
      {
        "type": "Group",
        "label": question,
        
        "elements": 
        [{
            "type": typeUI,
            "scope": "#/properties/answer",
            "options":
            {
            "format": "radio"
            }
          }],
      }
    
      

    // to create array for options: optionValue.split(";"), optionValue needs to be created
    // console.log(sample.wellness.optionValues.split(";"))

    // Loop thru sections in sample data set
    // for (const section in sample){

    //     question = section.questionText
    //     formControl = section.formControl

    //     // check this condition 

    //     // if ( section.optionValues !== null){
    //     //     optionsArray = section.optionValues.split(";") // check this***
    //     //     console.log(optionsArray)
    //     // }

    //     //switch statement defines schemas for Json forms depending on the type of input
    //   // **switch and question should be in the same loop**
    // switch ( formControl ) {
    //     case "buttons" || "checkboxes": // buttons no available in json forms; will use radio enum
    //     questionSchema = {
    //         "type": "object",
    //         "properties": {
    //           "answer": {
    //             "type": 'string',
    //             "enum": optionsArray
    //           }
    //         }
    //       }
          
    //     uiSchema = {
    //         "type": "VerticalLayout",
    //         "label": question,
    //         "elements": 
    //         [{
    //             "type": typeUI,
    //             "scope": "#/properties/answer",
    //             "options":{
    //                 "format": "radio"
    //             }
    //           }]
    //       }
    //       break;
        
    //     case "Drop-down List":
    //         questionSchema = {
    //             "type": "object",
    //             "properties": {
    //               "answer": {
    //                 "type": 'string',
    //                 "enum": optionsArray
    //               }
    //             }
    //           }
              
    //         uiSchema = {
    //             "type": "VerticalLayout",
    //             "label": question,
    //             "elements": 
    //             [{
    //                 "type": typeUI,
    //                 "scope": "#/properties/answer"
    //               }]
    //           }
    //           break;

    //     case "Textbox":
    //         questionSchema = {
    //             "type": "object",
    //             "properties": {
    //               "answer": {
    //                 "type": 'string'
    //               }
    //             }
    //           }
              
    //         uiSchema = {
    //             "type": "Group",
    //             "label": question,
    //             "elements": 
    //             [{
    //                 "type": typeUI,
    //                 "scope": "#/properties/answer"
    //               }]
    //           }

    //         break; 
    
    //     //TODO case "Textboxes": // Date and signature for consent page

    // }
    // }

    // Create function to be call when you click next 
    // Also create button for next for this test 



      


    // console.log(data)


  return (
    <div>
    
        <JsonForms
        schema = {questionSchema}
        // uischema = {Generate.uiSchema(questionSchema)}
        uischema = {uiSchema}
        data = {data}
        renderers = {materialRenderers}
        // cells = {materialCells}
        onChange = {({errors, data}) => setData(data)}/>
    </div>
  )
}
