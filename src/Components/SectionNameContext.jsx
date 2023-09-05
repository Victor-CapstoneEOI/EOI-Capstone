import React, { createContext, useState, useContext } from "react";

export const SectionNameContext = createContext();

export const useSectionName = () => {
  const context = useContext(SectionNameContext);
  if (!context) {
    throw new Error('useSectionName must be used within a SectionNameProvider');
  }
  return context;
};

export const SectionNameProvider = ({ children }) => {
  const [sectionName, setSectionName] = useState("");
  return (
    <SectionNameContext.Provider value={{ sectionName, setSectionName }}>
      {children}
    </SectionNameContext.Provider>
  );
};

export default SectionNameContext;