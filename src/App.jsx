import React from "react";
import Home from "./Home";
import Profile from './Profile'
import FormLayout from './FormLayout'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PDF from "./PDF
import Footer from "./Footer";
// import "./App.css";
// import { Parent } from "./Parent";
// import FormComponent from "./FormComponent";
// import  Stepper from './Stepper';
// import './Stepper.css'; // 


// const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

import  Stepper from './Stepper';
import './Stepper.css'; // 


const steps = ['Profile', 'Lifestyle', 'Wellness', 'Medical Information', 'Authorization and Consent'];


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path = '/' exact={true} element={<Home />}/>
        <Route path='/profile' exact ={true} element={<Profile/>}/>
        <Route path = '/formlayout' exact={true} element={<FormLayout/>}/>
        {/* <PDF/> */}
        <Stepper steps={steps} />
        </Routes>
        </BrowserRouter>
        {/* <Stepper steps={steps} /> */}
        {/* <FormComponent/> */}
       
   
        <Footer />
       
   
        
        {/* <Parent index = {4}/> */}
    </div>
  );
}

export default App;
