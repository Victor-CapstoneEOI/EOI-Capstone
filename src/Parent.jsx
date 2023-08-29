import {useState}from 'react'
import { JsonForms } from '@jsonforms/react'
import { materialRenderers} from '@jsonforms/material-renderers'
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



    // to populate schema 
    let type = 'string'// type of input from user 

    // to populate UI schema 
    let label = 'First name'// Question to be asked to user
    let typeUI = 'Control'
    

    let questionSchema = {
        "type": "object",
        "properties": {
          "answer": {
            "type": type
          }
        }
      }
    let uiSchema = {
        "type": "Group",
        "label": label,
        "elements": [
          {
            "type": typeUI,
            "scope": "#/properties/answer"
          }
        ]
      }

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
