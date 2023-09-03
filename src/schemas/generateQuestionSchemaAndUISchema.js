export function generateQuestionSchemaAndUISchema(currentQuestion) {
  const question = currentQuestion?.questionText;
  const formControl = currentQuestion?.formControlType;
  let optionsArray;
  let questionSchema = {};
  let uiSchema = {};

  if (
    formControl === 'Buttons' ||
    formControl === 'Checkboxes' ||
    formControl === 'Checkbox' ||
    formControl === 'Drop-down list' ||
    formControl === 'Drop-down List'
  ) {
    optionsArray = currentQuestion?.optionValues.split(/;\r?\n|,\r?\n/);
  }

  switch (formControl) {
    case 'Buttons':
      case 'Checkboxes':
      questionSchema = {
        type: 'object',
        properties: {
          answer: {
            type: 'string',
            enum: optionsArray,
          },
        },
        required: ['answer'], // Make answer field required
      };

      uiSchema = {
        type: 'Group',
        label: question,
        elements: [
          {
            type: 'Control',
            scope: '#/properties/answer',
            options: {
              format: 'radio',
            },
          },
        ],
      };
      break;

      // case 'Checkboxes':
      //   case 'Checkbox':
      //     questionSchema = {
      //       type: 'object',
      //       properties: {
      //         answer: {
      //           type: 'array',
      //           items: {
      //             type: 'string',
      //             enum: optionsArray,
      //           },
      //         },
      //       },
      //       required: ['answer'], // Make answer field required
      //     };
        
      //     uiSchema = {
      //       type: 'Group',
      //       label: question,
      //       elements: [
      //         {
      //           type: 'Control',
      //           scope: '#/properties/answer',
      //           options: {
      //             format: 'checkboxes', // Use 'checkboxes' to render checkboxes
      //           },
      //         },
      //       ],
      //     };
      //     break;
          
    case 'Textbox':
    case 'Textboxes':
      questionSchema = {
        type: 'object',
        properties: {
          answer: {
            type: 'string',
          },
        },
        required: ['answer'], 
      };

      uiSchema = {
        type: 'Control',
        scope: '#/properties/answer',
        options: {
          format: 'text',
        },
      };
      break;

    case 'Multi-line Textbox':
      questionSchema = {
        type: 'object',
        properties: {
          answer: {
            type: 'string',
          },
        },
        required: ['answer'], 
      };

      uiSchema = {
        type: 'Control',
        scope: '#/properties/answer',
        options: {
          format: 'textarea',
          rows: 5
        },
      };
      break;

    case 'Drop-down list':
    case 'Drop-down List':
      questionSchema = {
        type: 'object',
        properties: {
          answer: {
            type: 'string',
            enum: optionsArray,
          },
        },
        required: ['answer'], 
      };

      uiSchema = {
        type: 'Control',
        scope: '#/properties/answer',
        options: {
          format: 'select',
        },
      };
      break;

    // Handle other cases...

    default:
      break;
  }

  return { questionSchema, uiSchema };
}
