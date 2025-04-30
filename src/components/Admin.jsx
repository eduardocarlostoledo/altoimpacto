import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin.css';
const API = import.meta.env.VITE_API_URL;

const tipos = [
  'CASAS', 'DEPARTAMENTOS', 'DUPLEX', 'LOCALES',
  'FONDOS DE COMERCIO', 'GALPONES', 'OFICINAS',
  'EDIFICIOS', 'TERRENOS', 'CAMPOS', 'FRANQUICIAS',
  'PATENTES', 'COCHERAS', 'PROPIEDADES COMERCIALES'
];

const operaciones = ['VENTA', 'ALQUILER', 'ALQUILER TEMPORAL'];

const Admin = ({ propiedadEdit, onChange }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: '',
    operacion: '',
    zona: '',
    descripcion: '',
    precio: ''
  });

  const [imagenes, setImagenes] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (propiedadEdit) {
      setFormData({
        titulo: propiedadEdit.titulo || '',
        tipo: propiedadEdit.tipo || '',
        operacion: propiedadEdit.operacion || '',
        zona: propiedadEdit.zona || '',
        descripcion: propiedadEdit.descripcion || '',
        precio: propiedadEdit.precio || ''
      });

      // preview de imágenes existentes si se desea implementar
      setPreviewUrls(propiedadEdit.imagenes || []);
    }
  }, [propiedadEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 15); // max 15
    setImagenes(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    imagenes.forEach((file) => data.append('imagenes', file));

    try {
      setLoading(true);

      const endpoint = propiedadEdit
        ? `${API}/api/propiedades/${propiedadEdit.id}`
        : `${API}/api/propiedades`;

      const method = propiedadEdit ? 'put' : 'post';

      await axios[method](endpoint, data);

      setMensaje(propiedadEdit ? 'Propiedad actualizada' : 'Propiedad creada correctamente');
      setFormData({ titulo: '', tipo: '', operacion: '', zona: '', descripcion: '', precio: '' });
      setImagenes([]);
      setPreviewUrls([]);
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

        <select className="propiedades-filtros" name="tipo" value={formData.tipo} onChange={handleChange} required>
          <option value="">Seleccione tipo</option>
          {tipos.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>

        <select className="propiedades-filtros" name="operacion" value={formData.operacion} onChange={handleChange} required>
          <option value="">Seleccione operación</option>
          {operaciones.map(op => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>

        <input type="text" name="zona" placeholder="Localidad" value={formData.zona} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange}></textarea>
        <input type="number" name="precio" placeholder="Precio (opcional)" value={formData.precio} onChange={handleChange} />

        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
        {previewUrls.length > 0 && (
          <div className="preview-container">
            {previewUrls.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} className="preview-img" />
            ))}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? (propiedadEdit ? 'Actualizando...' : 'Subiendo...') : (propiedadEdit ? 'Actualizar Propiedad' : 'Cargar Propiedad')}
        </button>
      </form>
      {mensaje && <p className="admin-mensaje">{mensaje}</p>}
    </div>
  );
};

export default Admin;
