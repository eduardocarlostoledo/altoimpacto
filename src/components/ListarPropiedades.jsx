// ✅ PropiedadList.jsx administración de propiedades
import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import Admin from './Admin';
import '../styles/PropiedadList.css';
import GeorefLocationSelector from './GeorefLocationSelector';
const API = import.meta.env.VITE_API_URL;

const tiposPropiedad = [
  'CASAS', 'DEPARTAMENTOS', 'DUPLEX', 'LOCALES', 'FONDOS DE COMERCIO',
  'GALPONES', 'OFICINAS', 'EDIFICIOS', 'TERRENOS', 'CAMPOS', 'FRANQUICIAS',
  'PATENTES', 'COCHERAS', 'PROPIEDADES COMERCIALES', "PROYECTOS ESPECIALES",
];

const tiposOperacion = ['VENTA', 'ALQUILER', 'ALQUILER TEMPORAL'];




const PropiedadList = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [editando, setEditando] = useState(null);
  const adminRef = useRef(null);

  const [filtros, setFiltros] = useState({
    tipo: '',
    operacion: '',
    zona_provincia: '',
    zona_municipio: '',
    zona_localidad: '',
  });
  

  const fetchPropiedades = async () => {
    try {
      const query = new URLSearchParams();
      if (filtros.tipo) query.append('tipo', filtros.tipo);
      if (filtros.operacion) query.append('operacion', filtros.operacion);
      if (filtros.zona_provincia) query.append('zona_provincia', filtros.zona_provincia);
      if (filtros.zona_municipio) query.append('zona_municipio', filtros.zona_municipio);
      if (filtros.zona_localidad) query.append('zona_localidad', filtros.zona_localidad);
  
      const res = await axios.get(`${API}/api/propiedades/filtros?${query.toString()}`);
      setPropiedades(res.data.propiedades || []);
    } catch (err) {
      console.error('Error al obtener propiedades', err);
    }
  };
  

  useEffect(() => {
    fetchPropiedades();
  }, [filtros]);

  const handleDelete = async (id) => {
    const confirmar = window.confirm('¿Estás seguro que deseas eliminar esta propiedad?');
    if (!confirmar) return;

    try {
      await axios.delete(`${API}/api/propiedades/${id}`);
      fetchPropiedades();
    } catch (err) {
      console.error('Error al eliminar propiedad', err);
    }
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const propiedadesAgrupadas = tiposOperacion.map(op => ({
    operacion: op,
    propiedades: propiedades.filter(p => p.operacion?.toUpperCase() === op)

  })).filter(grupo => grupo.propiedades.length > 0);

  return (
    <div className="prop-list-container">
      <h2>Listado de Propiedades</h2>
      <h2>Filtrar usando los selects</h2>

      <div className="filtros-admin">
        <select className="filtro-select" name="tipo" value={filtros.tipo} onChange={handleFiltroChange}>
          <option value="">-- Tipo de Propiedad --</option>
          {tiposPropiedad.map((tipo, idx) => (
            <option key={idx} value={tipo}>{tipo}</option>
          ))}
        </select>

        <select className="filtro-select" name="operacion" value={filtros.operacion} onChange={handleFiltroChange}>
          <option value="">-- Tipo de Operación --</option>
          {tiposOperacion.map((op, idx) => (
            <option key={idx} value={op}>{op}</option>
          ))}
        </select>

        <GeorefLocationSelector
  onChange={({ provincia, municipio, localidad }) => {
    setFiltros((prev) => ({
      ...prev,
      zona_provincia: provincia || '',
      zona_municipio: municipio || '',
      zona_localidad: localidad || '',
    }));
  }}
/>




      </div>

      <div className="admin-form-wrapper" ref={adminRef}>
        <Admin
          key={editando?.id || 'nuevo'}
          propiedadEdit={editando}
          onChange={() => {
            fetchPropiedades();
            setEditando(null);
          }}
        />
      </div>

      {propiedadesAgrupadas.length > 0 ? (
        propiedadesAgrupadas.map(({ operacion, propiedades }) => (
          <div key={operacion} className="grupo-operacion">
            <h3>{operacion}</h3>
            <table>
              <thead>
                
                <tr>
  <th>ID</th>
  <th>Título</th>
  <th>Tipo</th>
  <th>Operación</th>
  <th>Provincia</th>
<th>Municipio</th>
<th>Localidad</th>

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
                    <td>{prop.operacion}</td>
                    
                    <td>{prop.zona_provincia || ''}</td>
<td>{prop.zona_municipio || ''}</td>
<td>{prop.zona_localidad || ''}</td>



                    <td>{prop.precio ? `$${prop.precio}` : 'Consultar'}</td>
                    <td>
                    <button onClick={() => {
  setEditando(prop);
  setTimeout(() => {
    adminRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, 100); // delay breve para asegurar montaje
}}>
  Editar
</button>

                      <button className="delete-btn" onClick={() => handleDelete(prop.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          No se encontraron propiedades con los filtros seleccionados.
        </p>
      )}
    </div>
  );
};

export default PropiedadList;
