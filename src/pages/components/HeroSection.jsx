import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
  useEffect(() => {
    gsap.from(".hero-content h1", {
      y: 80,
      opacity: 0,
      duration: 1.5,
      delay: 0.3,
      ease: "power3.out"
    });
    
    gsap.from(".hero-content p", {
      y: 80,
      opacity: 0,
      duration: 1.5,
      delay: 0.6,
      ease: "power3.out"
    });
    
    gsap.from(".scroll-indicator", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 1.5,
      ease: "power3.out"
    });
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}></div>
      <div className={`${styles.heroContent} hero-content`}>
        <h1>
          <span>Excelencia</span> en cada proyecto
        </h1>
        <p>
          Soluciones premium para clientes exigentes en consultoría, construcción e inmobiliaria
        </p>
      </div>
      
      <div className={`${styles.scrollIndicator} scroll-indicator`}>
        <span>Scroll</span>
        <div className={styles.arrowDown}></div>
      </div>
    </section>
  );
};

export default HeroSection;