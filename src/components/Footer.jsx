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
              
              <li><a href="/constructora">Constructora</a></li>
              <li><a href="/inmobiliaria">Inmobiliaria</a></li>
              <li><a href="/consultora">Consultora</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contacto</h4>


            <li><a href="mailto:info@globalhomegroup.com.ar">info@globalhomegroup.com.ar</a></li>
              {/* <li><a href="mailto:constructora@globalhomegroup.com.ar">constructora@globalhomegroup.com.ar</a></li>
              <li><a href="mailto:inmobiliaria@globalhomegroup.com.ar">inmobiliaria@globalhomegroup.com.ar</a></li>
              <li><a href="mailto:consultora@globalhomegroup.com.ar">consultora@globalhomegroup.com.ar</a></li> */}
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
