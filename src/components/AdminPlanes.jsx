import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin.css';

const API = import.meta.env.VITE_API_URL;
const tiposPlan = ['CLÁSICO', 'PLUS', 'FAMILIAR', 'EXPRESS', 'JÓVENES', 'EMPRESAS'];

const AdminPlanes = ({ planEdit, onChange }) => {
  const [formData, setFormData] = useState({
    plan: '',
    codigo: '',
    descripcion: '',
    detalle: '',
    valorNeto: '',
    valorCuota: '',
    tipoPlan: '',
    duracionMeses: ''
  });

  const [imagenes, setImagenes] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (planEdit) {
      setFormData({
        plan: planEdit.plan ?? '',
        codigo: planEdit.codigo ?? '',
        descripcion: planEdit.descripcion ?? '',
        detalle: planEdit.detalle ?? '',
        valorNeto: planEdit.valorNeto ?? '',
        valorCuota: planEdit.valorCuota ?? '',
        tipoPlan: planEdit.tipoPlan ?? '',
        duracionMeses: planEdit.duracionMeses ?? ''
      });
    }
  }, [planEdit]);

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
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    imagenes.forEach(file => data.append('imagenes', file));

    try {
      setLoading(true);
      const endpoint = planEdit ? `${API}/api/planes/${planEdit.id}` : `${API}/api/planes`;
      const method = planEdit ? 'put' : 'post';
      await axios[method](endpoint, data);
      setMensaje(planEdit ? 'Plan actualizado' : 'Plan creado correctamente');
      setFormData({ plan: '', codigo: '', descripcion: '', detalle: '', valorNeto: '', valorCuota: '', tipoPlan: '', duracionMeses: '' });
      setImagenes([]);
      setPreviewUrls([]);
      if (onChange) onChange();
    } catch (error) {
      console.error(error);
      setMensaje('Error al procesar el plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>{planEdit ? 'Editar plan de vivienda' : 'Cargar nuevo plan de vivienda'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="plan" placeholder="Nombre del plan" value={formData.plan} onChange={handleChange} required />
        <input type="text" name="codigo" placeholder="Código del plan" value={formData.codigo} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción breve" value={formData.descripcion} onChange={handleChange}></textarea>
        <textarea name="detalle" placeholder="Detalle completo" value={formData.detalle} onChange={handleChange}></textarea>

        <input type="number" name="valorNeto" placeholder="Valor total del plan" value={formData.valorNeto} onChange={handleChange} />
        <input type="number" name="valorCuota" placeholder="Valor de la cuota mensual" value={formData.valorCuota} onChange={handleChange} />
        <input type="number" name="duracionMeses" placeholder="Duración en meses" value={formData.duracionMeses} onChange={handleChange} />

        <select name="tipoPlan" value={formData.tipoPlan} onChange={handleChange} required>
          <option value="">Seleccione tipo de plan</option>
          {tiposPlan.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>

        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
        {previewUrls.length > 0 && (
          <div className="preview-container">
            {previewUrls.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} className="preview-img" />
            ))}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? (planEdit ? 'Actualizando...' : 'Subiendo...') : (planEdit ? 'Actualizar Plan' : 'Cargar Plan')}
        </button>
      </form>
      {mensaje && <p className="admin-mensaje">{mensaje}</p>}
    </div>
  );
};

export default AdminPlanes;
