// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>Global Home Group</h2>
          <p>Construimos confianza, asesoramos el futuro, y te acompañamos en el presente.</p>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Áreas</h4>
            <ul>
              <li><a href="/consultora">Consultora</a></li>
              <li><a href="/constructora">Constructora</a></li>
              <li><a href="/inmobiliaria">Inmobiliaria</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contacto</h4>
            <ul>
              <li><a href="mailto:info@consultora.com">info@consultora.com</a></li>
              <li><a href="mailto:info@constructora.com">info@constructora.com</a></li>
              <li><a href="mailto:info@inmobiliaria.com">info@inmobiliaria.com</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Global Home Group. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
