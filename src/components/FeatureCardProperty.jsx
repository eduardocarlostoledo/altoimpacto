import React from "react";
import "../styles/FeatureCard.css"; // Asegúrate de que la ruta sea correcta

const FeatureCardProperty = ({ id, titulo, tipo, zona, descripcion, precio, imagen, onClick }) => {
  
  return (
    <div
      className="featurecard-feature-card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img src={imagen} alt={titulo} className="featurecard-feature-img" />
      
      <h2 className="featurecard-feature-img-h3">{titulo}</h2>
      <h3 className="featurecard-feature-img-h3">{tipo}</h3>
      <p>{descripcion}</p>
      <p> u$s {precio}</p>
      <p>{zona}</p>
    </div>
  );
};

export default FeatureCardProperty;
