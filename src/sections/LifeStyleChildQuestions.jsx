import React from 'react';
import PropTypes from 'prop-types';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';

function LifeStyleChildQuestion({ childQuestion, showChildQuestions }) {
  const { labelText, formControlType, optionValues, _id } = childQuestion;

  const optionsArray =
    formControlType === 'Checkboxes' || formControlType === 'Buttons'
      ? optionValues.split(';')
      : [];

  const childQuestionSchema = {
    type: 'object',
    properties: {
      answer: {
        type: 'string',
        enum: optionsArray,
      },
    },
  };

  const childUiSchema = {
    type: 'Group',
    label: labelText,
    elements: [
      {
        type: 'Control',
        scope: `#/properties/${_id}/properties/answer`,
        options: {
          format: formControlType === 'Buttons' || formControlType === 'Checkboxes' ? 'radio' : undefined,
        },
      },
    ],
  };

  return (
    <div>
      {/* Render the child question only if showChildQuestions is true */}
      {showChildQuestions && (
        <>
          <h4>{labelText}</h4>
          <JsonForms
            schema={childQuestionSchema}
            uischema={childUiSchema}
            data={{ [_id]: { answer: '' } }}
            renderers={materialRenderers}
            onChange={({ data }) => console.log(data)}
          />
        </>
      )}
    </div>
  );
}

LifeStyleChildQuestion.propTypes = {
  childQuestion: PropTypes.shape({
    labelText: PropTypes.string.isRequired,
    formControlType: PropTypes.string.isRequired,
    optionValues: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  showChildQuestions: PropTypes.bool.isRequired,  // PropType for showChildQuestions
};

export default LifeStyleChildQuestion;
