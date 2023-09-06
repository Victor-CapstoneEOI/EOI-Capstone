import React, { useState, useEffect, useContext, useRef } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { generateQuestionSchemaAndUISchema } from "../schemas/generateQuestionSchemaAndUISchema";
import FormContext from "../Components/FormContext";

export const LifeStyleSection = ({ index }) => {
  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(index);
  const [nestedIndex, setNestedIndex] = useState(0);  // track the nested question index

  const { formData, updateFormData, setActiveSection, activeSection } = useContext(FormContext);

  useEffect(() => {
    fetch("/api/parent-questions/Lifestyle")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const previous = () => {
    const currentQuestion = questions[current];
    const nestedQuestions = currentQuestion?.childQuestions || [];
    
    if (nestedIndex > 0) {
      setNestedIndex(nestedIndex - 1);
    } else if (current > 0) {
      setCurrent(current - 1);
      setNestedIndex(0);  // reset nested index when going to a new parent question
    } else if (activeSection > 0) {
      // Move to the previous section and set to its last question
      setActiveSection(activeSection - 1);
      // Use the lastQuestionIndex stored in context to know which question to set as current
      const prevSectionLastQuestionIndex = lastQuestionIndex[activeSection - 1];
      setCurrent(prevSectionLastQuestionIndex || 0);
      setNestedIndex(0); // you can enhance this to also remember nested questions
    }
  };

  const next = () => {
    const currentQuestion = questions[current];
    const nestedQuestions = currentQuestion?.childQuestions || [];

    if (data.answer === "Yes" && nestedIndex < nestedQuestions.length - 1) {
      setNestedIndex(nestedIndex + 1);
    } else if (current < questions.length - 1) {
      setCurrent(current + 1);
      setNestedIndex(0);  // reset nested index when going to a new parent question
    } else {
      setActiveSection(activeSection + 1);
    }
  };

  const currentQuestion = questions[current];
  const nestedQuestions = currentQuestion?.childQuestions || [];
  const question = currentQuestion?.questionText;
  const formControl = currentQuestion?.formControlType;
  const { questionSchema, uiSchema } = generateQuestionSchemaAndUISchema(currentQuestion);

  const isMainFieldEmpty = !data?.answer;

  console.log("Current question:", currentQuestion)
  return (
    <>
      {!questions && <div>Loading ...</div>}
      <JsonForms
        schema={questionSchema}
        uischema={uiSchema}
        data={formData[question]?.answer || {}}
        renderers={materialRenderers}
        onChange={({ errors, data }) => {
          setData(data);
          updateFormData({ 
            [question]: {
              answer: data,
              metadata: {
                  section: "Lifestyle",
                  id: currentQuestion._id
              }
            }
          });
        }}
      />

      {data.answer === "Yes" && nestedQuestions.length > 0 && (
        <div>
          <h4>{currentQuestion.subSection1}</h4>
          <h4>{nestedQuestions[nestedIndex].subSection1}</h4>
          <p>{nestedQuestions[nestedIndex].labelText}</p>
          <JsonForms
            schema={generateQuestionSchemaAndUISchema(nestedQuestions[nestedIndex]).questionSchema}
            uischema={generateQuestionSchemaAndUISchema(nestedQuestions[nestedIndex]).uiSchema}
            data={formData[nestedQuestions[nestedIndex].questionText]?.answer || {}}
            renderers={[...materialRenderers, ...materialCells]}
            onChange={({ errors, data }) => {
              updateFormData({ 
                [nestedQuestions[nestedIndex].questionText]: {
                  answer: data,
                  metadata: {
                      section: "Lifestyle",
                      id: nestedQuestions[nestedIndex]._id
                  }
                }
              });
            }}
          />
        </div>
      )}

      <button onClick={previous} disabled={current === 0 && nestedIndex === 0} className="previous">
        Previous
      </button>
      <button onClick={next} disabled={isMainFieldEmpty} className="next">
        Next
      </button>
    </>
  );
};