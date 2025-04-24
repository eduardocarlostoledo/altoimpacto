
// ✅ 6. HeroSection.jsx

import React from 'react';
import '../styles/HeroSection.css';
import logotransparente from "../img/logotransparente.png";
import logotransparenteshadow from "../img/logotransparente-shadow.png";


const HeroSection = () => {
  return (
    <section className="hero-section">
      <img 
      style={{ textShadow: "2px 2px 4px rgb(233, 239, 240)" }}
      
      src={logotransparenteshadow} alt="Logo" className="logo-hero-section shadow-text" />
      <h1 className="hero-title">CONSTRUCTORA</h1>
      <h1 className="hero-title"> INMOBILIARIA</h1>
      <h1 className="hero-title">CONSULTORÍA EMPRESARIAL & CAPITAL HUMANO</h1>
    </section>
  );
};

export default HeroSection;
