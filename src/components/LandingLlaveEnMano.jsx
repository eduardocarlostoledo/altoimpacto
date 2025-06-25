import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/LandingLlaveEnMano.css";

const API = import.meta.env.VITE_API_URL;

const LandingLlaveEnMano = () => {
  const [modelos, setModelos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const urlActual = window.location.href;
  const mensaje = `Hola! Estoy interesado en el modelo de construcción llave en mano que vi en: ${urlActual}`;
  const whatsappLink = `https://wa.me/542216146117?text=${encodeURIComponent(mensaje)}`;

  useEffect(() => {
    const fetchConstrucciones = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/construcciones`);
        setModelos(res.data.construcciones || []);
      } catch (err) {
        console.error("Error al obtener modelos de construcción", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConstrucciones();
  }, []);

  // Rotación automática del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % modelos.length);
    }, 5000); // cambia cada 5 segundos
    return () => clearInterval(interval);
  }, [modelos]);

  return (
    <section className="landing-container">
      <header className="landing-header">
        <h1>Construcción Llave en Mano</h1>
        <p>
          Tu casa propia por <strong>USD 800/m²</strong> Posibilidad de entrega del 50% y hasta{" "}
          <strong>120 cuotas</strong>. ¡Empezá hoy!
        </p>
      </header>

      <div className="landing-grid">
        <div className="info-panel">
          <h2>¿Por qué elegirnos?</h2>
          <ul>
            <li>✔️  5 modelos elegantes y modernos  diferentes con materiales sustentables.</li>
            <li>✔️ 60 cuotas en dólares c anticipo del 50 %.</li>
            <li>✔️ Construcción llave en mano, te olvidas de todo...</li>
            <li>✔️ El mejor precio del mercado en relación precio calidad, U$800 el mts2 llave en mano...</li>
            <li>✔️ Si no contas con terreno, despreocúpate, nosotros nos encargamos!!!!.</li>
          </ul>
          <a
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

        <div className="carousel-wrapper">
          {loading ? (
            <p>Cargando modelos...</p>
          ) : (
            <AnimatePresence mode="wait">
              {modelos.length > 0 && (
                <motion.div
                  key={modelos[activeIndex].id}
                  className="carousel-card"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => navigate(`/construcciones/${modelos[activeIndex].id}`)}
                >
                  <img
                    src={modelos[activeIndex].imagenes?.[0] || "/placeholder.jpg"}
                    alt={modelos[activeIndex].nombre}
                    className="carousel-img"
                  />
                  <div className="carousel-info">
                    <h3>{modelos[activeIndex].nombre}</h3>
                    <p>
                      {modelos[activeIndex].metrosCuadrados} m² |{" "}
                      {modelos[activeIndex].cantidadAmbientes} amb.
                    </p>
                    <p>
                      🛏 {modelos[activeIndex].cantidadDormitorios} | 🛁{" "}
                      {modelos[activeIndex].cantidadBanios}
                    </p>
                    <p className="precio">USD {modelos[activeIndex].valor}</p>
                    <p className="desc">
                      {modelos[activeIndex].detalle?.slice(0, 90)}...
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};

export default LandingLlaveEnMano;
