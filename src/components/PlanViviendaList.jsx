import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AdminPlanes from './AdminPlanes.jsx';
import AdminConstrucciones from './AdminConstrucciones.jsx';
import '../styles/PropiedadList.css';

const API = import.meta.env.VITE_API_URL;

const PlanViviendaList = () => {
  const [planes, setPlanes] = useState([]);
  const [construcciones, setConstrucciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editandoPlanes, setEditandoPlanes] = useState(null);
  const [editandoConstrucciones, setEditandoConstrucciones] = useState(null);
  const [formKeyPlanes, setFormKeyPlanes] = useState(Date.now());
  const [formKeyConstrucciones, setFormKeyConstrucciones] = useState(Date.now());
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

  const fetchConstrucciones = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/construcciones`);
      setConstrucciones(res.data.construcciones || []);
    } catch (err) {
      console.error('Error al obtener modelos de construcción', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanes();
    fetchConstrucciones();
  }, []);

  const handleDeletePlanes = async (id) => {
    const confirmar = window.confirm('¿Estás seguro que deseas eliminar este plan?');
    if (!confirmar) return;

    try {
      await axios.delete(`${API}/api/planes/${id}`);
      fetchPlanes();
    } catch (err) {
      console.error('Error al eliminar plan', err);
    }
  };

  const handleDeleteConstrucciones = async (id) => {
    const confirmar = window.confirm('¿Estás seguro que deseas eliminar este modelo de construcción?');
    if (!confirmar) return;

    try {
      await axios.delete(`${API}/api/construcciones/${id}`);
      fetchConstrucciones();
    } catch (err) {
      console.error('Error al eliminar modelo', err);
    }
  };

  return (
    <div className="prop-list-container">
      <h2>Planes de Vivienda y Modelos de Construcción Cargados</h2>

      <div className="admin-form-wrapper" ref={adminRef}>
        <AdminPlanes
          key={formKeyPlanes}
          planEdit={editandoPlanes}
          onChange={() => {
            fetchPlanes();
            setFormKeyPlanes(Date.now());
          }}
        />
      </div>

      <div className="admin-form-wrapper" ref={adminRef}>
        <AdminConstrucciones
          key={formKeyConstrucciones}
          construccionEdit={editandoConstrucciones}
          onChange={() => {
            fetchConstrucciones();
            setFormKeyConstrucciones(Date.now());
          }}
        />
      </div>

      {loading ? (
        <p>Cargando información...</p>
      ) : (
        <>
          <h3>Planes de Vivienda</h3>
          {planes.length > 0 ? (
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
                          setEditandoPlanes(plan);
                          setTimeout(() => {
                            adminRef.current?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}>
                          Editar
                        </button>
                        <button className="delete-btn" onClick={() => handleDeletePlanes(plan.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: 'center', marginTop: '2rem' }}>No se han cargado planes todavía.</p>
          )}

          <h3>Modelos de Construcción</h3>
          {construcciones.length > 0 ? (
            <div className="grupo-operacion">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Valor</th>
                    <th>Imagenes</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {construcciones.map(modelo => (
                    <tr key={modelo.id}>
                      <td>{modelo.id}</td>
                      <td>{modelo.nombre}</td>
                      <td>{modelo.descripcion?.slice(0, 60)}...</td>
                      <td>{modelo.valor ? `$${modelo.valor}` : 'Consultar'}</td>
                      <td>
                        {modelo.imagenes?.length > 0 ? (
                          <img src={modelo.imagenes[0]} alt="img" style={{ width: '60px', borderRadius: '5px' }} />
                        ) : '—'}
                      </td>
                      <td>
                        <button onClick={() => {
                          setEditandoConstrucciones(modelo);
                          setTimeout(() => {
                            adminRef.current?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}>
                          Editar
                        </button>
                        <button className="delete-btn" onClick={() => handleDeleteConstrucciones(modelo.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: 'center', marginTop: '2rem' }}>No se han cargado modelos todavía.</p>
          )}
        </>
      )}
    </div>
  );
};

export default PlanViviendaList;
