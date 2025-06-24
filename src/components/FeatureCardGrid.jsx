import React from 'react';
import FeatureCard from './FeatureCard';
import '../styles/FeatureCardGrid.css';

const FeatureCardGrid = ({ features = [], onCardClick }) => {
  if (!features.length) {
    return null;
  }

  //console.log(features);

  return (
    <div className="featurecardgrid-features">
      {/* <h3>Además ... </h3> */}
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          image={feature.image}
          title={feature.title}
          description={feature.description}
          onClick={() => onCardClick(feature)}
        />
      ))}
    </div>
  );
};

export default FeatureCardGrid;
