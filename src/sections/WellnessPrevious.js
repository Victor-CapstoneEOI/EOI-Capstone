import {useState} from "react";

export const WellnessPrevious = () => {
  const[schema, setSchema] = useState(null)
  const[uiSchema, setUiSchema] = useState(null)

  const parentSchemas = (questions, currentParent) => {
    // Setting up all dynamic values for schema and uiSchemas
    let questionSchema = {};
    let uiSchema = {};

    let question = questions[currentParent]?.questionText;
    let formType = questions[currentParent]?.formControlType;
    let optionValues;

    if (formType == "Drop-down List" || formType == "Buttons") {
      optionValues = questions[currentParent]?.optionValues.split(";");
      console.log(optionValues);
    }

    switch (formType) {
      case "Drop-down List":
        questionSchema = {
          type: "object",
          properties: {
            answer: {
              type: "string",
              enum: optionValues,
            },
          },
        };

        uiSchema = {
          type: "Group",
          label: question,
          elements: [
            {
              type: "Control",
              scope: "#/properties/answer",
            },
          ],
        };

        setSchema(questionSchema)
        setUiSchema(uiSchema)

        break;

      case "Textbox":
        questionSchema = {
          type: "object",
          properties: {
            answer: {
              type: "string",
            },
          },
        };

        uiSchema = {
          type: "Group",
          label: question,
          elements: [
            {
              type: "Control",
              scope: "#/properties/answer",
            },
          ],
        };
        setSchema(questionSchema)
        setUiSchema(uiSchema)

        break;

      case "Buttons":
        questionSchema = {
          type: "object",
          properties: {
            answer: {
              type: "string",
              enum: optionValues,
            },
          },
        };

        uiSchema = {
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
        setSchema(questionSchema)
        setUiSchema(uiSchema)
        break;

      default:
        break;
    }
  };
};
