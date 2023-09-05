import React, { useEffect, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";

export const PastApplications = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState({});
  const [current, setCurrent] = useState(0);
  const [showchildQuestion, setShowChildQuestion] = useState(false);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetch("/api/parent-questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(
          data.filter((q) => q.section.includes("Past applications"))
        );
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  let section = questions[current]?.section;
  let subSection = questions[current]?.subSection1;
  let question = questions[current]?.questionText;
  let optionValues = questions[current]?.optionValues.split(";");

  let questionSchema = {
    type: "object",
    properties: {
      answer: {
        type: "string",
        enum: optionValues,
      },
    },
    required: ["answer"],
  };

  let uiSchema = {
    type: "Group",
    label: question,
    elements: [
      {
        type: "Control",
        scope: "#/properties/answer",
        options: {
          format: "radio",
        },
      },
    ],
  };

  const handleNext = () => {
    if (current === 0 ){
      setShowChildQuestion(true);
      setIsVisible(false);
    }

  };

  const handlePrevious = () => {
    setShowChildQuestion(false)
    setIsVisible(true)
  }

  return (
    <div>
      {/* <h2>{section}</h2> */}
      <h3>{subSection}</h3>

      {!showchildQuestion && questions.length > 0 && (
        <div>
          <JsonForms
            schema={questionSchema}
            uischema={uiSchema}
            data={userAnswer}
            renderers={materialRenderers}
            onChange={({ errors, data }) => setUserAnswer(data)}
          />
        </div>
      )}

      {showchildQuestion && userAnswer.answer?.trim() === "Yes" && (
        <div>
          <JsonForms
            schema={{
              type: "object",
              properties: {
                answer: {
                  type: "string",
                },
              },
              required: ["answer"],
            }}
            uischema={{
              type: "Control",
              label: questions[current].childQuestions[0]?.labelText,
              scope: "#/properties/answer",
              options: {
                format: "textarea",
                rows: 5,
              },
            }}
            data={userAnswer}
            renderers={materialRenderers}
            onChange={({ errors, data }) => setUserAnswer(data)}
          />
        </div>
      )}
      {!isVisible &&<button onClick={handlePrevious}>Previous</button>}
      {isVisible && userAnswer.answer?.trim() === "Yes" && <button onClick={handleNext}>Next</button>}
    </div>
  );
};
