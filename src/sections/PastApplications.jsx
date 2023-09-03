import React, {useEffect, useState} from 'react'

export const PastApplications = () => {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        fetch("/api/parent-questions")
          .then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
          })
          .then(data => {
            const pastApplications = data.filter(q => q.section.includes("Past applications"));
            setQuestions(pastApplications);
            console.log(pastApplications)
          })
          .catch(error => console.error("Error fetching questions:", error));
      }, []);
  return (
    <div>PastApplications</div>
  )
}
