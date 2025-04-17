// ✅ 9. ConstructoraHero.jsx actualizado con imágenes en tarjetas

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/ConstructoraHero.css";
import StorytellingSection from "./StorytellingSection";
import PropertyModal from "./PropertyModal";

import FeatureCardGrid from './FeatureCardGrid';
gsap.registerPlugin(ScrollTrigger);

const featuresConstructora = [
  {
    image: "https://i0.wp.com/stillframerender.com/wp-content/uploads/2023/04/Carlos-Aguilar-G-Fachada-Principal-copia.png?ssl=1",
    title: "Diseño Arquitectónico",
    description: "Soluciones innovadoras con los mejores estándares internacionales",
  },
  {
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRDHM8N2oldaMJ66FnA212Vsb1VoHTdohzYdAn_d0zSPUb7U4boBEQ5rnohJ4jQcJmFgSOsnUQXKVxjon955Nm-AUhBWbLBRL6ih1sbPw",
    title: "Gestión de Proyectos",
    description: "Control total desde la concepción hasta la entrega final",
  },
  {
    image: "https://www.esan.edu.pe/images/blog/2016/03/10/inmobiliaria-principal.jpg",
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
            <span className="gold-gradient">Construcción</span> de Excelencia
          </h1>

          <p className="subtitle">
            “NOS ELIGEN POR DERRIBAR LIMITES…PORQUE CONVERTIMOS TUS SUEÑOS EN
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
              img: "https://em4ftgkgsyf.exactdn.com/wp-content/uploads/2021/11/3a.jpeg?strip=all&lossy=1&ssl=1",
              text: "Diseñamos y construimos viviendas de alta gama que fusionan innovación arquitectónica con materiales de excelencia, creando espacios únicos y rentables.",
            },
            {
              img: "https://neuquenalinstante-s3.cdn.net.ar/s3i233/2023/09/neuquenalinstante2/images/23/40/234085_e0d5d74911ea4d06118bfea6fd3658198564449fd15870d9eba8f7cbf3c63f70/md.webp",
              text: "Ejecutamos desarrollos inmobiliarios estratégicos con un enfoque integral que asegura eficiencia constructiva y proyección de valor en el tiempo.",
            },
           
            {
              img: "https://cms.evangelicodigital.com/upload/imagenes/5ef5d56838394_JosueIsaiRamosFigueroaconstruyendoG.jpg",
              text: "Construimos espacios que no solo cumplen con los estándares más altos de calidad, sino que también reflejan la esencia y el estilo de vida de nuestros clientes.",
              
            },
            {
              img: "https://www.esan.edu.pe/images/blog/2016/03/10/inmobiliaria-principal.jpg",
              text: "Desarrollamos proyectos inmobiliarios que transforman espacios y crean valor a largo plazo.",
            },




          ]} title = "Construyendo tus Sueños"
        />
      </div>
    </div>
  );
};

export default ConstructoraHero;
