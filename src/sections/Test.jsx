import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';

const schema = {
  type: 'object',
  properties: {
    heightUnits: {
      type: 'string',
      enum: ['Centimeters', 'Feet/Inches'],
    },
    heightCentimeters: {
      type: 'number',
    },
    heightFeet: {
      type: 'number',
    },
    heightInches: {
      type: 'number',
    },
    weightUnits: {
      type: 'string',
      enum: ['Pounds', 'Kilos'],
    },
    weightPounds: {
      type: 'number',
    },
    weightKilos: {
      type: 'number',
    },
    weightChange: {
      type: 'boolean',
    },
    previousWeight: {
      type: 'number',
    },
    previousMeasurementDate: {
      type: 'string', // You may use a date format here
    },
    weightChangeReason: {
      type: 'string',
    },
    additionalComments: {
      type: 'string',
    },
  },
};

const uiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/heightUnits',
    },
    {
      type: 'Control',
      condition: {
        scope: '#/properties/heightUnits',
        schema: { const: 'Centimeters' },
      },
      scope: '#/properties/heightCentimeters',
    },
    {
      type: 'Control',
      condition: {
        scope: '#/properties/heightUnits',
        schema: { const: 'Feet/Inches' },
      },
      elements: [
        {
          type: 'Control',
          scope: '#/properties/heightFeet',
        },
        {
          type: 'Control',
          scope: '#/properties/heightInches',
        },
      ],
    },
    {
      type: 'Control',
      scope: '#/properties/weightUnits',
    },
    {
      type: 'Control',
      condition: {
        scope: '#/properties/weightUnits',
        schema: { const: 'Pounds' },
      },
      scope: '#/properties/weightPounds',
    },
    {
      type: 'Control',
      condition: {
        scope: '#/properties/weightUnits',
        schema: { const: 'Kilos' },
      },
      scope: '#/properties/weightKilos',
    },
    {
      type: 'Control',
      scope: '#/properties/weightChange',
    },
    {
      type: 'Control',
      condition: {
        scope: '#/properties/weightChange',
        schema: { const: true },
      },
      scope: '#/properties/previousWeight',
    },
    {
      type: 'Control',
      condition: {
        scope: '#/properties/weightChange',
        schema: { const: true },
      },
      scope: '#/properties/previousMeasurementDate',
    },
    {
      type: 'Control',
      condition: {
        scope: '#/properties/weightChange',
        schema: { const: true },
      },
      scope: '#/properties/weightChangeReason',
    },
    {
      type: 'Control',
      scope: '#/properties/additionalComments',
    },
  ],
};

function YourFormComponent() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const isCurrentStep = (step) => {
    return currentStep === step;
  };

  return (
    <div>
      <JsonForms
        data={{}}
        schema={schema}
        uischema={uiSchema}
        renderers={materialRenderers}
      />
      {isCurrentStep(1) && (
        <button onClick={handleNext}>Next</button>
      )}
      {isCurrentStep(2) && (
        <button onClick={handleNext}>Next</button>
      )}
      {isCurrentStep(3) && (
        <button onClick={handleNext}>Next</button>
      )}
      {isCurrentStep(4) && (
        <button onClick={handleNext}>Next</button>
      )}
    </div>
  );
}

export default YourFormComponent;
