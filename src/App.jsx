import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import XboxBootAnimation from './components/XboxBootAnimation';
import HexagonalBackground from './components/HexagonalBackground';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Works from './pages/Works';
import Bio from './pages/Bio';
import Interests from './pages/Interests';
import Experience from './pages/Experience';
import Blog from './pages/Blog';

function App() {
  const [showBootAnimation, setShowBootAnimation] = useState(true);

  const handleBootComplete = () => {
    setShowBootAnimation(false);
  };

  if (showBootAnimation) {
    return <XboxBootAnimation onComplete={handleBootComplete} />;
  }

  return (
    <Router>
      <div className="relative min-h-screen bg-halo-dark text-white">
        <HexagonalBackground opacity={0.1} />
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/interests" element={<Interests />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;

