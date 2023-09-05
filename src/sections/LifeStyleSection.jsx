import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

import { generateQuestionSchemaAndUISchema } from "../schemas/generateQuestionSchemaAndUISchema";

export const LifeStyleSection = ({ index }) => {
  const [currentQuestionData, setCurrentQuestionData] = useState({});
  const [nestedQuestionData, setNestedQuestionData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(index);
  const [nestedIndex, setNestedIndex] = useState(0);

  const [isMainFieldEmpty, setIsMainFieldEmpty] = useState(true);

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
    if (nestedIndex === 0) {
      if (current > 0) {
        setCurrent(current - 1);
        initializeCurrentQuestionData();
      }
      setNestedIndex(0);
    } else {
      setNestedIndex(nestedIndex - 1);
    }
  };

  const validateAnswer = (data) => {
    return (
      data.answer !== undefined && data.answer !== null && data.answer !== ""
    );
  };

  const next = () => {
    // Validate the nested question's answer field
    const isNestedValid = validateAnswer(nestedQuestionData);

    if (nestedIndex < nestedQuestions.length - 1) {
      setNestedIndex(nestedIndex + 1);
      initializeNestedQuestionData();
    } else {
      initializeNestedQuestionData();

      if (currentQuestionData.answer === "Yes") {
        if (current < questions.length - 1) {
          setCurrent(current + 1);
          initializeCurrentQuestionData();
          setNestedIndex(0);
        } else {
          console.log("finish.");
        }
      } else {
        let nextParentIndex = current + 1;
        while (
          nextParentIndex < questions.length &&
          questions[nextParentIndex].type === "nested"
        ) {
          nextParentIndex++;
        }
        if (nextParentIndex < questions.length) {
          setCurrent(nextParentIndex);
          initializeCurrentQuestionData();
          setNestedIndex(0);
        } else {
          console.log("done");
        }
      }
    }
  };

  const initialCurrentQuestionData = {};
  const initialNestedQuestionData = {};

  const initializeCurrentQuestionData = () => {
    setCurrentQuestionData({ ...initialCurrentQuestionData });
  };

  const initializeNestedQuestionData = () => {
    setNestedQuestionData({ ...initialNestedQuestionData });
  };

  const currentQuestion = questions[current];
  const nestedQuestions = currentQuestion?.childQuestions || [];

  const { questionSchema, uiSchema } =
    generateQuestionSchemaAndUISchema(currentQuestion);

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setCurrentQuestionData({ ...currentQuestionData, answer: value });
  };

  const handleNestedRadioChange = (event) => {
    const value = event.target.value;
    setNestedQuestionData({ ...nestedQuestionData, answer: value });
  };

  useEffect(() => {
    setIsMainFieldEmpty(!currentQuestionData.answer);
  }, [currentQuestionData]);

  return (
    <>
      {/* <h2>{currentQuestion?.section}</h2> */}

      <JsonForms
        schema={questionSchema}
        uischema={uiSchema}
        data={currentQuestionData}
        renderers={[...materialRenderers, ...materialCells]}
        onChange={({ errors, data }) => setCurrentQuestionData(data)}
      />

      {currentQuestionData.answer === "Yes" && nestedQuestions.length > 0 && (
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

      <button onClick={previous} disabled={current === 0 && nestedIndex === 0}>
        Previous
      </button>
      <button
        onClick={next}
        disabled={
          (current === questions.length - 1 &&
            nestedIndex === nestedQuestions.length - 1) ||
          isMainFieldEmpty
        }
      >
        Next
      </button>
    </>
  );
};
