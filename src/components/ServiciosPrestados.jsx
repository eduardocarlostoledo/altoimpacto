import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ServiciosPrestados.css';

const ServiciosPrestados = ({ mensajePrincipal, servicios }) => {
  return (
    <section className="servicios-section">
      <motion.h2 
        className="servicios-title"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {mensajePrincipal}
      </motion.h2>

      <div className="servicios-grid">
        {servicios.map((item, index) => (
          <motion.div
            key={index}
            className="servicio-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="servicio-nombre">{item.titulo}</h3>
            <ul className="servicio-lista">
              {item.detalles.map((detalle, idx) => (
                <li key={idx}>{detalle}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiciosPrestados;
