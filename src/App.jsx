import React from "react";
// import Home from "./Pages/Home.jsx";
// import Profile from './Pages/Profile.jsx'
// import FrenchProfile from "./Pages/FrenchProfile.jsx";
// import FormLayout from './Pages/FormLayout.jsx';
// import Review from "./Pages/Review.jsx";
// import Confirmation from './Pages/Confirmation.jsx';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Benefits from './img/removebg.png'
// import { FormComponent } from "./FormComponent";
// import { LifeStyleSection } from "./sections/LifeStyleSection";

import { MedicalSection } from "./sections/MedicalSection.jsx";
import Header from './Components/Header';
import Footer from "./Components/Footer";



function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
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
      <MedicalSection/>
      <Footer />
    </div>
  );
}

export default App;
