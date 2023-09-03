// App.js
import React from "react";
import YourFormComponent from "./sections/Well";

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
        </Routes>
      </BrowserRouter>
      <Footer /> */}
      {/* <LifeStyleSection index={0} /> */}
      {/* <Wellness/> */}
      <YourFormComponent />
      
    </div>
  );
}

export default App;
