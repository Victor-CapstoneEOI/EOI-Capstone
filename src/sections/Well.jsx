import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { RuleEffect, Actions, init } from '@jsonforms/core';



const schema = {
  type: 'object',
  properties: {
    country: {
      type: 'string',
      enum: ['USA', 'Canada', 'Other'],
    },
    city: {
      type: 'string',
    },
    postalCode: {
      type: 'string',
    },
  },
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/country',
    },
    {
      type: 'Control',
      scope: '#/properties/city',
    },
    {
      type: 'Control',
      scope: '#/properties/postalCode',
    },
  ],
};

function YourFormComponent() {
  const [data, setData] = useState({});
  const [uischemaWithRules, setUischemaWithRules] = useState(uischema);

  const handleOnChange = ({ data }) => {
    setData(data);
  };

  const updateUISchemaBasedOnCountry = (country) => {
    let newUischema = { ...uischema };
    if (country === 'Other') {
      // Hide city and postalCode when 'Other' is selected
      newUischema = {
        ...newUischema,
        elements: newUischema.elements.map((element) => {
          if (element.scope === '#/properties/city' || element.scope === '#/properties/postalCode') {
            return { ...element, rule: { effect: RuleEffect.HIDE } };
          }
          return element;
        }),
      };
    } else {
      // Show city and postalCode for other countries
      newUischema = {
        ...newUischema,
        elements: newUischema.elements.map((element) => {
          if (element.scope === '#/properties/city' || element.scope === '#/properties/postalCode') {
            return { ...element, rule: { effect: RuleEffect.SHOW } };
          }
          return element;
        }),
      };
    }
    setUischemaWithRules(newUischema);
  };

  return (
    <div>
      <JsonForms
        data={data}
        schema={schema}
        uischema={uischemaWithRules}
        renderers={materialRenderers}
        onChange={handleOnChange}
      />
      <div>
        <strong>Current Data:</strong>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div>
        <strong>Choose a Country:</strong>
        <select
          value={data.country || ''}
          onChange={(e) => {
            const selectedCountry = e.target.value;
            updateUISchemaBasedOnCountry(selectedCountry);
            setData({ ...data, country: selectedCountry });
          }}
        >
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
}

export default YourFormComponent;
