import React from "react";
import Home from "./Home";
import Profile from './Profile'
import FrenchProfile from "./FrenchProfile";
import FormLayout from './FormLayout'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PDF from "./PDF" 
// import "./App.css";
// import { Parent } from "./Parent";
// import FormComponent from "./FormComponent";
// import  Stepper from './Stepper';
// import './Stepper.css'; // 


// const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path = '/' exact={true} element={<Home />}/>
        <Route path='/profile' exact ={true} element={<Profile/>}/>
        <Route path= '/profil' exact= {true} element={<FrenchProfile/>}/>
        <Route path = '/formlayout' exact={true} element={<FormLayout/>}/>
        {/* <PDF/> */}
        </Routes>
        </BrowserRouter>
        {/* <Stepper steps={steps} /> */}
        {/* <FormComponent/> */}
       
   
        
        {/* <Parent index = {4}/> */}
    </div>
  );
}

export default App;
