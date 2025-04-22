
// ✅ 6. HeroSection.jsx

import React from 'react';
import '../styles/HeroSection.css';
import logotransparente from "../img/logotransparente.png";


const HeroSection = () => {
  return (
    <section className="hero-section">
      <img src={logotransparente} alt="Logo" className="logo-hero-section shadow-text" />
      <h1 className="hero-title">CONSTRUCTORA</h1>
      <p className="hero-title"> INMOBILIARIA</p>
      <p className="hero-title">CONSULTORÍA EMPRESARIAL & CAPITAL HUMANO</p>
    </section>
  );
};

export default HeroSection;
