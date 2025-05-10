import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/GeorefLocationSelector.css";

const GeorefLocationSelector = ({ onChange, initialValues = {} }) => {
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [localidades, setLocalidades] = useState([]);

  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
  const [selectedLocalidad, setSelectedLocalidad] = useState("");

  // 1. Cargar provincias
  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const res = await axios.get("https://apis.datos.gob.ar/georef/api/provincias");
        let ordenadas = res.data.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));
        const indexBsAs = ordenadas.findIndex((p) => p.nombre.toLowerCase() === "buenos aires");
        if (indexBsAs > -1) {
          const [bsas] = ordenadas.splice(indexBsAs, 1);
          ordenadas.unshift(bsas);
        }
        setProvincias(ordenadas);

        // Aplicar provincia si viene de initialValues
        if (initialValues.provincia) {
          setSelectedProvincia(initialValues.provincia);
        }
      } catch (error) {
        console.error("Error al obtener provincias", error);
      }
    };
    fetchProvincias();
  }, []);

  // 2. Cargar municipios cuando cambia provincia
  useEffect(() => {
    const fetchMunicipios = async () => {
      if (!selectedProvincia) return;
      try {
        const res = await axios.get(
          `https://apis.datos.gob.ar/georef/api/municipios?provincia=${selectedProvincia}&max=1000`
        );
        let ordenados = res.data.municipios.sort((a, b) => a.nombre.localeCompare(b.nombre));
        if (selectedProvincia.toLowerCase() === "buenos aires") {
          const indexLaPlata = ordenados.findIndex((m) => m.nombre.toLowerCase() === "la plata");
          if (indexLaPlata > -1) {
            const [laPlata] = ordenados.splice(indexLaPlata, 1);
            ordenados.unshift(laPlata);
          }
        }
        setMunicipios(ordenados);

        // Solo aplicar municipio si viene de initialValues y aún no se seleccionó
        if (initialValues.municipio && !selectedMunicipio) {
          setSelectedMunicipio(initialValues.municipio);
        }
      } catch (error) {
        console.error("Error al obtener municipios", error);
      }
    };

    fetchMunicipios();
  }, [selectedProvincia]);

  // 3. Cargar localidades cuando cambia municipio
  useEffect(() => {
    const fetchLocalidades = async () => {
      if (!selectedProvincia || !selectedMunicipio) return;
      try {
        const res = await axios.get(
          `https://apis.datos.gob.ar/georef/api/localidades?provincia=${selectedProvincia}&municipio=${selectedMunicipio}&max=1000`
        );
        let ordenadas = res.data.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre));
        if (selectedMunicipio.toLowerCase() === "la plata") {
          ordenadas = [{ id: "casco_urbano", nombre: "Casco Urbano" }, ...ordenadas];
        }
        setLocalidades(ordenadas);

        // Solo aplicar localidad si viene de initialValues y aún no se seleccionó
        if (initialValues.localidad && !selectedLocalidad) {
          setSelectedLocalidad(initialValues.localidad);
        }
      } catch (error) {
        console.error("Error al obtener localidades", error);
      }
    };

    fetchLocalidades();
  }, [selectedProvincia, selectedMunicipio]);

  // 4. Comunicar al componente padre
  useEffect(() => {
    if (onChange) {
      onChange({
        provincia: selectedProvincia,
        municipio: selectedMunicipio,
        localidad: selectedLocalidad,
      });
    }
  }, [selectedProvincia, selectedMunicipio, selectedLocalidad]);

  return (
    <div className="georef-selectors">
      <select
        value={selectedProvincia}
        onChange={(e) => {
          setSelectedProvincia(e.target.value);
          setSelectedMunicipio("");
          setSelectedLocalidad("");
          setMunicipios([]);
          setLocalidades([]);
        }}
      >
        <option value="">-- Seleccionar Provincia --</option>
        {provincias.map((prov) => (
          <option key={prov.id} value={prov.nombre}>
            {prov.nombre}
          </option>
        ))}
      </select>

      <select
        value={selectedMunicipio}
        onChange={(e) => {
          setSelectedMunicipio(e.target.value);
          setSelectedLocalidad("");
          setLocalidades([]);
        }}
        disabled={!municipios.length}
      >
        <option value="">-- Seleccionar Municipio --</option>
        {municipios.map((mun) => (
          <option key={mun.id} value={mun.nombre}>
            {mun.nombre}
          </option>
        ))}
      </select>

      <select
        value={selectedLocalidad}
        onChange={(e) => setSelectedLocalidad(e.target.value)}
        disabled={!localidades.length}
      >
        <option value="">-- Seleccionar Localidad --</option>
        {localidades.map((loc) => (
          <option key={loc.id} value={loc.nombre}>
            {loc.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GeorefLocationSelector;
