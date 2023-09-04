import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';

const FormContext = React.createContext({
    formData: {},
    updateFormData: () => {},
    saveToDatabase: () => {}
});

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({});

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
                // Assuming you might want to handle submission status outside. 
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
        formData,
        updateFormData,
        saveToDatabase
    }), [formData, updateFormData, saveToDatabase]);

    return (
        <FormContext.Provider value={contextValue}>
          {children}
        </FormContext.Provider>
    );
}

export default FormContext;
