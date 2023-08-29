import React, {useState}from 'react'
import { JsonForms } from '@jsonforms/react'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { Generate } from '@jsonforms/core'



export const Parent = () => {
    const [data, setData] = useState('')

    // const workbook = xlsx.readFile('EOI Form Data Analysis.xlsx');
    // const parentWorksheet = workbook.Sheets['Parent Questions'];
    // const childWorksheet = workbook.Sheets['Child Questions'];

    // console.log(parentWorksheet)
    // console.log(childWorksheet)

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
