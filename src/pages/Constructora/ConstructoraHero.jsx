import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ConstructoraHero.scss';

gsap.registerPlugin(ScrollTrigger);

const ConstructoraHero = () => {
  useEffect(() => {
    // Animación de título
    gsap.from(".constructora-hero-content h1", {
      y: 80,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.3
    });

    // Animación de subtítulo
    gsap.from(".constructora-hero-content p", {
      y: 80,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.6
    });

    // Animación de tarjetas
    gsap.from(".constructora-feature-card", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      delay: 0.9,
      scrollTrigger: {
        trigger: ".constructora-features",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Efecto parallax
    gsap.to(".constructora-hero-bg", {
      y: "-20%",
      scrollTrigger: {
        trigger: ".constructora-hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section className="constructora-hero">
      <div className="constructora-hero-bg"></div>
      <div className="constructora-hero-overlay"></div>
      
      <div className="constructora-hero-content">
        <h1>
          <span className="gold-gradient">Construcción</span> de Excelencia
        </h1>
        <p className="subtitle">Transformamos visiones en realidades arquitectónicas</p>
      </div>
      
      <div className="constructora-features">
        <div className="constructora-feature-card">
          <div className="card-icon">📐</div>
          <h3>Diseño Arquitectónico</h3>
          <p>Soluciones innovadoras con los mejores estándares internacionales</p>
        </div>
        
        <div className="constructora-feature-card">
          <div className="card-icon">🏗️</div>
          <h3>Gestión de Proyectos</h3>
          <p>Control total desde la concepción hasta la entrega final</p>
        </div>
        
        <div className="constructora-feature-card">
          <div className="card-icon">🌍</div>
          <h3>Desarrollos Inmobiliarios</h3>
          <p>Creación de valor a través de ubicaciones estratégicas</p>
        </div>
      </div>
    </section>
  );
};

export default ConstructoraHero;