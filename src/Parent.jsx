import React, {useState}from 'react'
import { JsonForms } from '@jsonforms/react'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'

export const Parent = () => {
    const [data, setData] = useState('')

    // to populate schema 
    let type = 'String'
    let title = 'name' // this is the key in the object 

    // to populate UI schema 
    let label = 'First name'
    let typeUI = 'Control'

    let questionSchema = {
        "properties" : {
            title: {
                "type" : type
            }
        }
    }

    let uiSchema = {
        "type": typeUI,
        "scope": title, 
        "label": label
    }


  return (
    <div>
        <JsonForms
        schema = {questionSchema}/>
        uischema = {uiSchema}
        data = {data}
        renderers = {materialRenderers}
        cells = {materialCells}
        onchange = {({data}) => setData(data)}
    </div>
  )
}
