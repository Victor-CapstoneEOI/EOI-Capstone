import React, { useState } from "react";
import LogoPic from './img/Victor_Logo.png'
import CornerLogo from './img/cornervictor.png'
import GroupBenefits from './img/GroupBenefits.png'
import './Home.css'

const Home = () => {
   
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    
    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);

        console.log(`Selected language: ${language}`);
    };

    return (
        <div>
            <div className="home">
                    <h1 className="welcome">Welcome to Evidence of Insurability form</h1>
                <div className="center-content">
                    <img src={LogoPic} alt="Victor_Logo" className="logo" />
                    <img src={CornerLogo} alt="cornervictor" className="cornerlogo" />
                    

                    <div className="button">
                        <button onClick={() => handleLanguageChange('English')}>English</button>
                        <button onClick={() => handleLanguageChange('French')}>French</button>
                    </div>
                    
                    <img src={GroupBenefits} alt='GroupBenefits' className="group-benefits"/>
                </div>
            </div>
        </div>
    );
}

export default Home
