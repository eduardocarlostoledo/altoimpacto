# Global Home Group — Frontend

**globalhomegroup.com.ar**

Plataforma web que unifica tres unidades de negocio bajo una misma marca: **Constructora**, **Inmobiliaria** y **Consultoría empresarial**. El objetivo es centralizar la operación comercial del grupo en un solo sitio, permitiendo al cliente recorrer todo el ciclo inmobiliario — desde la construcción llave en mano hasta la venta o alquiler — sin salir de la plataforma.

## Problema que resuelve

En el rubro inmobiliario-constructor, es habitual que cada vertical opere con sitios, marcas y procesos separados. Esto genera fricción para el cliente y dispersión operativa. Global Home Group integra las tres áreas en una experiencia única:

- **Constructora**: modelos de vivienda y planes de construcción llave en mano con autogestión desde el panel admin.
- **Inmobiliaria**: publicación, filtrado y detalle de propiedades (venta, alquiler, alquiler temporal) con cobertura en zonas urbanas, suburbanas, barrios cerrados y campos.
- **Consultoría**: 25 años de experiencia en compras públicas, desarrollo empresarial y asesoramiento estratégico.

Al unificar estas unidades, el grupo puede ofrecer un servicio completo: construir la propiedad, venderla o alquilarla, y asesorar al inversor, todo desde un mismo punto de contacto.

## Arquitectura

| Capa | Tecnología |
|---|---|
| SPA | React 19 + Vite |
| Routing | React Router v7 |
| Estilos | CSS puro (sin frameworks UI) |
| Animaciones | GSAP + Framer Motion |
| HTTP client | Axios (apiClient centralizado) |
| Media | Cloudinary (upload + delivery) |
| Contacto | EmailJS + reCAPTCHA + rate limiting |
| SEO | React Helmet |
| Backend | Node.js + Express (repo separado: `globalhomegroup-backend`) |
| Deploy | Railway (backend) |

### Frontend desacoplado

La SPA se comunica con la API REST a través de un cliente Axios centralizado (`src/lib/apiClient.js`) que:

- Resuelve automáticamente la URL del backend según el entorno (local / producción).
- Bloquea requests que no apunten a `/api/*` como medida de seguridad.
- Configura timeout y headers por defecto.

## Funcionalidades principales

### Autogestión de propiedades y modelos de vivienda

Panel administrativo protegido con autenticación (SHA-256 + hash en variable de entorno) que permite:

- CRUD de propiedades inmobiliarias con imágenes vía Cloudinary.
- CRUD de planes de vivienda y modelos de construcción.
- Geolocalización con el servicio Georef de Argentina.

### Automatizaciones de correo

- Formulario de contacto con envío automático vía **EmailJS**.
- Protección contra spam con **Google reCAPTCHA**.
- **Rate limiting** en el frontend (1 mensaje por minuto por sesión).

### Landing de construcción llave en mano

Página dedicada con storytelling visual y CTA directo a WhatsApp para captar leads interesados en construir.

### Integraciones

- **Google reCAPTCHA** — validación de formularios.
- **Cloudinary** — upload y optimización de imágenes.
- **EmailJS** — envío de correos sin backend propio para el formulario de contacto.
- **Georef API Argentina** — selector de provincia/localidad para propiedades.
- **WhatsApp Business** — CTA directos con mensaje pre-armado.

### Seguridad

- Sanitización de inputs y rutas protegidas.
- Variables sensibles en `.env` (hashes, API keys).
- Interceptor Axios que bloquea URLs fuera del scope de la API.
- Políticas de privacidad y cookies (GDPR compliance).

## Estructura del proyecto

```
src/
├── components/
│   ├── Home.jsx                    # Landing principal con las 3 unidades
│   ├── ConsultoraHero.jsx          # Sección consultoría
│   ├── ConstructoraHero.jsx        # Sección constructora + modelos
│   ├── InmobiliariaHero.jsx        # Sección inmobiliaria + propiedades
│   ├── PropiedadesPublic.jsx       # Listado público con filtros
│   ├── Viviendas.jsx               # Planes de vivienda públicos
│   ├── Construcciones.jsx          # Modelos de construcción públicos
│   ├── LandingLlaveEnMano1.jsx     # Landing de construcción llave en mano
│   ├── Admin*.jsx                  # Panel de administración
│   ├── ProtectedRoute.jsx          # Guard de rutas admin
│   ├── contact.jsx                 # Formulario con EmailJS + reCAPTCHA
│   ├── CloudinaryUploader.jsx      # Componente de upload de imágenes
│   └── GeorefLocationSelector.jsx  # Selector de ubicación argentina
├── lib/
│   └── apiClient.js                # Cliente HTTP centralizado
├── styles/                         # CSS por componente
└── img/                            # Assets estáticos
```

## Impacto del proyecto

- Primer punto de contacto digital unificado para las tres unidades de negocio del grupo.
- Autogestión total de propiedades y planes de vivienda sin intervención técnica.
- Automatización del flujo de contacto (formulario -> email -> seguimiento).
- Reducción de fricción comercial: el cliente navega construcción, inmuebles y consultoría en un solo lugar.

## Mi rol en el proyecto

Diseño y desarrollo completo del frontend como desarrollador principal:

- Arquitectura SPA desacoplada consumiendo API REST propia.
- Sistema de autogestión de propiedades y modelos de vivienda con upload de imágenes a Cloudinary.
- Integración de EmailJS con reCAPTCHA y rate limiting para el formulario de contacto.
- Rutas protegidas con autenticación basada en hash SHA-256.
- Animaciones con GSAP y Framer Motion para storytelling visual.
- Interceptor de seguridad en el cliente HTTP.
- Deploy y puesta en producción en entorno real (globalhomegroup.com.ar).

## Setup local

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Build de producción
```

Variables de entorno requeridas en `.env`:

```
VITE_API_URL=http://localhost:3001
VITE_ADMIN_HASH=<sha256-hash>
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_RECAPTCHA_SITE_KEY=
```

## CI/CD

- Pipeline en desarrollo con GitHub Actions.
- Automatización de build y validación del frontend.
- Preparado para integración con despliegue continuo.
