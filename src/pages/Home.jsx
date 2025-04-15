import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Home.module.scss';
import HeroSection from './components/HeroSection.jsx';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Animaciones para elementos de la página
    gsap.utils.toArray('.home-section').forEach(section => {
      gsap.from(section, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        ease: "power3.out"
      });
    });
  }, []);

  return (
    <div className={styles.home}>
      <HeroSection />
      
      <section className={`${styles.aboutSection} home-section`}>
        <div className={styles.goldDivider}></div>
        <h2 className={styles.sectionTitle}>Elite Group International</h2>
        <p className={styles.sectionSubtitle}>
          Soluciones integrales de alto nivel para proyectos exigentes
        </p>
        
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <h3>Consultoría Estratégica</h3>
            <p>25 años de experiencia en compras públicas y desarrollo empresarial</p>
          </div>
          
          <div className={styles.serviceCard}>
            <h3>Desarrollos Inmobiliarios</h3>
            <p>Propiedades exclusivas con los más altos estándares de calidad</p>
          </div>
          
          <div className={styles.serviceCard}>
            <h3>Construcción Premium</h3>
            <p>Realizamos proyectos arquitectónicos de vanguardia</p>
          </div>
        </div>
      </section>
      
      <section className={`${styles.ctaSection} home-section`}>
        <div className={styles.ctaContent}>
          <h2>¿Listo para comenzar su próximo proyecto de excelencia?</h2>
          <button className={styles.ctaButton}>
            <span>Contactar Asesor</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;