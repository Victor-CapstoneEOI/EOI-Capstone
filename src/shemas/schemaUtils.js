export const generateSchemaAndUISchema = (formControlType, question, optionsArray) => {
    let questionSchema = {};
    let uiSchema = {};
  
    switch (formControlType) {
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
  
      // Handle other cases...
  
      default:
        break;
    }
  
    return { questionSchema, uiSchema };
  };