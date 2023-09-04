import React, { useEffect, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";

export const PastApplications = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState({});
  const [showchildQuestion, setShowChildQuestion] = useState(false);

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

  console.log(questions);
  let section = questions[0]?.section;
  let subSection = questions[0]?.subSection1;
  let question = questions[0]?.questionText;
  let optionValues = questions[0]?.optionValues.split(";");

  let questionSchema = {
    type: "object",
    properties: {
      answer: {
        type: "string",
        enum: optionValues,
      },
    },
    required: ["answer"]
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

  
  const toggleQuestion = () => {
    setShowChildQuestion(!showchildQuestion);
  };

  return (
    <div>
      <h2>{section}</h2>
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

      {showchildQuestion &&  userAnswer.answer?.trim() === "Yes" &&(
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
              label: questions[0].childQuestions[0]?.labelText,
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
      <button onClick={toggleQuestion}>Previous</button>
      <button onClick={toggleQuestion}>Next</button>
    </div>
  );
};
