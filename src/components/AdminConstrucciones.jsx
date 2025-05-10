import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin.css';

const API = import.meta.env.VITE_API_URL;

const AdminConstrucciones = ({ construccionEdit, onChange }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    detalle: '',
    metrosCuadrados: '',
    valor: '',
    cantidadAmbientes: '',
    cantidadDormitorios: '',
    cantidadBanios: '',
    formaPago: '',
    condicionesDePago: ''
  });

  const [imagenes, setImagenes] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (construccionEdit) {
      setFormData({
        nombre: construccionEdit.nombre ?? '',
        descripcion: construccionEdit.descripcion ?? '',
        detalle: construccionEdit.detalle ?? '',
        metrosCuadrados: construccionEdit.metrosCuadrados ?? '',
        valor: construccionEdit.valor ?? '',
        cantidadAmbientes: construccionEdit.cantidadAmbientes ?? '',
        cantidadDormitorios: construccionEdit.cantidadDormitorios ?? '',
        cantidadBanios: construccionEdit.cantidadBanios ?? '',
        formaPago: construccionEdit.formaPago ?? '',
        condicionesDePago: construccionEdit.condicionesDePago ?? ''
      });
    }
  }, [construccionEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 15);
    setImagenes(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    // Validación básica de campos
    const requiredFields = [
      'nombre', 'descripcion', 'detalle', 'metrosCuadrados', 'valor',
      'cantidadAmbientes', 'cantidadDormitorios', 'cantidadBanios',
      'formaPago', 'condicionesDePago'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setMensaje(`El campo '${field}' es obligatorio.`);
        return;
      }
    }

    if (!construccionEdit && imagenes.length === 0) {
      setMensaje('Debe subir al menos una imagen.');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    imagenes.forEach(file => data.append('imagenes', file));

    try {
      setLoading(true);
      const endpoint = construccionEdit ? `${API}/api/construcciones/${construccionEdit.id}` : `${API}/api/construcciones`;
      const method = construccionEdit ? 'put' : 'post';
      await axios[method](endpoint, data);
      setMensaje(construccionEdit ? 'Construcción actualizada' : 'Construcción creada correctamente');
      setFormData({
        nombre: '', descripcion: '', detalle: '', metrosCuadrados: '', valor: '',
        cantidadAmbientes: '', cantidadDormitorios: '', cantidadBanios: '',
        formaPago: '', condicionesDePago: ''
      });
      setImagenes([]);
      setPreviewUrls([]);
      if (onChange) onChange();
    } catch (error) {
      console.error(error);
      if (error.response?.data?.error) {
        setMensaje(error.response.data.error);
      } else {
        setMensaje('Error al procesar la construcción. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>{construccionEdit ? 'Editar modelo de construcción' : 'Cargar nuevo modelo de construcción'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="nombre" placeholder="Nombre del modelo" value={formData.nombre} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción breve" value={formData.descripcion} onChange={handleChange}></textarea>
        <textarea name="detalle" placeholder="Detalle completo" value={formData.detalle} onChange={handleChange}></textarea>

        <input type="number" name="metrosCuadrados" placeholder="Metros cuadrados" value={formData.metrosCuadrados} onChange={handleChange} />
        <input type="number" name="valor" placeholder="Valor total" value={formData.valor} onChange={handleChange} />
        <input type="number" name="cantidadAmbientes" placeholder="Cantidad de ambientes" value={formData.cantidadAmbientes} onChange={handleChange} />
        <input type="number" name="cantidadDormitorios" placeholder="Cantidad de dormitorios" value={formData.cantidadDormitorios} onChange={handleChange} />
        <input type="number" name="cantidadBanios" placeholder="Cantidad de baños" value={formData.cantidadBanios} onChange={handleChange} />

        <textarea name="formaPago" placeholder="Forma de pago" value={formData.formaPago} onChange={handleChange}></textarea>
        <textarea name="condicionesDePago" placeholder="Condiciones de pago" value={formData.condicionesDePago} onChange={handleChange}></textarea>

        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
        {previewUrls.length > 0 && (
          <div className="preview-container">
            {previewUrls.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} className="preview-img" />
            ))}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? (construccionEdit ? 'Actualizando...' : 'Subiendo...') : (construccionEdit ? 'Actualizar Modelo' : 'Cargar Modelo')}
        </button>
      </form>
      {mensaje && <p className="admin-mensaje">{mensaje}</p>}
    </div>
  );
};

export default AdminConstrucciones;