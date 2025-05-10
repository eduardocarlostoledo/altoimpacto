// ✅ Construcciones.jsx - listado público de modelos constructivos estilo tarjetas
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PropiedadesPublic.css';

const API = import.meta.env.VITE_API_URL;

const Construcciones = () => {
  const navigate = useNavigate();
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchConstrucciones = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/construcciones`);
        setModelos(res.data.construcciones || []);
      } catch (err) {
        console.error('Error al obtener modelos de construcción', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConstrucciones();
  }, []);

  return (
    <section className="propiedades-section">
      <h2>Modelos de Construcción Disponibles</h2>

      {loading ? (
        <div className="spinner"></div>
      ) : modelos.length === 0 ? (
        <div className="sin-resultados">
          <p>No hay modelos disponibles por el momento.</p>
        </div>
      ) : (
        <div className="propiedades-grid">
          {modelos.map((modelo) => (
            <div
              key={modelo.id}
              className="prop-card"
              onClick={() => navigate(`/construcciones/${modelo.id}`)}
            >
              <img
                src={modelo.imagenes?.[0] || '/placeholder.jpg'}
                alt={modelo.nombre}
                className="prop-img"
              />
              <div className="prop-info">
                <h3>{modelo.nombre}</h3>
                <p className="tipo-zona">{modelo.metrosCuadrados} m² - {modelo.cantidadAmbientes} ambientes</p>
                <p className="desc">{modelo.descripcion?.slice(0, 100)}...</p>
                <p className="precio">Valor: ${modelo.valor}</p>
                <p className="precio">Dormitorios: {modelo.cantidadDormitorios} | Baños: {modelo.cantidadBanios}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Construcciones;
