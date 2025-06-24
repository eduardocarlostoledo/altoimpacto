// ✅ 9. ConstructoraHero.jsx actualizado con imágenes en tarjetas

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/ConstructoraHero.css";
import StorytellingSection from "./StorytellingSection";
import PropertyModal from "./PropertyModal";
import constructorahero1 from "../img/constructorahero1.jpg";
import constructorahero2 from "../img/constructorahero2.webp";
import constructorahero3 from "../img/constructorahero3.jpg";
import FeatureCardGrid from './FeatureCardGrid';
import constructorast1 from "../img/constructorast1.jpeg";
import constructorast2 from "../img/constructorast2.webp";
import constructorast3 from "../img/constructorast3.jpg";
import constructorast4 from "../img/constructorast4.jpg";
import Viviendas from "./Viviendas";
import Construcciones from "./Construcciones";
import LandingLlaveEnMano from "./LandingLlaveEnMano";





gsap.registerPlugin(ScrollTrigger);

const featuresConstructora = [
  {
    image: constructorahero1,
    title: "Diseño Arquitectónico",
    description: "Soluciones innovadoras con los mejores estándares internacionales",
  },
  {
    image: constructorahero2,
    title: "Gestión de Proyectos",
    description: "Control total desde la concepción hasta la entrega final",
  },
  {
    image: constructorahero3,
    title: "Desarrollos Inmobiliarios",
    description: "Creación de valor a través de ubicaciones estratégicas",
  },
];



const ConstructoraHero = () => {

  const urlActual = window.location.href;
  const mensaje = `Hola! Estoy interesado en el modelo de construcción llave en mano que vi en: ${urlActual}`;
  const whatsappLink = `https://wa.me/542216146117?text=${encodeURIComponent(mensaje)}`;

  useEffect(() => {
    gsap.from(".constructora-hero-content h1", {
      y: 80,
      opacity: 1,
      duration: 0,
      ease: "power3.out",
      delay: 0.3,
    });

    gsap.from(".constructora-hero-content p", {
      y: 80,
      opacity: 1,
      duration: 0,
      ease: "power3.out",
      delay: 0.6,
    });

    gsap.from(".constructora-feature-card", {
      y: 100,
      opacity: 1,
      stagger: 0.2,
      duration: 0,
      ease: "power3.out",
      delay: 0.9,
      scrollTrigger: {
        trigger: ".constructora-features",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.to(".constructora-hero-bg", {
      y: "-20%",
      scrollTrigger: {
        trigger: ".constructora-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const handleClick = (property) => {
    PropertyModal({ property });
  };
  
  
    // 👇 Al hacer click en una propiedad real
    const handlePropertyClick = (prop) => {
      
      navigate(`/planes/${prop.id}`);
    };

   
    

  return (
    <div>
      <section className="constructora-hero">
        <div className="constructora-hero-bg"></div>
        <div className="constructora-hero-overlay"></div>

        <div className="constructora-hero-content">
          <h1>
            <span className="gold-gradient">NOS ELIGEN</span> POR DERRIBAR LIMITES…
          </h1>

          <p className="subtitle">
            PORQUE CONVERTIMOS TUS SUEÑOS EN
            REALIDAD, HACEMOS DE CADA VIVIENDA SEA EL COMIENZO DE UNA GRAN
            HISTORIA…
          </p>
          <p> </p>
          <p className="subtitle"> TU PROPIA HISTORIA”. </p>
        </div>


      </section>
<LandingLlaveEnMano/>

 

      

      <Viviendas onCardClick={handlePropertyClick} />
      <Construcciones onCardClick={handlePropertyClick} />
        <FeatureCardGrid features={featuresConstructora} onCardClick={handleClick} />
      <div> 
        <StorytellingSection
          stories={[
            {
              img: constructorast1,
              text: "Diseñamos y construimos viviendas de alta gama que fusionan innovación arquitectónica con materiales de excelencia, creando espacios únicos y rentables.",
            },
            {
              img: constructorast2,
              text: "Ejecutamos desarrollos inmobiliarios estratégicos con un enfoque integral que asegura eficiencia constructiva y proyección de valor en el tiempo.",
            },
           
            {
              img: constructorast3,
              text: "Construimos espacios que no solo cumplen con los estándares más altos de calidad, sino que también reflejan la esencia y el estilo de vida de nuestros clientes.",
              
            },
            {
              img: constructorast4,
              text: "Desarrollamos proyectos inmobiliarios que transforman espacios y crean valor a largo plazo.",
            },




          ]} title = "Construyendo tus Sueños"
        />

      </div>

      <a
      style={{ textAlign: "center", display: "block", margin: "1px" }}
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
              <path d="M12 0a12 12 0 0 0-10.26 17.94L0 24l6.3-1.65A12 12 0 1 0 12 0zm.06 21.6a9.56 9.56 0 0 1-4.89-1.34l-.35-.2-3.73.98.99-3.63-.23-.37A9.58 9.58 0 1 1 21.6 12a9.6 9.6 0 0 1-9.54 9.6zM17 14.27c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.63.14-.73.9-.9 1.08-.33.2-.61.07a7.89 7.89 0 0 1-2.3-1.44 8.6 8.6 0 0 1-1.57-1.93c-.16-.28 0-.43.12-.57s.28-.33.42-.5a1.9 1.9 0 0 0 .28-.47c.1-.23 0-.43 0-.57s-.63-1.53-.86-2.1-.46-.5-.63-.5h-.53a1 1 0 0 0-.73.34 3 3 0 0 0-.94 2.2c0 1.3.94 2.57 1.07 2.75a10.26 10.26 0 0 0 4.23 3.5c.59.26 1.05.42 1.41.53a3.37 3.37 0 0 0 1.54.1 2.58 2.58 0 0 0 1.68-1.2c.2-.33.2-.6.14-.66s-.27-.15-.54-.28z" />
            </svg>
            Consultar por WhatsApp
          </a>


    </div>
  );
};

export default ConstructoraHero;
