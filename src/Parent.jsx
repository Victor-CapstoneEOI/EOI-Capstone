import React from 'react'

export const Parent = () => {
    
    // to populate schema 
    let type = ''
    let title = '' // this is the key in the object 

    // to populate UI schema 
    let label = ''
    let typeUI = ''

    let question = {
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
    <div>Parent</div>
  )
}
