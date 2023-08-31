import React, {useState, useEffect} from 'react'

export const Wellness = () => {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        fetch('/api/parent-questions')  
          .then(response => response.json())
          .then(data => {
            setQuestions(data);
            console.log('Questions:', data);
          })
          .catch(error => console.error('Error fetching questions:', error));
      }, []);

      if (questions.length > 0) {
      console.log(questions[0].questionText)
      }


  return (
    <div>Test2</div>
  )
}
