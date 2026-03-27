const PrivacyPolicy = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1.5rem', color: '#333', lineHeight: '1.7' }}>
      <h1 style={{ borderBottom: '2px solid #2c3e50', paddingBottom: '0.5rem' }}>
        Política de Privacidad
      </h1>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>Última actualización: marzo 2026</p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        <strong>Global Home Group S.A.</strong><br />
        Av. 13 entre C. 527 y C. 528, Tolosa, La Plata, Buenos Aires, Argentina<br />
        Email de contacto: <a href="mailto:info@globalhomegroup.com.ar">info@globalhomegroup.com.ar</a>
      </p>

      <h2>2. Datos que recopilamos</h2>
      <p>
        Únicamente recopilamos los datos que usted nos proporciona voluntariamente a través del formulario de contacto:
      </p>
      <ul>
        <li>Nombre</li>
        <li>Dirección de correo electrónico</li>
        <li>Mensaje de consulta</li>
      </ul>
      <p>
        <strong>No almacenamos estos datos en ninguna base de datos propia.</strong> Son enviados directamente
        a nuestra dirección de email mediante el servicio EmailJS y no son retenidos en nuestros servidores.
      </p>

      <h2>3. Finalidad del tratamiento</h2>
      <p>
        Los datos se usan exclusivamente para responder a su consulta o solicitud de presupuesto. No los
        utilizamos para envíos publicitarios, perfilado, ni los cedemos a terceros salvo los servicios
        técnicos descritos en esta política (EmailJS como procesador de envío).
      </p>

      <h2>4. Base legal (Art. 6 GDPR / Ley 25.326 Argentina)</h2>
      <p>
        El tratamiento se basa en el consentimiento explícito que usted otorga al completar y enviar el
        formulario de contacto.
      </p>

      <h2>5. Cookies y rastreo</h2>
      <p>
        Este sitio utiliza Google Analytics (gtag.js) para medir el tráfico de forma anónima. Esta
        tecnología se activa únicamente si usted acepta las cookies analíticas mediante el banner de
        consentimiento. Puede revocar su consentimiento en cualquier momento borrando las cookies de
        su navegador o a través de la configuración de este sitio.
      </p>

      <h2>6. Sus derechos</h2>
      <p>En cualquier momento puede ejercer los siguientes derechos escribiendo a <a href="mailto:info@globalhomegroup.com.ar">info@globalhomegroup.com.ar</a>:</p>
      <ul>
        <li><strong>Acceso</strong> — conocer qué datos tenemos sobre usted</li>
        <li><strong>Rectificación</strong> — corregir datos inexactos</li>
        <li><strong>Supresión</strong> — solicitar que borremos su información</li>
        <li><strong>Oposición</strong> — oponerse al tratamiento</li>
        <li><strong>Portabilidad</strong> — recibir sus datos en formato legible</li>
      </ul>
      <p>
        Dado que no almacenamos datos personales en bases de datos propias, la mayoría de estos derechos
        se ejercen por la vía de no contactarnos o solicitando la eliminación de emails ya recibidos.
      </p>

      <h2>7. Proveedores de servicios (sub-encargados)</h2>
      <ul>
        <li><strong>EmailJS</strong> (emailjs.com) — procesamiento de envío de formularios</li>
        <li><strong>Cloudinary</strong> (cloudinary.com) — almacenamiento de imágenes</li>
        <li><strong>Google Analytics</strong> — estadísticas de uso anónimas (solo con consentimiento)</li>
        <li><strong>Railway</strong> (railway.app) — hosting del backend</li>
        <li><strong>Netlify</strong> — hosting del frontend</li>
      </ul>

      <h2>8. Seguridad</h2>
      <p>
        Tomamos medidas técnicas razonables para proteger la información transmitida. La comunicación
        con este sitio se realiza a través de HTTPS. Para reportar una vulnerabilidad de seguridad,
        consulte nuestro archivo <a href="/.well-known/security.txt">security.txt</a>.
      </p>

      <h2>9. Menores de edad</h2>
      <p>
        Este sitio no está dirigido a menores de 13 años y no recopilamos conscientemente datos de menores.
      </p>

      <h2>10. Modificaciones</h2>
      <p>
        Podemos actualizar esta política ocasionalmente. La fecha de última actualización figura al inicio
        del documento.
      </p>

      <hr style={{ margin: '2rem 0' }} />
      <p style={{ fontSize: '0.85rem', color: '#888' }}>
        Para más información sobre protección de datos en Argentina: <br />
        Agencia de Acceso a la Información Pública — <a href="https://www.argentina.gob.ar/aaip" target="_blank" rel="noopener noreferrer">www.argentina.gob.ar/aaip</a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
