import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, lazy, Suspense } from 'react';
import FixOpacity from '@/components/FixOpacity';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

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

    // Configuración inicial de estilos
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#333333';
  }, []);

  return (
    <Router>
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
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;