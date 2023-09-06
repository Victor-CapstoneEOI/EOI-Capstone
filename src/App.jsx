import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormProvider } from "./Components/FormContext.jsx";
import Home from "./Pages/Home.jsx";
import Profile from "./Pages/Profile.jsx";
import FormLayout from './Pages/FormLayout.jsx';
import Review from "./Pages/Review.jsx";
import Confirmation from './Pages/Confirmation.jsx';
// Make sure to import SectionNameProvider if it's from another file
import Header from './Components/Header';
import Footer from "./Components/Footer";
import { Wellness } from "./sections/Wellness.jsx";
import { LifeStyleSection } from "./sections/LifeStyleSection.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <FormProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/formlayout" element={<FormLayout />} />
              <Route path='/review' element={<Review />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
        </FormProvider>
      </BrowserRouter>
      {/* <img src={Benefits} alt='Benefits' className="group-benefits" /> */}
      <Footer />
    </div>
  );
}

export default App;
