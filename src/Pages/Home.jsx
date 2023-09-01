import React, { useState } from "react";
import LogoPic from '../img/Victor_Logo.png'
import Benefits from '../img/removebg.png'
// import GroupBenefits from '../img/GroupBenefits.png'
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css'

const Home = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const navigate = useNavigate();

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        console.log(`Selected language: ${language}`);
        if (language == 'French'){
            navigate('/profil');
        } else{
            navigate('/profile'); 
        }
    };

    return (
        <div>
            <div className="home">
                <h1 className="welcome">Welcome to Evidence of Insurability form</h1>
                <div className="center-content">
                    <img src={LogoPic} alt="Victor_Logo" className="logo" />
                    <div className="button">
                        <button onClick={() => handleLanguageChange('English')}>English</button>
                        <button onClick={() => handleLanguageChange('French')}>French</button>
                    </div>

                    {/* <img src={Benefits} alt='Benefits' className="group-benefits" /> */}
                </div>
            </div>
        </div>
    );
}

export default Home;
