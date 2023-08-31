// App.js
import React from "react";
import Home from "./Home";
import Profile from './Profile'
import FrenchProfile from "./FrenchProfile";
import FormLayout from './FormLayout'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profil" element={<FrenchProfile />} />
          <Route path="/formlayout" element={<FormLayout />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
