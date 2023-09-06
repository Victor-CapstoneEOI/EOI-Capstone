import React, { useState, useEffect, useContext } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { generateQuestionSchemaAndUISchema } from "../schemas/generateQuestionSchemaAndUISchema";
import FormContext from "../Components/FormContext";

export const LifeStyleSection = ({ index }) => {
  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(index);

  const { setActiveSection, activeSection } = useContext(FormContext);

  useEffect(() => {
    fetch("/api/parent-questions/Lifestyle")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        console.log("Questions:", data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const previous = () => {
    if (current == 0) {
      setActiveSection(activeSection - 1);
    } else setCurrent(current - 1);
  };

  const next = () => {
    if (current == questions.length - 1) {
      setActiveSection(activeSection + 1);
    } else setCurrent(current + 1);
  };

  const currentQuestion = questions[current];
  const nestedQuestions = currentQuestion?.childQuestions || [];

  const question = currentQuestion?.questionText;
  const formControl = currentQuestion?.formControlType;

  const { questionSchema, uiSchema } =
    generateQuestionSchemaAndUISchema(currentQuestion);

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setData({ ...data, answer: value }); // Set the selected answer in the data
  };

  return (
    <>
      {!questions && <div>Loading ...</div>}
      <JsonForms
        schema={questionSchema}
        uischema={uiSchema}
        data={data}
        renderers={materialRenderers}
        onChange={({ errors, data }) => setData(data)}
      />

      {data.answer === "Yes" && nestedQuestions.length > 0 && (
        <div>

          <h4>{currentQuestion.subSection1}</h4>

          <h4>{nestedQuestions[nestedIndex].subSection1}</h4>

          <p>{nestedQuestions[nestedIndex].labelText}</p>
          
          <JsonForms
            schema={
              generateQuestionSchemaAndUISchema(nestedQuestions[nestedIndex])
                .questionSchema
            }
            uischema={
              generateQuestionSchemaAndUISchema(nestedQuestions[nestedIndex])
                .uiSchema
            }
            data={nestedQuestionData}
            renderers={[...materialRenderers, ...materialCells]}
            onChange={({ errors, data }) => {
              setNestedQuestionData(data);
              setIsMainFieldEmpty(!data.answer);
            }}
          />
        </div>
      )}

      <button onClick={previous} disabled={current === 0 && nestedIndex === 0} className="previous">
        Previous
      </button>
      <button
        onClick={next}
        disabled={
          (current === questions.length - 1 &&
            nestedIndex === nestedQuestions.length - 1) ||
          isMainFieldEmpty
        } 
        className="next"
      >
        Next
      </button>
    </>
  );
};
