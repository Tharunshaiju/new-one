'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Silk from '@/components/Silk';

export default function Home() {
  const router = useRouter();
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [attempts, setAttempts] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const noButtonTexts = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again",
    "Reconsider",
    "Please?",
    "One more time",
    "Final answer?",
    "Positive?",
    "Certain?",
  ];

  useEffect(() => {
    // Create subtle floating particles
    const particleInterval = setInterval(() => {
      setParticles(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: 100
        }
      ]);
    }, 3000);

    return () => clearInterval(particleInterval);
  }, []);

  useEffect(() => {
    // Remove old particles
    const cleanupInterval = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 8000));
    }, 1000);

    return () => clearInterval(cleanupInterval);
  }, []);

  const handleNoHover = () => {
    // Move button to random position with safe boundaries
    const buttonWidth = 200;
    const buttonHeight = 60;
    const padding = 20; // Extra padding from edges
    
    const maxX = Math.max(0, window.innerWidth - buttonWidth - padding);
    const maxY = Math.max(0, window.innerHeight - buttonHeight - padding);
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
    
    // Shrink the No button
    setNoButtonSize(prev => Math.max(0.4, prev - 0.12));
    
    // Grow the Yes button
    setYesButtonSize(prev => Math.min(1.8, prev + 0.18));
    
    // Increment attempts
    setAttempts(prev => prev + 1);
  };

  const handleYesClick = () => {
    // Create celebration effect
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        setParticles(prev => [
          ...prev,
          {
            id: Date.now() + i,
            x: Math.random() * 100,
            y: 40 + Math.random() * 20
          }
        ]);
      }, i * 80);
    }

    // Navigate to success page
    setTimeout(() => {
      router.push('/yes');
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
      {/* Silk animated background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <Silk
          speed={5}
          scale={1}
          color="#ff0de7"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Floating particles - subtle */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed w-1 h-1 bg-white/30 rounded-full pointer-events-none z-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: 'float 8s ease-out forwards',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative text-center z-20 px-4 max-w-4xl mx-auto w-full">

        {/* Question - Handwriting style */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-8xl font-handwriting font-bold tracking-tight text-white mb-4 md:mb-6 animate-slideIn leading-tight">
          Will you be my
        </h1>
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-8xl font-handwriting-fancy font-normal tracking-tight mb-12 md:mb-20 animate-slideIn text-white bg-clip-text text-transparent leading-tight" style={{ animationDelay: '0.1s' }}>
          Valentine?
        </h2>

        {/* Buttons container */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12 px-4" style={{ minHeight: '80px' }}>
          {/* Yes button - Apple blue style */}
          <button
            onClick={handleYesClick}
            style={{
              transform: `scale(${yesButtonSize})`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            className="group relative bg-white text-black font-medium py-3 px-8 md:py-4 md:px-14 rounded-full text-base md:text-lg lg:text-xl overflow-hidden hover:scale-105 transition-transform w-full sm:w-auto max-w-xs"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Yes</span>
          </button>

          {/* No button (moves around) - subtle gray */}
          <button
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            onClick={handleNoHover}
            style={{
              position: attempts > 0 ? 'fixed' : 'relative',
              left: attempts > 0 ? `${noButtonPosition.x}px` : 'auto',
              top: attempts > 0 ? `${noButtonPosition.y}px` : 'auto',
              transform: `scale(${noButtonSize})`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 text-white/70 font-medium py-3 px-8 md:py-4 md:px-14 rounded-full text-base md:text-lg lg:text-xl hover:bg-white/10 hover:border-white/20 w-full sm:w-auto max-w-xs"
          >
            {noButtonTexts[Math.min(attempts, noButtonTexts.length - 1)]}
          </button>
        </div>

      </div>

      {/* Bottom text - Apple style */}
      <div className="fixed bottom-8 left-0 right-0 text-center z-20">
        <p className="text-gray-600 text-sm font-light">
          Made with love and a little bit of magic
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}