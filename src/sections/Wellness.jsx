import React, {useState, useEffect} from 'react'

export const Wellness = () => {
    const [questions, setQuestions] = useState([])
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        fetch('/api/parent-questions')  
          .then(response => response.json())
          .then(data => {
            setQuestions(data.slice(21,26));
            // console.log('Questions:', data);
          })
          .catch(error => console.error('Error fetching questions:', error));
      }, []);

      let section;
      let subSection; 
      let question; 
      let subFormTrigger; 
      let optionValues; 

      const handleNext = () => {
        const newIndex = current + 1;
        if (newIndex < questions.length) {
          setCurrent(newIndex);
        }
      };
    
      const handlePrevious = () => {
        const newIndex = current - 1;
        if (newIndex >= 0) {
          setCurrent(newIndex);
        }
      };
    

      console.log(questions[current]?.questionText)

      
      


  return (
    <div>
      <h2>{questions[current]?.section}</h2>
      <h3>{questions[current]?.subSection1}</h3>
      <h4>{questions[current]?.questionText}</h4>

      
    </div>
  )
}
