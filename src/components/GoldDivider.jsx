import React from 'react';
import styles from './GoldDivider.module.scss';

const GoldDivider = () => {
  return (
    <div className={styles.goldDivider}>
      <div className={styles.line}></div>
      <div className={styles.diamond}></div>
      <div className={styles.line}></div>
    </div>
  );
};

export default GoldDivider;