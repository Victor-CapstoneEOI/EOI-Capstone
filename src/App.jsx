import React from "react";
import Home from "./Pages/Home.jsx";
import Profile from './Pages/Profile.jsx'
import FrenchProfile from "./Pages/FrenchProfile.jsx";
import FormLayout from './Pages/FormLayout.jsx';
import Review from "./Pages/Review.jsx";
import Confirmation from './Pages/Confirmation.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Benefits from './img/removebg.png'
// import { FormComponent } from "./FormComponent";
// import { LifeStyleSection } from "./sections/LifeStyleSection";
import Header from './Components/Header';
import Footer from "./Components/Footer";
import {createGlobalStyle} from 'styled-components';


const GlobalStyle = createGlobalStyle`

body {
  background-color: white;
}


@media (max-width: 375px) and (max-height: 667px) {
  body {
    background-color: lightblue;
  }
}


@media (max-width: 414px) and (max-height: 896px) {
  body {
    background-color: lightgreen;
  }
}

@media (max-width: 390px) and (max-height: 844px) {
  body {
    background-color: lightyellow;
  }
}


@media (max-width: 360px) and (max-height: 740px) {
  body {
    background-color: lightpink;
  }
}


@media (max-width: 820px) and (max-height: 1180px) {
  body {
    background-color: lightgray;
  }
}
`;



function App() {
  return (
    <div className="App">
      <GlobalStyle/>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profil" element={<FrenchProfile />} />
          <Route path="/formlayout" element={<FormLayout />} />
          <Route path='/review'  element = {<Review/>}/>
          <Route path = "/confirmation" element={<Confirmation/>}/>
        </Routes>
      </BrowserRouter>
      {/* <img src={Benefits} alt='Benefits' className="group-benefits" /> */}
      <Footer />
    </div>
  );
}

export default App;
