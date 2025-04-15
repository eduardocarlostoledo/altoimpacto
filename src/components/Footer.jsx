import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>Elite Group</h3>
          <p className={styles.footerText}>
            Líderes en soluciones integrales de alta gama para proyectos exigentes.
          </p>
        </div>
        
        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>Enlaces Rápidos</h3>
          <ul className={styles.footerLinks}>
            <li><a href="/">Inicio</a></li>
            <li><a href="/constructora">Constructora</a></li>
            <li><a href="/inmobiliaria">Inmobiliaria</a></li>
            <li><a href="/consultora">Consultora</a></li>
          </ul>
        </div>
        
        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>Contacto</h3>
          <ul className={styles.contactInfo}>
            <li>Av. Principal 1234, Ciudad</li>
            <li>info@elitegroup.com</li>
            <li>+54 11 1234-5678</li>
          </ul>
        </div>
        
        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>Síganos</h3>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          © {currentYear} Elite Group International. Todos los derechos reservados.
        </div>
        <div className={styles.legalLinks}>
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;