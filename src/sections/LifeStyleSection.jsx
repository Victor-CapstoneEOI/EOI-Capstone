import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import {generateQuestionSchemaAndUISchema} from '../schemas/schemaUtils'
import LifeStyleChildQuestion from "./LifeStyleChildQuestions";

const FallbackRenderer = ({ errorMsg }) => <div>{errorMsg}</div>;

const doesAnswerMatchSubFormTrigger = (answer, subFormTrigger) => {
  return subFormTrigger?.includes(`'${answer}'`);
};

export const LifeStyleSection = ({ index = 0 }) => {
  const [parentData, setParentData] = useState({});
  const [childData, setChildData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(index);
  const [showNestedQuestions, setShowNestedQuestions] = useState(false);
  const [currentNestedIndex, setCurrentNestedIndex] = useState(0);

  useEffect(() => {
    fetch("/api/parent-questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const filteredQuestions = data.filter((q) => q.section === "Lifestyle questions (1 of 3)");
        setQuestions(filteredQuestions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const currentQuestion = questions[current];
  const nestedQuestions = currentQuestion?.childQuestions || [];
  const { questionSchema, uiSchema } = generateQuestionSchemaAndUISchema(currentQuestion);

  const parseDisplayLogic = (logic) => {
    if (!logic) return null;

    const questionMatch = logic.match(/\[(.*?)\]/);
    const answerMatch = logic.match(/\(('.*?')\)/);

    if (questionMatch && answerMatch) {
        const question = questionMatch[1];
        const answer = answerMatch[1].replace(/'/g, "");

        return { question, answer };
    }
    return null;
  };

  const shouldDisplayNestedQuestion = (nestedQuestion, childData) => {
    const logic = nestedQuestion["displayQuestionLogic"];
    if (!logic) return false;
    if (logic === "Page Load") return true;

    const parsedLogic = parseDisplayLogic(logic);

    return parsedLogic && childData[parsedLogic.question] === parsedLogic.answer;
  };


const next = () => {
  console.log("Next button clicked. Parent answer:", parentData.answer, "Subform trigger:", currentQuestion?.subFormTrigger);

  // If showing nested questions, store the current nested question answer into childData.
  if (showNestedQuestions && currentNestedIndex < nestedQuestions.length) {
    const questionText = nestedQuestions[currentNestedIndex].labelText;
    setChildData(prevData => ({ ...prevData, [questionText]: childData[questionText] }));
  }

  if (showNestedQuestions) {
    let foundMatch = false;

    for (let i = currentNestedIndex + 1; i < nestedQuestions.length; i++) {
      const nextNestedQuestion = nestedQuestions[i];

      console.log('Checking nested question:', nextNestedQuestion);
      console.log('Child data:', childData);

      if (shouldDisplayNestedQuestion(nextNestedQuestion, childData)) {
        console.log('Match found for:', nextNestedQuestion);
        setCurrentNestedIndex(i);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      setCurrent(prevCurrent => prevCurrent + 1);
      setShowNestedQuestions(false);
      setCurrentNestedIndex(0);  // Reset nested index for future questions
    }
  } else if (doesAnswerMatchSubFormTrigger(parentData.answer, currentQuestion?.subFormTrigger) && nestedQuestions.length) {
    setShowNestedQuestions(true);

    // Initially check for any question with the "Page Load" logic to set as the first question
    const pageLoadIndex = nestedQuestions.findIndex(q => q["Display Question Logic"] === "Page Load");
    setCurrentNestedIndex(pageLoadIndex >= 0 ? pageLoadIndex : 0);
  } else {
    setCurrent(prevCurrent => prevCurrent + 1);
    setShowNestedQuestions(false);  // Reset for the next question
    setChildData({});  // Clear childData for the next question
  }
};


const previous = () => {
  console.log("Previous button clicked");

  // If showing nested questions and not at the first nested question
  if (showNestedQuestions && currentNestedIndex > 0) {
    setCurrentNestedIndex(prevNestedIndex => prevNestedIndex - 1);
  } else {
    setCurrent(prevCurrent => prevCurrent - 1);
    // If the previous parent question has nested questions
    if (current - 1 >= 0 && questions[current - 1].childQuestions?.length) {
      setShowNestedQuestions(true);
      setCurrentNestedIndex(questions[current - 1].childQuestions.length - 1);  // Go to the last nested question of the previous parent question
    } else {
      setShowNestedQuestions(false); // Reset for previous question
    }
  }
  setChildData({});
};

const handleKeyPress = event => {
  if (event.key === "Enter") {
    next();
  }
};

const disableNext = (current >= questions.length - 1 && (!nestedQuestions.length || !doesAnswerMatchSubFormTrigger(parentData.answer, currentQuestion?.subFormTrigger))) || questions.length === 0;
const disablePrevious = current <= 0 && currentNestedIndex <= 0;

return (
  <>
    <div onKeyDown={handleKeyPress}>
      {/* Render Parent Question */}
      {!showNestedQuestions && (
        <JsonForms
          schema={questionSchema}
          uischema={uiSchema}
          data={parentData}
          renderers={[...materialRenderers, ...materialCells, { tester: () => true, renderer: FallbackRenderer }]}
          onChange={({ errors, data }) => setParentData(data)}
        />
      )}

      {/* Render Nested (Child) Questions if conditions are met */}
      {showNestedQuestions && nestedQuestions.length > 0 && (
        <LifeStyleChildQuestion 
          childQuestion={nestedQuestions[currentNestedIndex]} 
          showChildQuestions={true}
          data={childData}
          onChange={({ data }) => {
            setChildData(data);
          }}
        />
      )}

      <button onClick={previous} disabled={disablePrevious}>
        Previous
      </button>
      <button onClick={next} disabled={disableNext}>
        Next
      </button>
    </div>
  </>
);
};