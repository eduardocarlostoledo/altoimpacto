import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Home.css";
import HeroSection from "./HeroSection";
import StorytellingSection from "./StorytellingSection";
import mission from "../img/mision.jpg";
import PropertyModal from "./PropertyModal";
import FeatureCardGrid from "./FeatureCardGrid.jsx";

const featuresServiciosGlobales = [
  {
    image:
      "https://www.dynamicgc.es/wp-content/uploads/2019/12/Consultoria-Estrategica.jpg",
    title: "Consultoría Estratégica",
    description:
      "25 años de experiencia en compras públicas y desarrollo empresarial",
  },
  {
    image:
      "https://media.licdn.com/dms/image/v2/D5612AQEPooJ4RBntvw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1688283596933?e=2147483647&v=beta&t=Ej7BULTYpxP1O2dRo_NJuYf4Uyw8YXVyf_78JRiGRbI",
    title: "Desarrollos Inmobiliarios",
    description:
      "Propiedades exclusivas con los más altos estándares de calidad",
  },
  {
    image:
      "https://resizer.glanacion.com/resizer/v2/la-construccion-de-viviendas-premium-en-barrios-BSK7HLXQIRDR5O6FZLXHD32MZA.jpg?auth=0dbcee701928e28d2d4ea793f8b07e5a22fdefd90fd8b5735ac441872a576fb5&width=1200&quality=70&smart=false&height=800",
    title: "Construcción Premium",
    description: "Realizamos proyectos arquitectónicos de vanguardia",
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
      
      <HeroSection />
      
      
      <section className="about-section home-section">
        <div className="gold-divider"></div>
        <h2 className="section-title shadow-text">  </h2>
        <p className="section-subtitle shadow-text">
          Soluciones integrales de alto nivel para proyectos exigentes
        </p>
      </section>

      <div style={{ marginTop: "2rem" }}> 
        <FeatureCardGrid features={featuresServiciosGlobales}   onCardClick={handleClick} />

        

        <StorytellingSection
          stories={[
            {
              img: "https://tickelia.com/wp-content/uploads/2023/09/vision-empresarial.jpg.webp",
              text: "Nuestra Visión: Convertirnos en un grupo empresarial Líder y Referente en soluciones integrales que transformen espacios, optimicen negocios y conecten personas con su hogar ideal, creando un impacto positivo en la vida de las comunidades. Nos vemos de aca a 5 años con una Compañía Altamente rentable y creciendo a través de sucursales o franquicias con unas 50 a 70 construcciones mensuales.",
            },
            {
              img: mission,
              text: `Nuestra Misión: Ofrecer servicios de construcción, Consultoría empresarial, Recursos Humanos, y gestión 
  inmobiliaria con excelencia, innovación y enfoque humano. Acompañar a nuestros clientes 
  en cada etapa, desde diseñar espacios únicos y brindar asesoría estratégica, hasta 
  encontrar el inmueble que mejor se ajuste a sus necesidades. Caminando a la par del 
  ecosistema, protegiéndolo y mimandolo.`,
            },
            {
              img: "https://www.vietnamteambuilding.net/en/wp-content/uploads/2021/07/Team-building-forcast.jpg",
              text: ` Trabajo en equipo: Fomentar la colaboración interna y con nuestros clientes como clave 
  del éxito. `,
            },
            {
              img: "https://d3t4nwcgmfrp9x.cloudfront.net/upload/etica-empresarial-2024-principios-clave-y-consejos-para-su-implementacion-643x342.jpg",
              text: `- Integridad: Actuar con transparencia, ética y profesionalismo en cada relación y en cada 
  acción.`,
            },
            {
              img: "https://www.fundacionbankinter.org/wp-content/uploads/2021/07/-que-es-la-innovacion-definicion-y-caracteristicas.jpg",
              text: `- Innovación: Buscar constantemente nuevas ideas y tecnologías para mejorar nuestros 
  servicios.  -`,
            },
            {
              img: "https://sandiario.com/cdn/shop/articles/blog-ver-brujula-0.webp?v=1721125647&width=940",
              text: `Excelencia: Compromiso con la calidad en cada detalle de nuestros proyectos y 
  procesos. `,
            },
            {
              img: "https://solodinero.com/wp-content/uploads/sites/8/2024/12/Sostenibilidad.jpg?resize=1316,740&quality=80",
              text: `- Sostenibilidad: Promover prácticas responsables que respeten el medio ambiente y 
  contribuyan al desarrollo de comunidades sostenibles.`,
            },
          ]}
          title="Nuestra Misión y Visión"
        />
      </div>

      <section></section>

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
