export const getSchemaForQuestion = (question) => {
  const formControl = question.formControlType;


  let schema = {
    type: "object",
    properties: {},
    required: question.requiredFields || [],
  };

const questionText = question?.questionText || "";

const isDateQuestion = questionText.includes("Date of birth");
const isOptional = questionText.toLowerCase().includes("(optional)");

  if (isDateQuestion) {
    schema.properties.answer = {
      type: "string",
      format: "date"
    };
    if (!isOptional) {
      schema.required = ["answer"];
    }
  } else {
    switch (formControl) {
      case "Buttons":
      case "Checkbox":
      case "Checkboxes":
      case "Optionbox":
        schema.properties.answer = {
          type: "string",
          enum: question.optionValues.split(";").map((option) => option.trim()),
        };
        break;

      case "Drop-down List":
        schema.properties.answer = {
          type: "string", 
          enum: ["", ...question.optionValues.split(";").map((option) => option.trim())],
          default: ""  // Set the default value to the dummy option
        };
        break;
      
      case "Multi-line Textbox":
        schema.properties.answer = {
          type: "string",
          description: "Enter multi-line text here",  // Optional description for clarity
          maxLength: 500  // Optional constraint for max characters
        };
        if (!isOptional) {
          schema.required = ["answer"];
        }
        break;

      case "Textbox":
      case "Textbox ":
      case "Textboxes":
      case "Autofill":
      case "Autofill ":
        schema.properties.answer = {
          type: "string",
        };
        if (!isOptional) {
          schema.required = ["answer"];
        }
        break;
      
      case "Address":
          schema.properties.address = {
            type: "object",
            properties: {
              street: { type: "string", title: "Street" },
              street2: { type: "string", title: "Street" },
              city: { type: "string", title: "City" },
              state: { type: "string", title: "State" },
              zip: { type: "string", title: "ZIP" }
            }
          };
          if (!isOptional) {
            schema.required = ["address"];
          }
          break;

      default:
        break;
    }
  }

  return schema;
};


export const getUiSchemaForQuestion = (question, isChild = false) => {
  const formControl = question.formControlType;
  let uiSchema = {};
  
  // Determine the appropriate label for the UI Schema
  const displayLabel = isChild ? question.labelText : question.questionText;

  const questionText = (question?.questionText || "").toLowerCase();
  const isDateQuestion = questionText.toLowerCase().includes("Date of birth");
  
  if (isDateQuestion) {
    uiSchema = {
      type: "Group",
      label: displayLabel,  // Modified here
      elements: [
        { 
          type: "Control",
          scope: "#/properties/answer",
          options: { widget: "date" }
        }
      ]
    };
  } else {
    switch (formControl) {
      case "Buttons":
      case "Checkbox":
      case "Checkboxes":
      case "Optionbox":
        uiSchema = {
          type: "Group",
          label: displayLabel,  // Modified here
          elements: [
            {
              type: "Control",
              scope: "#/properties/answer",
              options: { format: "radio" }
            }
          ]
        };
        break;

      case "Drop-down List":
        uiSchema = {
          type: "Group",
          label: displayLabel, 
          elements: [
            { 
              type: "Control", 
              scope: "#/properties/answer",
              options: {
                // This will be displayed as a hint/placeholder
                description: "Select an option from the drop-down list...",
                enumTitles: ["", ...question.optionValues.split(";").map((option) => option.trim())]
              }
            }
          ]
        };
        break;
      
        
      case "Multi-line Textbox":
        uiSchema = {
          type: "Group",
          label: displayLabel,
          elements: [
            { 
              type: "Control", 
              scope: "#/properties/answer",
              options: {
                "render": "textarea", // Suggests rendering as a textarea
                "rows": 5 // Optionally specify the number of rows or height
              }
            }
          ]
        };
        break;

      case "Textbox":
      case "Textbox ":
      case "Textboxes":
      case "Autofill":
      case "Autofill ":
        uiSchema = {
          type: "Group",
          label: displayLabel,  // Modified here
          elements: [
            { type: "Control", scope: "#/properties/answer" }
          ]
        };
        break;
      
      case "Address":
        uiSchema = {
          type: "Group",
          label: displayLabel,  // Modified here
          elements: [
            { type: "Control", scope: "#/properties/address/properties/street" },
            { type: "Control", scope: "#/properties/address/properties/street2" },
            { type: "Control", scope: "#/properties/address/properties/city" },
            { type: "Control", scope: "#/properties/address/properties/state" },
            { type: "Control", scope: "#/properties/address/properties/zip" }
          ]
        };
        break;

      default:
        break;
    }
  }
  
  return uiSchema;
};

export const getCombinedSchemaForChildQuestions = (childQuestions) => {
  const combinedSchema = {
      type: "object",
      properties: {},
      required: [],
  };
  
  childQuestions.forEach((question, index) => {
      const schema = getSchemaForQuestion(question);
      combinedSchema.properties[`question_${index}`] = schema.properties.answer;
      
      if (schema.required && schema.required.includes('answer')) {
          combinedSchema.required.push(`question_${index}`);
      }
  });
 
  return combinedSchema;
};

export const getCombinedUiSchemaForChildQuestions = (childQuestions) => {
  const uiElements = [];

  childQuestions.forEach((question, index) => {
    const uiSchema = getUiSchemaForQuestion(question, true);
    
    if (question.formControlType === "Drop-down List" && uiSchema && uiSchema.elements && uiSchema.elements[0] && uiSchema.elements[0].options) {
        // Set or override the placeholder for drop-down lists
        uiSchema.elements[0].options.enumTitles = [
            "Please select an option", 
            ...question.optionValues.split(";").map((option) => option.trim())
        ];
    }
    if (uiSchema && uiSchema.elements && uiSchema.elements[0]) {
        uiSchema.elements[0].scope = `#/properties/question_${index}`;
        uiElements.push(uiSchema);
    } 
  });


  return {
      type: "VerticalLayout",
      elements: uiElements,
  };
};


