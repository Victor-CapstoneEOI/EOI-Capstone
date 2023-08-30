import React from "react";
import Home from "./Home";
// import PDF from "./PDF" 
import "./App.css";
import { Parent } from "./Parent";

function App() {
  return (
    <div className="App">
        {/* <Home /> */}
        {/* <PDF/> */}
        <Parent index = {4}/>
    </div>
  );
}

export default App;
