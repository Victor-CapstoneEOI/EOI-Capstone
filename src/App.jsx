import React from "react";
// import Home from "./Home";
// import PDF from "./PDF
import Footer from "./Footer";
// import "./App.css";
import FormComponent from "./FormComponent";
import  Stepper from './Stepper';
import './Stepper.css'; // 


const steps = ['Profile', 'Lifestyle', 'Wellness', 'Medical Information', 'Authorization and Consent'];


function App() {
  return (
    <div className="App">
        {/* <Home /> */}
        {/* <PDF/> */}
        <Stepper steps={steps} />
        <FormComponent/>
        <Footer />
       
   
        
    </div>
  );
}

export default App;
