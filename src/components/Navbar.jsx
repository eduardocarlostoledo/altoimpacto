
// ✅ 11. Navbar.jsx actualizado con CSS puro y animación inicial GSAP

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import "../styles/Navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    gsap.from(".navbar", {
      y: -50,
      opacity: 1,
      duration: 0,
      ease: "power3.out"
    });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={() => setActiveLink('')}>
          <span className="logoPart1">GLOBAL</span>
          <span className="logoPart2">HOME GROUP</span>
        </Link>

        <div className="navLinks">
          <Link to="/" className={`navLink ${activeLink === 'home' ? 'active' : ''}`} onClick={() => setActiveLink('home')}>Inicio</Link>
          <Link to="/constructora" className={`navLink ${activeLink === 'constructora' ? 'active' : ''}`} onClick={() => setActiveLink('constructora')}>Constructora</Link>
          <Link to="/inmobiliaria" className={`navLink ${activeLink === 'inmobiliaria' ? 'active' : ''}`} onClick={() => setActiveLink('inmobiliaria')}>Inmobiliaria</Link>
          <Link to="/consultora" className={`navLink ${activeLink === 'consultora' ? 'active' : ''}`} onClick={() => setActiveLink('consultora')}>Consultora</Link>
        </div>

        <button className="contactButton">
          <span>Contacto</span>
          <div className="buttonHoverEffect"></div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
