import React from "react";
// import Home from "./Home";
// import PDF from "./PDF" 
// import "./App.css";
import { Parent } from "./Parent";
import FormComponent from "./FormComponent";
import  Stepper from './Stepper';
import './Stepper.css'; // 


const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];


function App() {
  return (
    <div className="App">
        {/* <Home /> */}
        {/* <PDF/> */}
        <Stepper steps={steps} />
        <FormComponent/>
       
   
        
        <Parent index = {4}/>
    </div>
  );
}

export default App;
