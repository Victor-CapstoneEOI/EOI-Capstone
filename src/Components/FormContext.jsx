import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';

const FormContext = React.createContext({
    activeSection: 0,
    setActiveSection: () => {},
    formData: {},
    updateFormData: () => {},
    saveToDatabase: () => {}
});

export const FormProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState(0); // Controls which section is currently active
    const [formData, setFormData] = useState({}); // To store all the form data across sections

    const updateFormData = useCallback((sectionData) => {
        setFormData(prevData => ({
            ...prevData,
            ...sectionData
        }));
        console.log("Updating form data", sectionData);
    }, []);

    const saveToDatabase = useCallback(async () => {
        try {
            const response = await axios.post('/api/save-full-form', { sections: formData });
            
            if (response.status === 201) {
                console.log("Form saved successfully");
                setFormData({});
                // Assuming we might want to handle submission status outside.

                // If not, this state (submissionStatus) and its usage can be removed.
                // setSubmissionStatus('success');  
            } else {
                console.error("Error saving form:", response.data.error);
                // setSubmissionStatus('error');
            }
        } catch (error) {
            console.error("Error saving form:", error);
            // setSubmissionStatus('error');
        }
    }, [formData]);

    const contextValue = useMemo(() => ({
        activeSection, 
        setActiveSection,
        formData,
        updateFormData,
        saveToDatabase
    }), [activeSection, formData, updateFormData, saveToDatabase]);

    return (
        <FormContext.Provider value={contextValue}>
          {children}
        </FormContext.Provider>
    );
}

export default FormContext;