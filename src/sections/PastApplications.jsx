import React, {useEffect, useState} from 'react'

export const PastApplications = () => {
    const [questions, setQuestions] = useState([])
    const [showChildQuestion, setShowChildQuestion] = useState(false)
    const [userAnswer, setUserAnswer] = useState({})

    useEffect(() => {
        fetch('/api/parent-questions')  
          .then(response => response.json())
          .then(data => {
            setQuestions(data.filter(question => question.section === 'Past applications'));
           
            // console.log('Questions:', data);
          })
          .catch(error => console.error('Error fetching questions:', error));
      }, []);

      let section = questions[0]?.section
      let subSection = questions[0]?.subSection1
      let question = questions[0]?.questionText
      let optionValues = questions[0]?.optionValues.split(";") 

        console.log(optionValues)
       


  return (
    <div>PastApplications</div>
  )
}
