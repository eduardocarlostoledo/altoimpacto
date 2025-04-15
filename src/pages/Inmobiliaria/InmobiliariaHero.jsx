import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './InmobiliariaHero.scss';

const InmobiliariaHero = () => {
  useEffect(() => {
    gsap.to(".inmobiliaria-hero-bg", {
      scale: 1.1,
      duration: 15,
      ease: "none",
      repeat: -1,
      yoyo: true
    });
    
    gsap.from(".inmobiliaria-hero-content > *", {
      y: 80,
      opacity: 0,
      stagger: 0.2,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5
    });
  }, []);

  return (
    <section className="inmobiliaria-hero">
      <div className="inmobiliaria-hero-bg"></div>
      <div className="inmobiliaria-hero-overlay"></div>
      
      <div className="inmobiliaria-hero-content">
        <h1>
          <span className="highlight">Excelencia</span> en el Mercado Inmobiliario
        </h1>
        <p className="subtitle">Soluciones premium para propiedades exclusivas</p>
        
        <div className="inmobiliaria-services-grid">
          <div className="service-card">
            <div className="service-icon">🏠</div>
            <h3>Alquileres Premium</h3>
            <p>Gestión de propiedades de alto standing</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">💰</div>
            <h3>Ventas & Tasaciones</h3>
            <p>Valoraciones precisas con tecnología de vanguardia</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">✨</div>
            <h3>Puesta a Punto</h3>
            <p>Preparación integral para maximizar valor</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InmobiliariaHero;