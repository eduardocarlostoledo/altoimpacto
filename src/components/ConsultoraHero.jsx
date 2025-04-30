import React, { useEffect } from "react";
import { gsap } from "gsap";
import "../styles/ConsultoraHero.css";
import StorytellingSection from "./StorytellingSection";
import FeatureCardGrid from "./FeatureCardGrid.jsx";
import PropertyModal from "./PropertyModal";
import ConsultorProfile from "./ConsultorProfile";

const featuresConsultora = [
  {
    image:
      "https://www.gilmar.es/wp-content/uploads/2022/06/vender-vivienda-de-lujo.jpg",
    title: "Alquileres Premium",
    description: "Gestión de propiedades de alto standing",
  },
  {
    image:
      "https://img.freepik.com/foto-gratis/tiler-trabajando-renovacion-apartamento_23-2149278557.jpg?semt=ais_hybrid&w=740",
    title: "Puesta a Punto",
    description: "Preparación integral para maximizar valor",
  },
  {
    image:
      "https://andigital.com.ar/uploads/ckeditor/2024/05/20240527111158_foto-interior-1.jpg",
    title: "Ventas y Tasaciones",
    description: "Valoraciones precisas con tecnología de vanguardia",
  },
];

const ConsultoraHero = () => {
  //console.log("ConsultoraHero component rendered", featuresConsultora);
  useEffect(() => {
    gsap.from(".consultora-hero-content h1", {
      y: 50,
      opacity: 1,
      duration: 0,
      delay: 0.3,
      ease: "power3.out",
    });
    gsap.from(".consultora-hero-content p", {
      y: 50,
      opacity: 1,
      duration: 0,
      delay: 0.6,
      ease: "power3.out",
    });
    gsap.from(".consultora-cta", {
      y: 30,
      opacity: 1,
      duration: 0,
      delay: 0.9,
      ease: "power3.out",
    });
  }, []);
  const handleClick = (property) => {
    PropertyModal({ property });
  };
  
  return (
    <div>
      <section className="consultora-hero">
        <div className="consultora-hero-overlay"></div>
        <div className="consultora-hero-content">
          <h1>Excelencia en Consultoría Estratégica</h1>
          <p>
          “POTENCIAMOS EQUIPOS, TRANSFORMAMOS EMPRESAS…SOMOS EL PUENTE ENTRE VOS Y TUS METAS 
          Y LOGRAMOS QUE TU EMPRESA PROSPERE SIN LIMITES”. 
          </p>
          <button className="consultora-cta">
            <span>Descubra nuestro método</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>
      <ConsultorProfile />
      {/* <FeatureCardGrid features={featuresConsultora} onCardClick={handleClick} /> */}
      <div>
        <StorytellingSection
          stories={[
            {
              img: "https://www.michaelpage.es/sites/michaelpage.es/files/styles/advice_node_desktop/public/legacy/9%20caracteri%C2%A6%C3%BCsicas%20que%20los%20consultores%20buscan%20en%20un%20CV.jpg.webp?itok=CBeGli2P",
              text: "Diseñamos y construimos viviendas de alta gama que fusionan innovación arquitectónica con materiales de excelencia, creando espacios únicos y rentables.",
            },
            {
              img: "https://reddinconsultants.com/wp-content/uploads/2023/02/consultoria-1.jpg.webp",
              text: "Ejecutamos desarrollos inmobiliarios estratégicos con un enfoque integral que asegura eficiencia constructiva y proyección de valor en el tiempo.",
            },

            {
              img: "https://reddinconsultants.com/wp-content/uploads/2023/02/consultoria-2.jpg.webp",
              text: "Construimos espacios que no solo cumplen con los estándares más altos de calidad, sino que también reflejan la esencia y el estilo de vida de nuestros clientes.",
            },
            {
              img: "https://www.smartplacement.net/hs-fs/hubfs/Imported_Blog_Media/Variables_para_que_se_elija_una_consultora-1024x683.jpg?width=1024&height=683&name=Variables_para_que_se_elija_una_consultora-1024x683.jpg",
              text: "Desarrollamos proyectos inmobiliarios que transforman espacios y crean valor a largo plazo.",
            },
          ]}
          title="POTENCIAMOS EQUIPOS, TRANSFORMAMOS EMPRESAS…SOMOS EL PUENTE ENTRE VOS Y TUS METAS Y LOGRAMOS QUE TU EMPRESA PROSPERE SIN LIMITES"
        />
      </div>{" "}
    </div>
  );
};

export default ConsultoraHero;
