import React from 'react';
import '../styles/FeatureCard.css'; // Asegúrate de que la ruta sea correcta

const FeatureCard = ({ baner, image, title, description, onClick  }) => {
    
  return (
    <div className="featurecard-feature-card" onClick={onClick} style={{ cursor: 'pointer' }}>
              {baner && <div className="feature-card-baner">{baner}</div>}
      <img src={image} alt={title} className="featurecard-feature-img" />
      <h3 className='featurecard-feature-img-h3'>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
