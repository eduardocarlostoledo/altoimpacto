import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './ConsultoraHero.scss';

const ConsultoraHero = () => {
  useEffect(() => {
    gsap.from(".consultora-hero-content h1", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out"
    });
    gsap.from(".consultora-hero-content p", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "power3.out"
    });
    gsap.from(".consultora-cta", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.9,
      ease: "power3.out"
    });
  }, []);

  return (
    <section className="consultora-hero">
      <div className="consultora-hero-overlay"></div>
      <div className="consultora-hero-content">
        <h1>Excelencia en Consultoría Estratégica</h1>
        <p>25 años liderando la transformación empresarial con soluciones innovadoras en compras públicas</p>
        <button className="consultora-cta">
          <span>Descubra nuestro método</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ConsultoraHero;