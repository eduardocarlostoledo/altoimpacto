// ✅ 11. Navbar.jsx actualizado con CSS puro y animación inicial GSAP

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "../styles/Navbar.css";
import logotransparente from "../img/logotransparente.png";
import logowhatsapp from "../img/whatsapp.svg"

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    gsap.from(".navbar", {
      y: -50,
      opacity: 1,
      duration: 0,
      ease: "power3.out",
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={() => setActiveLink("")}>
          <img src={logotransparente} alt="Logo" className="logo-navbar" />
          <div className="logo-texts">
            <span className="logoPart1">GLOBAL</span>
            <span className="logoPart2">HOME GROUP</span>
          </div>
        </Link>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`navLinks ${menuOpen ? "open" : ""}`}>
        <Link
  to="/"
  className={`navLink ${activeLink === "home" ? "active" : ""}`}
  onClick={() => {
    setActiveLink("home");
    setMenuOpen(false);
  }}
>
  Inicio
</Link>

<Link
  to="/constructora"
  className={`navLink ${activeLink === "constructora" ? "active" : ""}`}
  onClick={() => {
    setActiveLink("constructora");
    setMenuOpen(false);
  }}
>
  Constructora
</Link>

<Link
  to="/inmobiliaria"
  className={`navLink ${activeLink === "inmobiliaria" ? "active" : ""}`}
  onClick={() => {
    setActiveLink("inmobiliaria");
    setMenuOpen(false);
  }}
>
  Inmobiliaria
</Link>

<Link
  to="/consultora"
  className={`navLink ${activeLink === "consultora" ? "active" : ""}`}
  onClick={() => {
    setActiveLink("consultora");
    setMenuOpen(false);
  }}
>
  Consultora
</Link>

<Link
  to="/contacto"
  className={`navLink ${activeLink === "contacto" ? "active" : ""}`}
  onClick={() => {
    setActiveLink("contacto");
    setMenuOpen(false);
  }}
>
  Contacto
</Link>

        </div>

        <div>

        <a href="https://wa.me/5493764221063" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <img
                  src={logowhatsapp}
                  alt="WhatsApp"
                  style={{ width: "40px", height: "40px", filter: "brightness(1.1)" }}
                />
              </a>


          {/* <a
            href="/contacto"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-link"
          >
            <button className="contactButton">
              <span>Contacto</span>
              <div className="buttonHoverEffect"></div>
            </button>
          </a> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
