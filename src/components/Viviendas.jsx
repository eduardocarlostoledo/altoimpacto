// ✅ Viviendas.jsx - listado de planes de vivienda estilo tarjetas tipo Propiedades
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PropiedadesPublic.css';

const API = import.meta.env.VITE_API_URL;

const Viviendas = () => {
  const navigate = useNavigate();
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPlanes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/planes`);
        setPlanes(res.data.planes || []);
      } catch (err) {
        console.error('Error al obtener planes de vivienda', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanes();
  }, []);

  return (
    <section className="propiedades-section">
      <h2>Planes de Vivienda Disponibles</h2>

      {loading ? (
        <div className="spinner"></div>
      ) : planes.length === 0 ? (
        <div className="sin-resultados">
          <p>No hay planes disponibles por el momento.</p>
        </div>
      ) : (
        <div className="propiedades-grid">
          {planes.map((plan) => (
            <div
              key={plan.id}
              className="prop-card"
              onClick={() => navigate(`/planes/${plan.id}`)}
            >
              <img
                src={plan.imagenDestacada || '/placeholder.jpg'}
                alt={plan.plan}
                className="prop-img"
              />
              <div className="prop-info">
                <h3>{plan.plan}</h3>
                <p className="tipo-zona">Tipo: {plan.tipoPlan}</p>
                <p className="desc">{plan.descripcion?.slice(0, 100)}...</p>
                <p className="precio">Total: ${plan.valorNeto}</p>
                <p className="precio">Cuota: ${plan.valorCuota} x {plan.duracionMeses} meses</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Viviendas;
