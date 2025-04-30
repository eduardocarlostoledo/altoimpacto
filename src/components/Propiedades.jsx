// ✅ Propiedades.jsx
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../styles/PropiedadesPublic.css";

const API = import.meta.env.VITE_API_URL;

const capitalize = (str) => {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

const tiposOperacion = ["VENTA", "ALQUILER", "ALQUILER TEMPORAL"];

const Propiedades = () => {
  const navigate = useNavigate();
  const topRef = useRef(null);
  const sectionRef = useRef(null);
  const [propiedades, setPropiedades] = useState([]);
  const [filtros, setFiltros] = useState({ tipo: "", operacion: "", zona: "", precioMax: "", precioMin: "" });
  const [tiposUnicos, setTiposUnicos] = useState([]);
  const [zonasUnicas, setZonasUnicas] = useState([]);
  const [operacionesUnicas, setOperacionesUnicas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const scrollToSection = () => {
    if (sectionRef.current) {
      window.scrollTo({ top: sectionRef.current.offsetTop, behavior: "smooth" });
    }
  };

  const fetchPropiedades = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (filtros.tipo) query.append("tipo", filtros.tipo.toUpperCase());
      if (filtros.operacion) query.append("operacion", filtros.operacion.toUpperCase());
      if (filtros.zona) query.append("zona", filtros.zona.toLowerCase());
      if (filtros.precioMin) query.append("precioMin", filtros.precioMin);
      if (filtros.precioMax) query.append("precioMax", filtros.precioMax);
      query.append("page", page);
      query.append("limit", 12);

      const res = await axios.get(`${API}/api/propiedades?${query.toString()}`);
      const props = res.data.propiedades || [];
      setPropiedades(props);
      setTotalPages(res.data.pages || 1);

      if (res.data.filtros) {
        setTiposUnicos(res.data.filtros.tipos);
        setZonasUnicas(res.data.filtros.zonas);
        setOperacionesUnicas(res.data.filtros.operacion);
      }

      scrollToSection();
    } catch (err) {
      console.error("Error al obtener propiedades", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropiedades();
  }, [filtros, page]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setFiltros({ tipo: "", operacion: "", zona: "", precioMax: "", precioMin: "" });
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const propiedadesAgrupadas = tiposOperacion.map((op) => ({
    operacion: op,
    propiedades: propiedades.filter((p) => p.operacion === op),
  })).filter((grupo) => grupo.propiedades.length > 0);

  return (
    <section className="propiedades-section" ref={sectionRef}>
      <h2 ref={topRef}>Propiedades Disponibles</h2>

      <div className="propiedades-filtros">
        <select name="tipo" value={filtros.tipo} onChange={handleFiltroChange}>
          <option value="">Todos los tipos</option>
          {tiposUnicos.map((t, i) => (
            <option key={i} value={t}>{capitalize(t)}</option>
          ))}
        </select>

        <select name="zona" value={filtros.zona} onChange={handleFiltroChange}>
          <option value="">Todas las zonas</option>
          {zonasUnicas.map((z, i) => (
            <option key={i} value={z}>{capitalize(z)}</option>
          ))}
        </select>

        <select name="operacion" value={filtros.operacion} onChange={handleFiltroChange}>
          <option value="">Todas las operaciones</option>
          {operacionesUnicas.map((op, i) => (
            <option key={i} value={op}>{capitalize(op)}</option>
          ))}
        </select>

        <input
          type="number"
          name="precioMin"
          placeholder="Precio mínimo"
          value={filtros.precioMin}
          onChange={handleFiltroChange}
        />
        <input
          type="number"
          name="precioMax"
          placeholder="Precio máximo"
          value={filtros.precioMax}
          onChange={handleFiltroChange}
        />

        {(filtros.tipo || filtros.zona || filtros.operacion || filtros.precioMin || filtros.precioMax) && (
          <button onClick={handleResetFilters} className="reset-filtros-btn">
            Limpiar Filtros
          </button>
        )}
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        propiedadesAgrupadas.map(({ operacion, propiedades }) => (
          <div key={operacion} className="grupo-operacion">
            <h3 className="titulo-operacion">
              {capitalize(operacion)} ({propiedades.length} propiedad{propiedades.length !== 1 ? 'es' : ''})
            </h3>
            <div className="propiedades-grid" style={{ display: propiedades.length < 3 ? 'inline-flex' : undefined, flexWrap: 'wrap', justifyContent: 'center' }}>
              {propiedades.map((prop) => (
                <div key={prop.id} className="prop-card" onClick={() => navigate(`/propiedades/${prop.id}`)}>
                  <img src={prop.url} alt={prop.titulo} className="prop-img" />
                  <div className="prop-info">
                    <h3>{prop.titulo}</h3>
                    <p className="tipo-zona">{capitalize(prop.tipo)} en {capitalize(prop.zona)}</p>
                    <p className="desc">{prop.descripcion?.slice(0, 100)}...</p>
                    <p className="precio">{prop.precio ? `$${prop.precio}` : "Consultar"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={() => { setPage((prev) => Math.max(prev - 1, 1)); scrollToSection(); }} disabled={page === 1}>
            ⬅ Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => { setPage(i + 1); scrollToSection(); }}
              className={page === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => { setPage((prev) => Math.min(prev + 1, totalPages)); scrollToSection(); }} disabled={page === totalPages}>
            Siguiente ➡
          </button>
        </div>
      )}
    </section>
  );
};

export default Propiedades;
