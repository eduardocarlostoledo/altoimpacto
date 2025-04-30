import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PropiedadesPublic.css";

const API = import.meta.env.VITE_API_URL;

const capitalize = (str) => {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

// ...otros imports
const PropiedadesPublic = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [propiedades, setPropiedades] = useState([]);

  // Filtros
  const [tipo, setTipo] = useState("");
  const [zona, setZona] = useState("");
  const [operacion, setOperacion] = useState("");
  const [precioMaximo, setPrecioMaximo] = useState("");
  const [rangoPrecioMin, setRangoPrecioMin] = useState("");
  const [rangoPrecioMax, setRangoPrecioMax] = useState("");

  // Valores únicos para selects
  const [tiposUnicos, setTiposUnicos] = useState([]);
  const [zonasUnicas, setZonasUnicas] = useState([]);
  const [operacionesUnicas, setOperacionesUnicas] = useState([]);

  const fetchPropiedades = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (tipo) query.append("tipo", tipo);
      if (zona) query.append("zona", zona);
      if (operacion) query.append("operacion", operacion);
      if (precioMaximo) query.append("precioMax", precioMaximo);
      if (rangoPrecioMin) query.append("precioMin", rangoPrecioMin);
      if (rangoPrecioMax) query.append("precioMax", rangoPrecioMax);

      query.append("page", page);
      query.append("limit", 10);

      const res = await axios.get(`${API}/api/propiedades?${query.toString()}`);

      const isArray = Array.isArray(res.data);
      const propiedades2 = isArray ? res.data : res.data.propiedades || [];
      const pages = isArray ? 1 : res.data.pages || 1;

      setPropiedades(propiedades2);
      setTotalPages(pages);

      if (res.data.filtros) {
        const { tipos, zonas, operacion: ops } = res.data.filtros;
        setTiposUnicos(tipos.map(capitalize));
        setZonasUnicas(zonas.map(capitalize));
        setOperacionesUnicas(ops.map(capitalize));
      }
    } catch (err) {
      console.error("Error al obtener propiedades", err);
      setPropiedades([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // recargar al cambiar filtros
  useEffect(() => {
    fetchPropiedades();
  }, [tipo, zona, operacion, precioMaximo, rangoPrecioMin, rangoPrecioMax, page]);

  useEffect(() => {
    setPage(1);
  }, [tipo, zona, operacion, precioMaximo, rangoPrecioMin, rangoPrecioMax]);

  const handleResetFilters = () => {
    setTipo("");
    setZona("");
    setOperacion("");
    setPrecioMaximo("");
    setRangoPrecioMin("");
    setRangoPrecioMax("");
  };

  return (
    <section className="propiedades-section">
      <h2>Propiedades Disponibles</h2>

      <div className="propiedades-filtros">
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Todos los tipos</option>
          {tiposUnicos.map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>

        <select value={zona} onChange={(e) => setZona(e.target.value)}>
          <option value="">Todas las zonas</option>
          {zonasUnicas.map((z, i) => (
            <option key={i} value={z}>{z}</option>
          ))}
        </select>

        <select value={operacion} onChange={(e) => setOperacion(e.target.value)}>
          <option value="">Todas las operaciones</option>
          {operacionesUnicas.map((op, i) => (
            <option key={i} value={op}>{op}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Precio máximo"
          value={precioMaximo}
          onChange={(e) => setPrecioMaximo(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio mínimo"
          value={rangoPrecioMin}
          onChange={(e) => setRangoPrecioMin(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio máximo"
          value={rangoPrecioMax}
          onChange={(e) => setRangoPrecioMax(e.target.value)}
        />

        {(tipo || zona || operacion || precioMaximo || rangoPrecioMin || rangoPrecioMax) && (
          <button onClick={handleResetFilters} className="reset-filtros-btn">
            Limpiar Filtros
          </button>
        )}
      </div>

      <p className="prop-count">
        Mostrando {propiedades.length} propiedad{propiedades.length !== 1 ? "es" : ""}
      </p>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="propiedades-grid">
          {Array.isArray(propiedades) && propiedades.length > 0 ? (
            propiedades.map((prop) => (
              <div key={prop.id} className="prop-card" onClick={() => navigate(`/propiedades/${prop.id}`)}>
                <img src={prop.url} alt={prop.titulo} className="prop-img" />
                <div className="prop-info">
                  <h3>{prop.titulo}</h3>
                  <p className="tipo-zona">{capitalize(prop.tipo)} en {capitalize(prop.zona)}</p>
                  <p className="desc">{prop.descripcion?.slice(0, 100)}...</p>
                  <p className="precio">{prop.precio ? `$${prop.precio}` : "Consultar"}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="sin-resultados">No se encontraron propiedades.</p>
          )}
        </div>
      )}

      <div className="pagination-controls">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          ⬅ Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Siguiente ➡
        </button>
      </div>
    </section>
  );
};

export default PropiedadesPublic;



// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/PropiedadesPublic.css";
// const API = import.meta.env.VITE_API_URL;
// const capitalize = (str) => {
//   if (!str) return "";
//   return str[0].toUpperCase() + str.slice(1).toLowerCase();
// };

// const PropiedadesPublic = () => {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const [propiedades, setPropiedades] = useState([]);
//   const [tipo, setTipo] = useState("");
//   const [zona, setZona] = useState("");

//   const [tiposUnicos, setTiposUnicos] = useState([]);
//   const [zonasUnicas, setZonasUnicas] = useState([]);

//   const fetchPropiedades = async () => {
//     try {
//       setLoading(true);
//       const query = new URLSearchParams();
//       if (tipo) query.append("tipo", tipo);
//       if (zona) query.append("zona", zona);
//       query.append("page", page);
//       query.append("limit", 10);
  
//       const res = await axios.get(`${API}/api/propiedades?${query.toString()}`);
      
//       const isArray = Array.isArray(res.data);
//       const propiedades2 = isArray ? res.data : res.data.propiedades || [];
//       const pages = isArray ? 1 : res.data.pages || 1;
  
//       setPropiedades(propiedades2);
//       setTotalPages(pages);
  
//       if (res.data.filtros) {
//         const { tipos, zonas } = res.data.filtros;
//         setTiposUnicos(tipos.map(capitalize));
//         setZonasUnicas(zonas.map(capitalize));
//       }
      
  
//     } catch (err) {
//       console.error("Error al obtener propiedades", err);
//       setPropiedades([]);
//       setTotalPages(1);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   useEffect(() => {
//     fetchPropiedades();
//     // window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [tipo, zona, page]);

//   useEffect(() => {
//     setPage(1); // reset page cuando se cambia filtro
//   }, [tipo, zona]);

//   const handlePropertyClick = (prop) => {
//     navigate(`/propiedades/${prop.id}`);
//   };

//   const handleResetFilters = () => {
//     setTipo("");
//     setZona("");
//   };

//   return (
//     <section className="propiedades-section">
//       <h2>Propiedades en Venta</h2>

//       <div className="propiedades-filtros">
//         <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
//           <option value="">Todos los tipos</option>
//           {tiposUnicos.map((t, i) => (
//             <option key={i} value={t}>{t}</option>
//           ))}
//         </select>

//         <select value={zona} onChange={(e) => setZona(e.target.value)}>
//           <option value="">Todas las zonas</option>
//           {zonasUnicas.map((z, i) => (
//             <option key={i} value={z}>{z}</option>
//           ))}
//         </select>

//         {(tipo || zona) && (
//           <button onClick={handleResetFilters} className="reset-filtros-btn">
//             Limpiar Filtros
//           </button>
//         )}
//       </div>

//       <p className="prop-count">
//         Mostrando {propiedades.length} propiedad{propiedades.length !== 1 ? "es" : ""}
//       </p>

//       {loading ? (
//         <div className="spinner"></div>
//       ) : (
//         <div className="propiedades-grid">
//           {Array.isArray(propiedades) && propiedades.length > 0 ? (
//             propiedades.map((prop) => (
//               <div key={prop.id} className="prop-card" onClick={() => handlePropertyClick(prop)}>
//                 <img src={prop.url} alt={prop.titulo} className="prop-img" />
//                 <div className="prop-info">
//                   <h3>{prop.titulo}</h3>
//                   <p className="tipo-zona">{capitalize(prop.tipo)} en {capitalize(prop.zona)}</p>
//                   <p className="desc">{prop.descripcion?.slice(0, 100)}...</p>
//                   <p className="precio">{prop.precio ? `$${prop.precio}` : "Consultar"}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="sin-resultados">No se encontraron propiedades.</p>
//           )}
//         </div>
//       )}

//       <div className="pagination-controls">
//         <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
//           ⬅ Anterior
//         </button>

//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setPage(i + 1)}
//             className={page === i + 1 ? "active" : ""}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
//           Siguiente ➡
//         </button>
//       </div>
//     </section>
//   );
// };

// export default PropiedadesPublic;
