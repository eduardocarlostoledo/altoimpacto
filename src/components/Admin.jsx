// ✅ Admin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin.css';

const Admin = ({ propiedadEdit, onChange }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: '',
    zona: '',
    descripcion: '',
    precio: ''
  });
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (propiedadEdit) {
      setFormData({
        titulo: propiedadEdit.titulo || '',
        tipo: propiedadEdit.tipo || '',
        zona: propiedadEdit.zona || '',
        descripcion: propiedadEdit.descripcion || '',
        precio: propiedadEdit.precio || ''
      });
    }
  }, [propiedadEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imagen) data.append('imagen', imagen);

    try {
      setLoading(true);

      const endpoint = propiedadEdit
        ? `http://localhost:3001/api/propiedades/${propiedadEdit.id}`
        : `http://localhost:3001/api/propiedades`;

      const method = propiedadEdit ? 'put' : 'post';

      await axios[method](endpoint, data);

      setMensaje(propiedadEdit ? 'Propiedad actualizada' : 'Propiedad creada correctamente');
      setFormData({ titulo: '', tipo: '', zona: '', descripcion: '', precio: '' });
      setImagen(null);
      if (onChange) onChange();
    } catch (error) {
      setMensaje('Error al procesar la propiedad');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>{propiedadEdit ? 'Editar propiedad' : 'Cargar nueva propiedad'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="titulo" placeholder="Título" value={formData.titulo} onChange={handleChange} required />
        <input type="text" name="tipo" placeholder="Tipo (casa, depto...)" value={formData.tipo} onChange={handleChange} required />
        <input type="text" name="zona" placeholder="Zona (centro, oeste...)" value={formData.zona} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange}></textarea>
        <input type="number" name="precio" placeholder="Precio (opcional)" value={formData.precio} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" disabled={loading}>
          {loading ? (propiedadEdit ? 'Actualizando...' : 'Subiendo...') : (propiedadEdit ? 'Actualizar Propiedad' : 'Cargar Propiedad')}
        </button>
      </form>
      {mensaje && <p className="admin-mensaje">{mensaje}</p>}
    </div>
  );
};

export default Admin;