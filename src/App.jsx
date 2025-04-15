import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, lazy, Suspense } from 'react';

// Componentes de layout
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from "../src/pages/LoadingSpinner.jsx";
// Configura GSAP
gsap.registerPlugin(ScrollTrigger);

// Lazy loading de páginas
const Home = lazy(() => import('@/pages/Home'));
const ConsultoraHero = lazy(() => import('@/pages/Consultora/ConsultoraHero'));
const ConstructoraHero = lazy(() => import('@/pages/Constructora/ConstructoraHero'));
const InmobiliariaHero = lazy(() => import('@/pages/Inmobiliaria/InmobiliariaHero'));

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
      <div className="app-container">
        <Navbar />
        
        <main className="main-content">
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