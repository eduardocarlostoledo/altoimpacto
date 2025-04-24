// ✅ 10. InmobiliariaHero.jsx con imágenes integradas en tarjetas

import React, { useEffect } from "react";
import { gsap } from "gsap";
import "../styles/InmobiliariaHero.css";
import StorytellingSection from "./StorytellingSection";
import { div } from "framer-motion/client";
import FeatureCardGrid from "./FeatureCardGrid.jsx";
import PropertyModal from "./PropertyModal";
import inmobiliariaft1 from "../img/inmobiliariahero.jpg";
import inmobiliariaft2 from "../img/inmobiliariahero2.jpg";
import inmobiliariaft3 from "../img/inmobiliariahero3.jpg";


const featuresPropiedadesEnVenta = [
  {
    image: "https://www.xn--miopropiedades-rnb.com/images/Propiedad-en-venta-1-1.png", // Reemplacé por una imagen directa del sitio
    title: "Casa moderna en barrio residencial",
    description: "3 habitaciones, 2 baños, cochera doble y patio amplio. Ideal para familias.",
  },
  {
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_687053-MLA69458539812_052023-O.webp",
    title: "Departamento céntrico con balcón",
    description: "Ubicado en el corazón de la ciudad. 2 ambientes, ideal inversión.",
  },
  {
    image: "https://imgar.zonapropcdn.com/avisos/1/00/53/82/13/44/360x266/1915176985.jpg?isFirstImage=true",
    title: "PH con patio y entrada independiente",
    description: "Ambientes luminosos, sin expensas. Zona residencial tranquila.",
  },
  {
    image: "https://static1.sosiva451.com/28956561/9b4b0fc9-680a-40b3-a601-6d2f0b40bd4d_u_small.jpg",
    title: "Dúplex de categoría con jardín",
    description: "Construcción reciente. Cocina integrada, 2 baños, patio parquizado.",
  },
  {
    image: "https://inmobiliariamarcon.com.ar/wp-content/uploads/2019/07/Inmobiliaria-Marc%C3%B3n-Casa-en-venta-en-Posadas-Calle-Rivadavia-Zona-Centro.jpg",
    title: "Casa estilo colonial en el centro",
    description: "Amplia propiedad ideal para uso comercial o vivienda. Excelente ubicación.",
  },
  {
    image: "https://d1v2p1s05qqabi.cloudfront.net/14934240/conversions/1744054332-thumbnail.webp",
    title: "Propiedad premium con pileta",
    description: "5 ambientes, quincho y pileta. Lista para habitar en zona residencial.",
  },
];

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
    image: "https://i0.wp.com/aldiaargentina.microjuris.com/wp-content/uploads/2017/10/shutterstock_675338449.jpg?fit=3360%2C2400&ssl=1",
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
  

  return (
    <div>
      <section className="inmobiliaria-hero">
        <div className="inmobiliaria-hero-overlay"></div>
        <div className="inmobiliaria-hero-content">
          <h1>
            <span className="highlight">NOSOTROS </span> NO ENCONTRAMOS TU CASA
          </h1>
          <p className="subtitle">
          TE ENTREGAMOS EL LUGAR DONDE CONSTRUIRAS TUS 
          SUEÑOS Y METAS MAS DESEADAS”  
          </p>
        </div>
      </section>

      <FeatureCardGrid features={featuresInmobiliaria} onCardClick={handleClick}/>
      <FeatureCardGrid features={featuresServiciosPrestados} onCardClick={handleClick}/>
      <FeatureCardGrid features={featuresPropiedadesEnVenta} onCardClick={handleClick}/>


      <div>
        <StorytellingSection
          stories={[
            {
              img: "https://www.gilmar.es/wp-content/uploads/2022/06/vender-vivienda-de-lujo.jpg",
              text: `Gestionamos Inmuebbles: CASAS, DEPARTAMENTOS, DUPLEX, LOCALES, FONDOS DE COMERCIO, 
GALPONES, LOCALES, OFICINAS, EDIFICIOS, TERRENOS, CAMPOS, FRANQUICIAS, PATENTES, COCHERAS, PROPIEDADES COMERCIALES `,
            },

            {
              img: "https://fotos.perfil.com/2025/01/16/trim/1280/720/aviglion-1949103.jpg",
              text: "VENTA, ALQUILER, ALQUILER TEMPORAL. ",
            },
            {
              img: "https://static.wixstatic.com/media/0483a9_5ef10e44856644e387b0ef764c490a8c~mv2.jpg/v1/fill/w_980,h_676,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0483a9_5ef10e44856644e387b0ef764c490a8c~mv2.jpg",
              text: "LOCALIDAD.",
            },

            {
              img: "https://comercioyjusticia.info/wp-content/uploads/2025/04/Corredor-inmobiliario.jpg",
              text: "PRECIO.",
            },

            {
              img: "https://infonegocios.info/content/images/2025/04/09/537093/Prestamoshipotecarios-banco-Ciudad.jpg",
              text: "MENOR PRECIO - MAYOR PRECIO.",
            },
          ]}
          title="Excelencia en el Mercado Inmobiliario, Soluciones de alto valor para propiedades exclusivas"
        />

        
      </div>
    </div>
  );
};

export default InmobiliariaHero;
