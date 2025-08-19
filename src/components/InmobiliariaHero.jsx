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
import inmobiliaria4 from "../img/Corredor-inmobiliario.jpg";
import inmo1 from "../img/inmo1.jpg";
import inmo2 from "../img/inmo2.jpg";
import inmo3 from "../img/inmo3.jpg";
import inmo5 from "../img/inmo5.jpg";
import features1 from "../img/features1.webp";
import features2 from "../img/features2.webp";
import features3 from "../img/features3.webp";
import inmo7 from "../img/inmo7.jpg";

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
    image: features1,
    title: "Inmuebles Disponibles",
    description: "Casas, Departamentos, Dúplex, Locales, Fondos de comercio, Galpones, Oficinas, Edificios, Terrenos, Campos, Franquicias, Patentes, Cocheras, Propiedades Comerciales y Proyectos Especiales",
  },
  {
    image: features2,
    title: "Modalidades de Operación",
    description: "Venta, Alquiler, Alquiler temporal",
  },
  {
    image: inmo7,
    title: "Cobertura Geográfica",
    description: "Localidades urbanas y suburbanas, Barrios cerrados y zonas rurales, Zonas estratégicas para inversión inmobiliaria",
  },
  {
    image: features3,
    title: "Segmentación de Precios",
    description: "Propiedades por rango de precio, Filtrado desde menor a mayor valor, Accesibles y de alta gama",
  },
];

gsap.registerPlugin(gsap.ScrollTrigger);

const InmobiliariaHero = () => {
  const navigate = useNavigate();


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
          <h2 className="higligth-hero-constructora" 
          

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
            img: inmo1,
            text: `Gestionamos Inmuebles: Casas, Departamentos, Dúplex, Locales, Fondos de Comercio, Galpones, Oficinas, Edificios, Terrenos, Campos, Franquicias, Patentes, Cocheras, Propiedades Comerciales y Proyectos Especiales.`,
          },
          {
            img: inmo2,
            text: "Venta, Alquiler y Alquiler Temporal.",
          },
          {
            img: inmo3,
            text: "Localidad y Zona de cobertura.",
          },
          {
            img: inmobiliaria4, //asd
            text: "Precios competitivos en todas las zonas.",
          },
          {
            img: inmo5,
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
