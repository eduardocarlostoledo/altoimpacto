import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import '../styles/DetallePropiedad.css';
const API = import.meta.env.VITE_API_URL;
const DetallePropiedad = () => {
  
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropiedad = async () => {
      try {
        const res = await axios.get(`${API}/api/propiedades/${id}`);
        setPropiedad(res.data);
      } catch (err) {
        console.error('Error al obtener propiedad', err);
        setError('No se encontró la propiedad');
      }
    };

    fetchPropiedad();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!propiedad) return <p>Cargando propiedad...</p>;

  // ✅ Ahora sí, después de tener propiedad https://wa.me/542216146117
  const whatsappLink = `https://wa.me/542216146117?text=Hola! Estoy interesado en la propiedad: ${encodeURIComponent(propiedad.titulo)}`;

  return (
    <div className="detalle-propiedad-container">
      <Helmet>
        <title>{propiedad.titulo} | Global Home Group</title>
        <meta name="description" content={propiedad.descripcion?.slice(0, 150)} />
      </Helmet>

      <div className="galeria-imagenes">
  {propiedad.imagenes?.map((img, index) => (
    <img key={index} src={img} alt={`Imagen ${index + 1}`} className="detalle-imagen" />
  ))}
</div>
      <h1>{propiedad.titulo}</h1>
      <h2>{propiedad.tipo} en {propiedad.zona}</h2>
      <p>{propiedad.descripcion}</p>
      {propiedad.precio && <h3>Precio: U$S {propiedad.precio}</h3>}

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
        <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
          <path d="M12 0a12 12 0 0 0-10.26 17.94L0 24l6.3-1.65A12 12 0 1 0 12 0zm.06 21.6a9.56 9.56 0 0 1-4.89-1.34l-.35-.2-3.73.98.99-3.63-.23-.37A9.58 9.58 0 1 1 21.6 12a9.6 9.6 0 0 1-9.54 9.6zM17 14.27c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.63.14-.73.9-.9 1.08-.33.2-.61.07a7.89 7.89 0 0 1-2.3-1.44 8.6 8.6 0 0 1-1.57-1.93c-.16-.28 0-.43.12-.57s.28-.33.42-.5a1.9 1.9 0 0 0 .28-.47c.1-.23 0-.43 0-.57s-.63-1.53-.86-2.1-.46-.5-.63-.5h-.53a1 1 0 0 0-.73.34 3 3 0 0 0-.94 2.2c0 1.3.94 2.57 1.07 2.75a10.26 10.26 0 0 0 4.23 3.5c.59.26 1.05.42 1.41.53a3.37 3.37 0 0 0 1.54.1 2.58 2.58 0 0 0 1.68-1.2c.2-.33.2-.6.14-.66s-.27-.15-.54-.28z"/>
        </svg>
        Contactar por WhatsApp
      </a>
    </div>
  );
};

export default DetallePropiedad;
