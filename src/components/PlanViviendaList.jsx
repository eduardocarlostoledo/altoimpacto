import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AdminPlanes from './AdminPlanes.jsx';
import '../styles/PropiedadList.css';

const API = import.meta.env.VITE_API_URL;

const PlanViviendaList = () => {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(null);
  const adminRef = useRef(null);

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

  useEffect(() => {
    fetchPlanes();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = window.confirm('¿Estás seguro que deseas eliminar este plan?');
    if (!confirmar) return;

    try {
      await axios.delete(`${API}/api/planes/${id}`);
      fetchPlanes();
    } catch (err) {
      console.error('Error al eliminar plan', err);
    }
  };

  return (
    <div className="prop-list-container">
      <h2>Planes de Vivienda Cargados</h2>

      <div className="admin-form-wrapper" ref={adminRef}>
        <AdminPlanes
          key={editando?.id || 'nuevo'}
          planEdit={editando}
          onChange={() => {
            fetchPlanes();
            setEditando(null);
          }}
        />
      </div>

      {loading ? (
        <p>Cargando planes...</p>
      ) : planes.length > 0 ? (
        <div className="grupo-operacion">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Imagenes</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {planes.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.id}</td>
                  <td>{plan.plan}</td>
                  <td>{plan.descripcion?.slice(0, 60)}...</td>
                  <td>{plan.valorNeto ? `$${plan.valorNeto}` : 'Consultar'}</td>
                  <td>
                    {plan.imagenes?.length > 0 ? (
                      <img src={plan.imagenes[0]} alt="img" style={{ width: '60px', borderRadius: '5px' }} />
                    ) : '—'}
                  </td>
                  <td>
                    <button onClick={() => {
                      setEditando(plan);
                      setTimeout(() => {
                        adminRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}>
                      Editar
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(plan.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          No se han cargado planes todavía.
        </p>
      )}
    </div>
  );
};

export default PlanViviendaList;
