import {useState, useEffect, useRef} from 'react'
import { JsonForms } from '@jsonforms/react'
import { materialRenderers } from '@jsonforms/material-renderers'
import axios from "axios"

export const Wellness = () => {
  const [answer, setAnswer] = useState('')
  const formDataRef = useRef(answer);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] =useState(0);
  const [isFieldEmpty, setIsFieldEmpty] = useState(true);
  

  // fetching questions for wellness section only
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

  useEffect(() => {
    const savedData = sessionStorage.getItem("answer");
    if (savedData) {
      setAnswer(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    formDataRef.current = answer; // Keep the ref updated with the latest value
  }, [answer]);

  useEffect(() => {
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) {
        setIsFieldEmpty(true);
        return;
    }
  },[currentIndex, questions] )

  const handleNext = () => {
    if (isFieldEmpty) {
        alert("Please fill in the required fields before proceeding.");
        return;
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
        sessionStorage.setItem(`formData-${currentIndex}`, JSON.stringify(answer));
        setCurrentIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
        sessionStorage.setItem(`formData-${currentIndex}`, JSON.stringify(answer));
        setCurrentIndex(prevIndex);
    }
  };

  const currentQuestion = questions[currentIndex];

  

  
  // const schema = {
  //   "type": "object",
  //   "properties": {
  //     "answer": {
  //       "type": "string",
  //       "enum": optionsArray
  //     }
  //   }
  // }

  // const uiSchema = {
    
  //     "type": "Control",
  //     "scope": "#/properties/answer"
    
  //   }

  return (
    <div>
      {currentQuestion.subSection1 && <h3>{currentQuestion.subSection1}</h3>}
      {currentQuestion.subSection2 && <h4>{currentQuestion.subSection2}</h4>}

      <JsonForms
        key={currentIndex}
        schema={getSchemaForQuestion(currentQuestion)}
        uischema={getUiSchemaForQuestion(currentQuestion)}
        data={answer}
        renderers={materialRenderers}
        onChange={({ data }) => setAnswer(data)}

      />

      <button type="button" onClick={handlePrevious}>Previous</button>
      <button type="button" onClick={handleNext} disabled={isFieldEmpty}>Next</button>
        
    </div>
  )
}

const getSchemaForQuestion = (question) => {
  let schema = {
      "type": "object",
      "properties": {
        "answer": {
          "type": "string",
          "enum": question.optionValues.split(';')
        }
      }
    }

    return schema
}
const getUiSchemaForQuestion = (question) => {
  let uiSchema = {
      type: "Group",
      label: question.questionText,
      elements: [{
    
        "type": "Control",
        "scope": "#/properties/answer"
      }]
      
      }

      return uiSchema
}
