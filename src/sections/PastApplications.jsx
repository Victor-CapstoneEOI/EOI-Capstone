import { useEffect, useState, useContext } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import FormContext from "../Components/FormContext";

export const PastApplications = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState({});
  const [currentParent, setCurrentParent] = useState(0);
  const [showchildQuestion, setShowChildQuestion] = useState(false);


  const { activeSection, setActiveSection } = useContext(FormContext);

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

  let subSection = questions[currentParent]?.subSection1;
  let question = questions[currentParent]?.questionText;
  let optionValues = questions[currentParent]?.optionValues.split(";");

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
    if (currentParent === 0 && userAnswer.answer?.trim() === "Yes") {
      setShowChildQuestion(true);
    }

    if (userAnswer.answer?.trim() === "No") {
      setActiveSection(activeSection + 1);
    }

    if (showchildQuestion) setActiveSection(activeSection + 1);
  };

  const handlePrevious = () => {
    if (showchildQuestion){
      setShowChildQuestion(false)
    }else setActiveSection(activeSection -1)

  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
                Details: {
                  type: "string",
                },
              },
              required: ["answer"],
            }}
            uischema={{
              type: "Control",
              label: questions[currentParent].childQuestions[0]?.labelText,
              scope: "#/properties/Details",
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
      <button onClick={handlePrevious} className="previous">Previous</button>
      <button onClick={handleNext} className="next">Next</button>

    </div>
  );
};
