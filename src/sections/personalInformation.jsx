import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function FormTest() {
  const [parentQuestions, setParentQuestions] = useState([]);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);
  const [currentParentIndex, setCurrentParentIndex] = useState(0);

  useEffect(() => {
    axios
      .get('/api/parent-questions')
      .then(response => {
        setParentQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching parent questions:', error);
      });
  }, []);

  const handleNext = () => {
    if (currentChildIndex < parentQuestions[currentParentIndex].childQuestions.length - 1) {
      setCurrentChildIndex(currentChildIndex + 1);
    } else if (currentParentIndex < parentQuestions.length - 1) {
      setCurrentParentIndex(currentParentIndex + 1);
      setCurrentChildIndex(0);
    }
  };

  const renderChildQuestion = (childData) => {
    const formControlType = childData.formControlType || '';

    return (
      <Formik
        initialValues={childData}
        onSubmit={() => handleNext()}
      >
        <Form>
          <h4>Child Question</h4>
          <label>{childData.labelText}</label>
          {formControlType === 'checkbox' ? (
            <Field type="checkbox" name="optionValues" />
          ) : formControlType === 'dropdown' ? (
            <Field as="select" name="optionValues">
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </Field>
          ) : (
            <Field type="text" name="optionValues" />
          )}
          <button type="submit">Next</button>
        </Form>
      </Formik>
    );
  };

  return (
    <Router>
      <div className="App">
        {parentQuestions.map((parent, parentIndex) => (
          <div key={parent._id}>
            <h3>{parent.questionText}</h3>
            <ul>
              {parent.childQuestions.map((childId, childIndex) => (
                <li key={childId}>
                  <Link to={`/child/${parentIndex}/${childIndex}`}>Child Question {childIndex + 1}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Routes>
        <Route
          path="/child/:parentIndex/:childIndex"
          render={({ match }) => {
            const parentIndex = parseInt(match.params.parentIndex);
            const childIndex = parseInt(match.params.childIndex);
            const childData = parentQuestions[parentIndex].childQuestions[childIndex];
            
            return (
              <div>
                {parentIndex === currentParentIndex && renderChildQuestion(childData)}
              </div>
            );
          }}
        />
        </Routes>
      </div>
    </Router>
  );
}

export default FormTest;