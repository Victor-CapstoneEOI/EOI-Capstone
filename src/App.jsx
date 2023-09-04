import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormProvider } from "./Components/FormContext.jsx";
import Home from "./Pages/Home.jsx";
import Profile from './Pages/Profile.jsx';
import FrenchProfile from "./Pages/FrenchProfile.jsx";
import FormLayout from './Pages/FormLayout.jsx';
import Review from "./Pages/Review.jsx";
import Confirmation from './Pages/Confirmation.jsx';
import Header from './Components/Header';
import Footer from "./Components/Footer";
import { SectionNameProvider } from './Components/SectionNameContext';

// Material-UI imports
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

// Create your theme here
const theme = createTheme({
  // you can override MUI default theme here.
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}> {/* Added ThemeProvider here */}
        <BrowserRouter>
          <Header />
          <FormProvider>
            <SectionNameProvider> {/* Added SectionNameProvider here */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profil" element={<FrenchProfile />} />
                <Route path="/formlayout" element={<FormLayout />} />
                <Route path='/review' element={<Review />}/>
                <Route path="/confirmation" element={<Confirmation />}/>
              </Routes>
            </SectionNameProvider> {/* Added SectionNameProvider here */}
          </FormProvider>
        </BrowserRouter>
      </ThemeProvider> {/* Close ThemeProvider */}
      <Footer />
    </div>  // Close the App div
  );
}

export default App;
