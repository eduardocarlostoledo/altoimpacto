import React from 'react';
import { motion } from 'framer-motion';
import '../styles/StorytellingSection.css';



  

const StorytellingSection = ({ stories, title }) => {
    return (
      <section className="storytelling-section">
        <h2>{title}</h2>
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
              <img src={block.img} alt="Story Block" />
              <p>{block.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  };
  
  export default StorytellingSection;