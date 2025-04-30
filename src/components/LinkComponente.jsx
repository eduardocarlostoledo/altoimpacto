import React from 'react';
import FeatureCard from './FeatureCard';
import '../styles/FeatureCardGrid.css';


// FeatureCardGrid.jsx
const LinkComponente = ({ features, onCardClick }) => {
    console.log(features);
    if (!features.length) {
        return null;
      }
    
    return (
      <div className="featurecardgrid-features">
        {features.map((feature, index) => (
         <FeatureCard
         baner={feature.baner}
         key={index}
         image={feature.image}
         title={feature.title}
         description={feature.description}
         onClick={() => onCardClick(feature.link)}
       />
        ))}
      </div>
    );
  };
  
  export default LinkComponente;
  