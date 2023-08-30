import React from "react";
// import Home from "./Home";
// import PDF from "./PDF" 
// import "./App.css";
import { Parent } from "./Parent";
import FormComponent from "./FormComponent";

function App() {
  return (
    <div className="App">
        {/* <Home /> */}
        {/* <PDF/> */}
        <FormComponent/>
        
        <Parent index = {4}/>
    </div>
  );
}

export default App;
