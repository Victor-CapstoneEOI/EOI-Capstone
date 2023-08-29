import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from "react-jsonschema-form";

function FormTest() {
  const [parentQuestions, setParentQuestions] = useState([]);

  useEffect(() => {
    axios.get('/api/parent-questions')
      .then(response => {
        setParentQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching parent questions:', error);
      });
  }, []);

  const parentSchema = {
    title: "Parent Questions",
    type: "object",
    properties: {
      section: { type: "string" },
      subSection1: { type: "string" },
      subSection2: { type: "string" },
      questionText: { type: "string" },
      formControlType: { type: "string" },
      childQuestions: {
        type: "array",
        items: { type: "string" } // Store child question IDs
      }
    }
  };

  const childSchema = {
    title: "Child Questions",
    type: "object",
    properties: {
      labelText: { type: "string" },
      formControlType: { type: "string" },
      optionValues: { type: "string" }
    }
  };

  return (
    <div className="App">
      {parentQuestions.map(parent => (
        <div key={parent._id}>
          <h3>{parent.questionText}</h3>
          <Form schema={parentSchema} formData={parent} />
          {parent.childQuestions.map(childId => (
            <div key={childId}>
              <h4>Child Question</h4>
              <Form schema={childSchema} formData={{ labelText: "Sample Child Label" }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default FormTest;

