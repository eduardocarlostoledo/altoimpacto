import React, { useState, useEffect } from "react";
import axios from "axios";
import GeorefLocationSelector from "./GeorefLocationSelector.jsx";
import "../styles/Admin.css";

const API = import.meta.env.VITE_API_URL;

const tipos = [
  "CASAS",
  "DEPARTAMENTOS",
  "DUPLEX",
  "LOCALES",
  "FONDOS DE COMERCIO",
  "GALPONES",
  "OFICINAS",
  "EDIFICIOS",
  "TERRENOS",
  "CAMPOS",
  "FRANQUICIAS",
  "PATENTES",
  "COCHERAS",
  "PROPIEDADES COMERCIALES",
  "PROYECTOS ESPECIALES",
];

const operaciones = ["VENTA", "ALQUILER", "ALQUILER TEMPORAL"];

const Admin = ({ propiedadEdit, onChange }) => {
  const [formData, setFormData] = useState({
    titulo: "", tipo: "", operacion: "",
    zona_provincia: "", zona_municipio: "", zona_localidad: "",
    descripcion: "", precio: ""
  });

  const [locationValues, setLocationValues] = useState({
    provincia: "", municipio: "", localidad: ""
  });

  const [imagenes, setImagenes] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (propiedadEdit) {
      setFormData({
        titulo: propiedadEdit.titulo ?? "", tipo: propiedadEdit.tipo ?? "",
        operacion: propiedadEdit.operacion ?? "",
        zona_provincia: propiedadEdit.zona_provincia ?? "",
        zona_municipio: propiedadEdit.zona_municipio ?? "",
        zona_localidad: propiedadEdit.zona_localidad ?? "",
        descripcion: propiedadEdit.descripcion ?? "", precio: propiedadEdit.precio ?? ""
      });
      setLocationValues({
        provincia: propiedadEdit.zona_provincia ?? '',
        municipio: propiedadEdit.zona_municipio ?? '',
        localidad: propiedadEdit.zona_localidad ?? ''
      });
    }
  }, [propiedadEdit]);

  const handleGeorefChange = ({ provincia, municipio, localidad }) => {
    setFormData(prev => ({
      ...prev,
      zona_provincia: provincia,
      zona_municipio: municipio,
      zona_localidad: localidad,
    }));
    setLocationValues({ provincia, municipio, localidad });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files).slice(0, 15);
    setImagenes(files);
    setPreviewUrls(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje("");

    // Validación de campos requeridos
    const camposObligatorios = ["titulo", "tipo", "operacion", "zona_provincia", "zona_municipio", "zona_localidad"];
    for (let campo of camposObligatorios) {
      if (!formData[campo]) {
        setMensaje(`El campo '${campo}' es obligatorio.`);
        return;
      }
    }

    if (!propiedadEdit && imagenes.length === 0) {
      setMensaje("Debe subir al menos una imagen.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    imagenes.forEach(file => data.append("imagenes", file));

    try {
      setLoading(true);
      const endpoint = propiedadEdit
        ? `${API}/api/propiedades/${propiedadEdit.id}`
        : `${API}/api/propiedades`;

      const method = propiedadEdit ? "put" : "post";

      await axios({
        method,
        url: endpoint,
        data,
        headers: { "Content-Type": "multipart/form-data" }
      });

      setMensaje(propiedadEdit ? "Propiedad actualizada" : "Propiedad creada correctamente");
      setFormData({
        titulo: "", tipo: "", operacion: "",
        zona_provincia: "", zona_municipio: "", zona_localidad: "",
        descripcion: "", precio: ""
      });
      setImagenes([]);
      setPreviewUrls([]);
      if (onChange) onChange();
    } catch (err) {
      console.error(err);
      setMensaje("Error al procesar la propiedad. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>{propiedadEdit ? "Editar propiedad" : "Cargar nueva propiedad"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="titulo" placeholder="Título" value={formData.titulo} onChange={handleChange} required />
        <select name="tipo" value={formData.tipo} onChange={handleChange} required>
          <option value="">Seleccione tipo</option>
          {tipos.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
        </select>
        <select name="operacion" value={formData.operacion} onChange={handleChange} required>
          <option value="">Seleccione operación</option>
          {operaciones.map(op => <option key={op} value={op}>{op}</option>)}
        </select>
        <GeorefLocationSelector onChange={handleGeorefChange} initialValues={locationValues} />
        <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange}></textarea>
        <input type="number" name="precio" placeholder="Precio (opcional)" value={formData.precio} onChange={handleChange} />
        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
        {previewUrls.length > 0 && (
          <div className="preview-container">
            {previewUrls.map((src, i) => <img key={i} src={src} alt={`preview-${i}`} className="preview-img" />)}
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? (propiedadEdit ? "Actualizando..." : "Subiendo...") : (propiedadEdit ? "Actualizar Propiedad" : "Cargar Propiedad")}
        </button>
      </form>
      {mensaje && <p className="admin-mensaje">{mensaje}</p>}
    </div>
  );
};

export default Admin;
