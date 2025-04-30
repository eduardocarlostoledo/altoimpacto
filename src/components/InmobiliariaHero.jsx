import React, { useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import "../styles/InmobiliariaHero.css";
import StorytellingSection from "./StorytellingSection";
import FeatureCardGrid from "./FeatureCardGrid.jsx";
import inmobiliariaft1 from "../img/inmobiliariahero.jpg";
import inmobiliariaft2 from "../img/inmobiliariahero2.jpg";
import inmobiliariaft3 from "../img/inmobiliariahero3.jpg";
import PropiedadesPublic from "./PropiedadesPublic.jsx";
import Propiedades from "./Propiedades.jsx";
import PropertyModal from "./PropertyModal";


const featuresInmobiliaria = [
  {
    image: inmobiliariaft1,
    title: "Gestión de Inmuebles",
    description: "Gestión de propiedades de alto standing",
  },
  {
    image: inmobiliariaft2,
    title: "Ventas & Tasaciones",
    description: "Valoraciones precisas con tecnología de vanguardia",
  },
  {
    image: inmobiliariaft3,
    title: "Puesta a Punto",
    description: "Preparación integral para maximizar valor",
  },
];

const featuresServiciosPrestados = [
  {
    image: "https://tasacion.co/wp-content/uploads/2021/12/servicios-de-una-agencia-inmobiliaria.png",
    title: "Inmuebles Disponibles",
    description: "Casas, Departamentos, Dúplex, Locales, Fondos de comercio, Galpones, Oficinas, Edificios, Terrenos, Campos, Franquicias, Patentes, Cocheras, Propiedades comerciales",
  },
  {
    image: "https://azhogar.com/wp-content/uploads/2023/08/elementos-finanzas-arreglo-cubos-madera-monedas-honorarios-1.webp",
    title: "Modalidades de Operación",
    description: "Venta, Alquiler, Alquiler temporal",
  },
  {
    image: "https://i0.wp.com/aldiaargentina.microjuris.com/wp-content/uploads/2017/10/shutterstock_675338449.jpg",
    title: "Cobertura Geográfica",
    description: "Localidades urbanas y suburbanas, Barrios cerrados y zonas rurales, Zonas estratégicas para inversión inmobiliaria",
  },
  {
    image: "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1024,h_594/https://tasacion.co/wp-content/uploads/2021/12/servicios-agencia-inmobiliaria-1024x594.png",
    title: "Segmentación de Precios",
    description: "Propiedades por rango de precio, Filtrado desde menor a mayor valor, Accesibles y de alta gama",
  },
];

gsap.registerPlugin(gsap.ScrollTrigger);

const InmobiliariaHero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.to(".inmobiliaria-hero-bg", {
      scale: 1.1,
      duration: 15,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    gsap.from(".inmobiliaria-hero-content > *", {
      y: 80,
      opacity: 1,
      stagger: 0.2,
      duration: 0,
      ease: "power3.out",
      delay: 0.9,
    });
  }, []);

  const handleClick = (property) => {
    PropertyModal({ property });
  };
  
  // 👇 Al hacer click en una propiedad real
  const handlePropertyClick = (prop) => {
    console.log(prop);
    navigate(`/propiedades/${prop.id}`);
  };

  return (
    <div>
      {/* Hero principal */}
      <section className="inmobiliaria-hero">
        <div className="inmobiliaria-hero-overlay"></div>
        <div className="inmobiliaria-hero-content">
          <h1><span className="highlight">NOSOTROS </span> NO ENCONTRAMOS TU CASA</h1>
          <h2 className="higligth-hero-constructora" style={ { color: "#fff", fontSize: "3rem", fontWeight: "400", textAlign: "center", marginTop: "1rem" } }

          >"TE ENTREGAMOS EL LUGAR DONDE CONSTRUIRÁS TUS 
          SUEÑOS Y METAS MÁS DESEADAS”</h2>{/* <p className="subtitle">
            TE ENTREGAMOS EL LUGAR DONDE CONSTRUIRÁS TUS 
            SUEÑOS Y METAS MÁS DESEADAS”
          </p> */}
        </div>
      </section>

      {/* Secciones Comerciales */}
      <FeatureCardGrid features={featuresInmobiliaria} onCardClick={handleClick} />

      

      <Propiedades onCardClick={handlePropertyClick} />
      {/* Listado dinámico de Propiedades en Venta */}
      {/* <PropiedadesPublic onCardClick={handlePropertyClick} /> */}

      {/* Storytelling */}

      

      <StorytellingSection
        stories={[
          {
            img: "https://www.gilmar.es/wp-content/uploads/2022/06/vender-vivienda-de-lujo.jpg",
            text: `Gestionamos Inmuebles: Casas, Departamentos, Dúplex, Locales, Fondos de Comercio, Galpones, Oficinas, Edificios, Terrenos, Campos, Franquicias, Patentes, Cocheras, Propiedades comerciales.`,
          },
          {
            img: "https://fotos.perfil.com/2025/01/16/trim/1280/720/aviglion-1949103.jpg",
            text: "Venta, Alquiler y Alquiler Temporal.",
          },
          {
            img: "https://static.wixstatic.com/media/0483a9_5ef10e44856644e387b0ef764c490a8c~mv2.jpg",
            text: "Localidad y Zona de cobertura.",
          },
          {
            img: "https://comercioyjusticia.info/wp-content/uploads/2025/04/Corredor-inmobiliario.jpg",
            text: "Precios competitivos en todas las zonas.",
          },
          {
            img: "https://infonegocios.info/content/images/2025/04/09/537093/Prestamoshipotecarios-banco-Ciudad.jpg",
            text: "Propiedades desde el menor al mayor precio.",
          },
        ]}
        title="Excelencia en el Mercado Inmobiliario, Soluciones de alto valor para propiedades exclusivas"
      />

<FeatureCardGrid features={featuresServiciosPrestados} onCardClick={handleClick} />
    </div>
  );
};

export default InmobiliariaHero;
