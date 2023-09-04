import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';

const FormContext = React.createContext({
    activeSection: 0,
    setActiveSection: () => {},
    formData: {},
    signature: '', // Added a new state to hold the signature
    updateFormData: () => {},
    updateSignature: () => {}, // Added a new function to update the signature
    saveToDatabase: () => {}
});

export const FormProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState(0);
    const [formData, setFormData] = useState({});
    const [signature, setSignature] = useState(''); // Added a new state for the signature

    const updateFormData = useCallback((sectionData) => {
        setFormData(prevData => ({
            ...prevData,
            ...sectionData
        }));
        console.log("Updating form data", sectionData);
    }, []);

    const updateSignature = useCallback((newSignature) => { // Function to update the signature
        setSignature(newSignature);
    }, []);

    const saveToDatabase = useCallback(async () => {
        try {
            // Modified the structure of the sent data to include the signature
            const response = await axios.post('/api/save-full-form', { sections: formData, signature: signature });
            
            if (response.status === 201) {
                console.log("Form saved successfully");
                setFormData({});
                setSignature(''); // Resetting the signature after successful submission
            } else {
                console.error("Error saving form:", response.data.error);
            }
        } catch (error) {
            console.error("Error saving form:", error);
        }
    }, [formData, signature]);

    const contextValue = useMemo(() => ({
        activeSection, 
        setActiveSection,
        formData,
        signature,
        updateFormData,
        updateSignature,
        saveToDatabase
    }), [activeSection, formData, signature, updateFormData, updateSignature, saveToDatabase]);

    return (
        <FormContext.Provider value={contextValue}>
          {children}
        </FormContext.Provider>
    );
}

export default FormContext;
