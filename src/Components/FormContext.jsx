import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';

const FormContext = React.createContext({
    activeSection: 0,
    setActiveSection: () => {},
    formData: {},
    signature: '', 
    updateFormData: () => {},
    updateSignature: () => {},
    saveToDatabase: () => {}
});

export const FormProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState(0);
    const [formData, setFormData] = useState({});
    const [signature, setSignature] = useState('');

    function transformData(formData) {
        const transformed = {
            sections: []
        };
    
        for (let questionText in formData) {
            const questionData = formData[questionText];
            const metadata = questionData.metadata;
    
            if (!metadata) {
                console.warn("No metadata for question:", questionText);
                continue;
            }
    
            let section = transformed.sections.find(s => s.section === metadata.section);
            if (!section) {
                section = {
                    section: metadata.section,
                    answers: []
                };
                transformed.sections.push(section);
            }
    
            const answer = {
                questionId: metadata.id,
                questionText: metadata.questionText,
                answer: questionData.answer.answer, // accessing the actual parent answer
                childAnswers: []
            };
    
            // Extract child questions and their respective answers
            for (let key in questionData.answer) {
                if (key.startsWith('question_')) {
                    const childQuestionKey = key;  // This will hold keys like 'question_0'
                    const childAnswer = questionData.answer[key];
    
                    answer.childAnswers.push({
                        questionKey: childQuestionKey,
                        answer: childAnswer
                    });
                }
            }
            section.answers.push(answer);
        }
        return transformed;
    }
    
    const updateFormData = useCallback((sectionData) => {
        setFormData(prevData => ({
            ...prevData,
            ...sectionData
        }));
    }, []);

    const updateSignature = useCallback((newSignature) => {
        setSignature(newSignature);
    }, []);

    const saveToDatabase = useCallback(async () => {
        const organizedData = transformData(formData);
        console.log("Transformed data before sending:", organizedData);

        try {
            const response = await axios.post('/api/save-full-form', {
                sections: organizedData.sections,
                signature: signature
            });

            if (response.status === 201) {
                console.log("Form saved successfully");
                setFormData({});
                setSignature('');
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
