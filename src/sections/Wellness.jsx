import {useState, useEffect} from 'react'
import { JsonForms } from '@jsonforms/react'
import { materialRenderers } from '@jsonforms/material-renderers'
import axios from "axios"
import { error } from 'console'

export const Wellness = () => {
  const [questions, setQuestions] = useState([]);
  const index = [5, 6, 7, 8, 9]

  useEffect(() => {
    axios.get("/api/parent-questions")
    .then(response => response.data)
    .then(data => {
      const wellnessQuestions = data.slice(5, 10)
      setQuestions(wellnessQuestions)
    })
    .catch(error => console.error("An error occured. Questions not fetched: ", error))
  }, []);

  return (
    <div>Wellnes</div>
  )
}
