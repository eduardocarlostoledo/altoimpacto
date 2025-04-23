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
    </div>
  );
};

export default ConstructoraHero;
