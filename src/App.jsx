import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import VideoBackground from './components/VideoBackground';

import Landing from './pages/Landing';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

const BlogAdmin = lazy(() => import('./pages/BlogAdmin'));

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <VideoBackground currentPage={location.pathname} />

      <div className="fixed inset-0 bg-black/55 z-[1] pointer-events-none" />

      <Navbar />

      <div
        className="
          relative z-10
          ml-[200px] min-h-screen
          p-6 md:p-10
          max-md:ml-0 max-md:pb-20
        "
      >
        <div className="w-full max-w-6xl mx-auto bg-black/60 backdrop-blur-sm border border-white/10 p-6 md:p-10 min-h-[90vh]">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/blog/admin"
              element={(
                <Suspense fallback={<p className="text-sm text-neutral-400">Loading editor…</p>}>
                  <BlogAdmin />
                </Suspense>
              )}
            />
            <Route path="/blog/:slug" element={<Blog />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
