
// ✅ PropiedadList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from './Admin';
import '../styles/PropiedadList.css';
const API = import.meta.env.VITE_API_URL;

const PropiedadList = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [editando, setEditando] = useState(null);

  const fetchPropiedades = async () => {
    try {
      const res = await axios.get(`${API}/propiedades`);
      setPropiedades(res.data);
    } catch (err) {
      console.error('Error al obtener propiedades', err);
    }
  };

  useEffect(() => {
    fetchPropiedades();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = window.confirm('¿Estás seguro que deseas eliminar esta propiedad?');
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3001/api/propiedades/${id}`);
      fetchPropiedades();
    } catch (err) {
      console.error('Error al eliminar propiedad', err);
    }
  };

  return (
    <div className="prop-list-container">
      <h2>Listado de Propiedades</h2>
      <div className="admin-form-wrapper">
        <Admin key={editando?.id || 'nuevo'} propiedadEdit={editando} onChange={() => {
          fetchPropiedades();
          setEditando(null);
        }} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Tipo</th>
            <th>Zona</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {propiedades.map((prop) => (
            <tr key={prop.id}>
              <td>{prop.id}</td>
              <td>{prop.titulo}</td>
              <td>{prop.tipo}</td>
              <td>{prop.zona}</td>
              <td>{prop.precio ? `$${prop.precio}` : 'Consultar'}</td>
              <td>
                <button onClick={() => setEditando(prop)}>Editar</button>
                <button className="delete-btn" onClick={() => handleDelete(prop.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropiedadList;
