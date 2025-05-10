// src/components/PlanesPublic.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PlanesPublic.css';

const API = import.meta.env.VITE_API_URL;

const PlanesPublic = () => {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const res = await axios.get(`${API}/api/planes`);
        setPlanes(res.data || []);
      } catch (err) {
        console.error('Error al cargar planes', err);
      }
    };

    fetchPlanes();
  }, []);

  return (
    <section className="planes-section">
      <h2 className="planes-title">Planes de Vivienda</h2>
      <div className="planes-grid">
        {planes.map(plan => (
          <div key={plan.id} className="plan-card">
            {plan.imagenes?.[0]?.url && (
              <img
                src={plan.imagenes[0].url}
                alt={`Imagen del plan ${plan.nombre}`}
                className="plan-img"
              />
            )}
            <div className="plan-content">
              <h3 className="plan-nombre">{plan.nombre}</h3>
              <p className="plan-descripcion">{plan.descripcion?.slice(0, 100)}...</p>
              <p className="plan-precio">
                {plan.precio ? `$${plan.precio.toLocaleString('es-AR')}` : 'Consultar'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlanesPublic;
