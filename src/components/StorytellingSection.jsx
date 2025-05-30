import React from 'react';
import { motion } from 'framer-motion';
import '../styles/StorytellingSection.css';



  

const StorytellingSection = ({ stories, valores }) => {
    return (
      <section className="storytelling-section">
        <h2>{valores}</h2>
        <div className="storytelling-track">
          {stories.map((block, index) => (
            <motion.div
              key={index}
              className="storytelling-block"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2>{block.title}</h2>
              <img src={block.img} alt="Historia Inmobiliaria" loading="lazy"/>
              <p>{block.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  };
  
  export default StorytellingSection;