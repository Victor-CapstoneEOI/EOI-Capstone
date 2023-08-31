//import React from "react";
// import Home from "./Home";
// import Profile from './Profile'
// import FormLayout from './FormLayout'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import PDF from "./PDF
// import Footer from "./Footer";
// import Header from './components/Header';
// import "./App.css";
import { Parent } from "./Parent";
// import FormComponent from "./FormComponent";
// import  Stepper from './Stepper';
// import './Stepper.css'; // 
import { PersonalInformation } from "./sections/personalInformation";
import { Wellness } from "./sections/Wellness";
import { Test2 } from "./sections/Test2";

//const steps = ['Profile', 'Lifestyle', 'Wellness', 'Medical Information', 'Authorization and Consent'];


function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
      <Routes>

      <Header />

        <Route path = '/' exact={true} element={<Home />}/>
        <Route path='/profile' exact ={true} element={<Profile/>}/>
        <Route path = '/formlayout' exact={true} element={<FormLayout/>}/>
        <PDF/> 
      
        </Routes>
        </BrowserRouter> 
        <Stepper steps={steps} /> 

        <Stepper steps={steps} />
        <FormComponent/> 
        <Footer />
        <Parent index = {4}/> */}
        {/* <PersonalInformation/> */}
        <Parent index={0}/>

    </div>
  );
}

export default App;
