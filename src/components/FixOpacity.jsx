// ✅ 3. FixOpacity.jsx
// Este componente no necesita estilos visuales, pero igual preparamos su estructura limpia por si luego se desea animar o modificar

import { useEffect } from 'react';

const FixOpacity = () => {
  useEffect(() => {
    const fixAll = () => {
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        el.style.opacity = '1';
        el.style.color = '';
        el.style.backgroundColor = '';
      });
    };

    fixAll();
  }, []);

  return null;
};

export default FixOpacity;