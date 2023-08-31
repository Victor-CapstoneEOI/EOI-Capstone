export function generateQuestionSchemaAndUISchema(currentQuestion) {
    const question = currentQuestion?.questionText;
    const formControl = currentQuestion?.formControlType;
    let optionsArray;
    let questionSchema = {};
    let uiSchema = {};
  
    if (formControl === 'Buttons' || formControl === 'Checkboxes' || formControl === 'Drop-down list') {
      optionsArray = currentQuestion?.optionValues.split(';');
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
  }
  