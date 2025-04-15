import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { gsap } from 'gsap';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Animación inicial
    gsap.from(".navbar", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={() => setActiveLink('')}>
          <span className={styles.logoPart1}>ELITE</span>
          <span className={styles.logoPart2}>GROUP</span>
        </Link>

        <div className={styles.navLinks}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${activeLink === 'home' ? styles.active : ''}`}
            onClick={() => setActiveLink('home')}
          >
            Inicio
          </Link>
          <Link 
            to="/constructora" 
            className={`${styles.navLink} ${activeLink === 'constructora' ? styles.active : ''}`}
            onClick={() => setActiveLink('constructora')}
          >
            Constructora
          </Link>
          <Link 
            to="/inmobiliaria" 
            className={`${styles.navLink} ${activeLink === 'inmobiliaria' ? styles.active : ''}`}
            onClick={() => setActiveLink('inmobiliaria')}
          >
            Inmobiliaria
          </Link>
          <Link 
            to="/consultora" 
            className={`${styles.navLink} ${activeLink === 'consultora' ? styles.active : ''}`}
            onClick={() => setActiveLink('consultora')}
          >
            Consultora
          </Link>
        </div>

        <button className={styles.contactButton}>
          <span>Contacto</span>
          <div className={styles.buttonHoverEffect}></div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;