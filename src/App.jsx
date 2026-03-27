import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, lazy, Suspense } from 'react';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import FixOpacity from '@/components/FixOpacity';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import Contact from './components/contact.jsx';
import DetallePropiedad from './components/DetallePropiedad.jsx';

import ListarPropiedades from "../src/components/ListarPropiedades.jsx";
import PlanViviendaList from './components/PlanViviendaList.jsx';

import DetallePlan from './components/DetallePlan.jsx';
import DetalleModelo from './components/DetalleModeloConstruccion.jsx';

import LandingLlaveEnMano1 from './components/LandingLlaveEnMano1.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import NoDataPolicy from './components/NoDataPolicy.jsx';
import CookieConsent from './components/CookieConsent.jsx';

// Configura GSAP
gsap.registerPlugin(ScrollTrigger);

// Lazy loading de páginas
const Home = lazy(() => import('@/components/Home'));
const ConsultoraHero = lazy(() => import('@/components/ConsultoraHero.jsx'));
const ConstructoraHero = lazy(() => import('@/components/ConstructoraHero.jsx'));
const InmobiliariaHero = lazy(() => import('@/components/InmobiliariaHero.jsx'));


function App() {
  useEffect(() => {
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <CookieConsent />
      <FixOpacity />
      <div className="app-container" style={{
        backgroundColor: '#ffffff',
        color: '#333333',
        minHeight: '100vh'
      }}>
        <Navbar />

        <main className="main-content" style={{
          backgroundColor: '#ffffff',
          opacity: '1 !important'
        }}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/consultora" element={<ConsultoraHero />} />
              <Route path="/constructora" element={<ConstructoraHero />} />
              <Route path="/inmobiliaria" element={<InmobiliariaHero />} />
              <Route path="/contacto" element={<Contact />} />

              <Route path="/landing-construi" element={<LandingLlaveEnMano1 />} />

              {/* Detalle público */}
              <Route path="/propiedades/:id" element={<DetallePropiedad />} />
              <Route path="/planes/:id" element={<DetallePlan />} />
              <Route path="/construcciones/:id" element={<DetalleModelo />} />

              {/* Rutas protegidas */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/administrar-propiedades" element={
                <ProtectedRoute><ListarPropiedades /></ProtectedRoute>
              } />
              <Route path="/administrar-planes" element={
                <ProtectedRoute><PlanViviendaList /></ProtectedRoute>
              } />

              {/* GDPR */}
              <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
              <Route path="/no-guardamos-datos" element={<NoDataPolicy />} />

              <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;