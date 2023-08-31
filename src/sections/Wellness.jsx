import {useState, useEffect} from 'react'
import { JsonForms } from '@jsonforms/react'
import { materialRenderers } from '@jsonforms/material-renderers'
import axios from "axios"

export const Wellness = () => {
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState('')
  const index = [21, 22, 23, 24, 25]

  // fetching questions just for wellness section
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/parent-questions");
        const data = response.data;
        const wellnessQuestions = data.slice(21, 26)
        setQuestions(wellnessQuestions);
      } catch (error) {
        console.error("An error occurred. Questions not fetched: ", error);
      }
    };

    fetchQuestions();
  }, []);

  let optionsArray; 

  const schema = {
    "type": "object",
    "properties": {
      "answer": {
        "type": "string",
        "enum": optionsArray
      }
    }
  }

  const uiSchema = {
    
      "type": "Control",
      "scope": "#/properties/answer"
    
    }

  

  return (
    <div>

<JsonForms
        schema={schema}
        uischema={uiSchema}
        renderers={materialRenderers}

      />
      

    </div>
  )
}
