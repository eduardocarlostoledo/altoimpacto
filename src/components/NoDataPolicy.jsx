const NoDataPolicy = () => {
  return (
    <div style={{ maxWidth: '700px', margin: '3rem auto', padding: '0 1.5rem', color: '#333', lineHeight: '1.7' }}>
      <h1 style={{ borderBottom: '2px solid #2c3e50', paddingBottom: '0.5rem' }}>
        ¿Guardamos tus datos?
      </h1>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>Última actualización: marzo 2026</p>

      <div style={{
        backgroundColor: '#eaf4fb',
        border: '1px solid #3498db',
        borderRadius: '6px',
        padding: '1.25rem 1.5rem',
        margin: '1.5rem 0'
      }}>
        <h2 style={{ marginTop: 0, color: '#2980b9' }}>Respuesta corta: No.</h2>
        <p style={{ marginBottom: 0 }}>
          Global Home Group <strong>no almacena ningún dato personal</strong> de las personas que
          visitan este sitio o completan el formulario de contacto.
        </p>
      </div>

      <h2>¿Qué pasa cuando completás el formulario?</h2>
      <p>
        Tu nombre, email y mensaje son enviados directamente a nuestra casilla de correo a través
        del servicio EmailJS. <strong>No se guardan en ninguna base de datos</strong>, no se asocian
        a ningún perfil, y no los compartimos con terceros salvo el mencionado servicio de envío.
      </p>

      <h2>¿Qué pasa con las cookies?</h2>
      <p>
        Si aceptaste las cookies analíticas, Google Analytics registra estadísticas anónimas de visitas
        (páginas vistas, tiempo en el sitio, dispositivo). Estos datos son <strong>anónimos y agregados</strong>;
        Google no nos proporciona información que identifique a personas individuales.
      </p>
      <p>
        Si rechazaste las cookies, ningún script de rastreo se ejecuta en tu navegador.
      </p>

      <h2>Derecho al olvido (Art. 17 GDPR / Art. 6 Ley 25.326)</h2>
      <p>
        Dado que no almacenamos tu información en bases de datos propias, <strong>no hay nada que
        borrar</strong>. Si querés que eliminemos un email de consulta que nos enviaste, escribinos a{' '}
        <a href="mailto:info@globalhomegroup.com.ar">info@globalhomegroup.com.ar</a> y lo eliminamos
        de inmediato.
      </p>

      <hr style={{ margin: '2rem 0' }} />
      <p>
        <a href="/politica-de-privacidad">Ver Política de Privacidad completa</a>
      </p>
    </div>
  );
};

export default NoDataPolicy;
