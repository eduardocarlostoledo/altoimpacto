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
            <ScrollToTop /> {/* 👈 Este es el truco */}

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
              
              
              {/* Rutas para las páginas de la inmobiliaria */}

              <Route path="*" element={<h1>404 - Página no encontrada</h1>} />              
              
              <Route path="/administrar-propiedades" element={<ListarPropiedades/>}/>
              <Route path="/propiedades/:id" element={<DetallePropiedad />} />

              <Route path="/planes/:id" element={<DetallePlan />} />
              <Route path="/administrar-planes" element={<PlanViviendaList />} />
              
              <Route path="/construcciones/:id" element= {<DetalleModelo />} />

            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;