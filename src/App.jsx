import React from "react";
import Home from "./Home";
import Profile from './Profile'
import FormLayout from './FormLayout'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PDF from "./PDF" 
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path = '/' exact={true} element={<Home />}/>
        <Route path='/profile' exact ={true} element={<Profile/>}/>
        <Route path = '/formlayout' exact={true} element={<FormLayout/>}/>
        {/* <PDF/> */}
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
