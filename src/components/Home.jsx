import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Home.css";
import HeroSection from "./HeroSection";
import StorytellingSection from "./StorytellingSection";
import mission from "../img/mision.jpg";
import PropertyModal from "./PropertyModal";
import FeatureCardGrid from "./FeatureCardGrid.jsx";
import homevision from "../img/home-vision.webp";
import hometrabajoequipo from "../img/home-trabajo-equipo.jpg";
import homeintegridad from "../img/home-integridad.jpg";
import homeinnovacion from "../img/home-innovacion.jpg";
import homeexcelencia from "../img/home-excelencia.jpeg";
import homesostenibilidad from "../img/home-sostenibilidad.jpg";
import homebaner1 from "../img/home-baner1.jpg";
import homebaner2 from "../img/home-baner2.jpeg"; 
import homebaner3 from "../img/home-baner3.jpg";






const featuresServiciosGlobales = [
  {
    image:
      homebaner3,
    title: "Construcción Premium",
    description: "Realizamos proyectos arquitectónicos de vanguardia",
    link: "/constructora"
  },
  
  {
    image:
      homebaner2,
    title: "Desarrollos Inmobiliarios",
    description:
      "Propiedades exclusivas con los más altos estándares de calidad",
      link: "/inmobiliaria"
  },

  {
    image:
      homebaner1,
    title: "Consultoría Estratégica",
    description:
      "25 años de experiencia en compras públicas y desarrollo empresarial",
      link: "/consultora"
  },

];

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    const bg = document.querySelector(".home-hero-bg");
    if (bg) {
      gsap.to(bg, {
        y: "-10%",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    const animatedSections = gsap.utils.toArray(".home-section");
    animatedSections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 60, opacity: 1 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          ease: "power2.out",
        }
      );
    });
  }, []);

  const handleClick = (property) => {
    PropertyModal({ property });
  };

  return (
    
    <div className="home">
      <div className="home-hero-bg"></div>
  
      {/* Hero principal */}
      <section className="hero-section">
        <HeroSection />
      </section>
  
      {/* Cards de servicios estratégicos */}
      <section className="home-features-cards">
        <FeatureCardGrid
        
          features={featuresServiciosGlobales}
          onCardClick={handleClick}
        />
      </section>
  
      {/* Misión, visión y valores */}
      <section className="home-section">
        <StorytellingSection
          stories={[
            {
              title: "Visión",
              img: homevision,
              text: `Visión: 
Convertirnos en un grupo empresarial Líder y Referente en soluciones integrales que 
transformen espacios, optimicen negocios y conecten personas con su hogar ideal, 
creando un impacto positivo en la vida de las comunidades. Nos vemos de aca a 5 años 
con una Compañía Altamente rentable y creciendo a través de sucursales o franquicias 
con unas 50 a 70 construcciones mensuales.`
            },
            {
              title: "Mision",
              img: mission,
              text: `Misión: 
Ofrecer servicios de construcción, Consultoría empresarial, Recursos Humanos, y gestión 
inmobiliaria con excelencia, innovación y enfoque humano. Acompañar a nuestros clientes 
en cada etapa, desde diseñar espacios únicos y brindar asesoría estratégica, hasta 
encontrar el inmueble que mejor se ajuste a sus necesidades. Caminando a la par del 
ecosistema, protegiéndolo y mimandolo. `
            },
            {
              title: "Innovación",
              img: homeinnovacion,
              text: `Innovación: Buscar constantemente nuevas ideas y tecnologías para mejorar nuestros servicios.`
            },
            {
              title: "Excelencia",
              img: homeexcelencia,
              text: `Excelencia: Compromiso con la calidad en cada detalle de nuestros proyectos y 
procesos. `
            },
            {
              title: "Integridad",
              img: homeintegridad,
              text: ` Integridad: Actuar con transparencia, ética y profesionalismo en cada relación y en cada 
acción. `
            },
            {
              title: "Trabajo en equipo",
              img: hometrabajoequipo,
              text: `Trabajo en equipo: Fomentar la colaboración interna y con nuestros clientes como clave 
del éxito. `
            },
     
      
        
            {
              title: "Sostenibilidad",
              img: homesostenibilidad,
              text: `Sostenibilidad: Promover prácticas responsables que respeten el medio ambiente y 
contribuyan al desarrollo de comunidades sostenibles. `
            }
            
          ]}
          valores="Nuestros Valores"            
          
        />
      </section>
  
      {/* Llamado a la acción */}
      <section className="cta-section home-section">
        <div className="cta-content">
          <h2 className="shadow-text">
            ¿Listo para comenzar su próximo proyecto de excelencia?
          </h2>
          <a
            href="https://wa.me/5492216146117"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-link"
          >
            <button className="cta-button">
              <span>Contactar Asesor</span>
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
          </a>
        </div>
      </section>
    </div>
  );
  
};

export default Home;
