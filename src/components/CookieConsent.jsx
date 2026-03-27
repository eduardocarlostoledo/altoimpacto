import { useState, useEffect } from 'react';

const COOKIE_KEY = 'ghg_cookie_consent';

function loadGTM() {
  if (document.getElementById('gtm-script')) return;
  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-QBCGSFN34F';
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-QBCGSFN34F');
  };
}

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (consent === 'accepted') {
      loadGTM();
    } else if (consent === null) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
    loadGTM();
  };

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#1a1a2e',
      color: '#eee',
      padding: '1rem 1.5rem',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      zIndex: 9999,
      boxShadow: '0 -2px 12px rgba(0,0,0,0.3)',
      fontSize: '0.9rem'
    }}>
      <p style={{ margin: 0, flex: '1 1 300px' }}>
        Usamos cookies analíticas (Google Analytics) para medir el tráfico de forma anónima.
        Al aceptar, contribuís a mejorar el sitio. Al rechazar, ningún script de rastreo se ejecuta.{' '}
        <a href="/politica-de-privacidad" style={{ color: '#74b9ff' }}>Ver política de privacidad</a>.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
        <button
          onClick={reject}
          style={{
            padding: '0.5rem 1.25rem',
            background: 'transparent',
            color: '#aaa',
            border: '1px solid #555',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Rechazar
        </button>
        <button
          onClick={accept}
          style={{
            padding: '0.5rem 1.25rem',
            background: '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}
        >
          Aceptar cookies
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
