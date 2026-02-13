'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Silk from '@/components/Silk';
import Masonry from '@/components/Masonry';

export default function YesPage() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; rotation: number; size: number }>>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Masonry gallery items - CORRECTED: Changed .jpeg to .jpg
  const masonryItems = [
    {
      id: "1",
      img: "/images/11.jpg",
      url: "#",
      height: 900,
    },
    {
      id: "2",
      img: "/images/12.jpg",
      url: "#",
      height: 750,
    },
    {
      id: "3",
      img: "/images/13.jpg",
      url: "#",
      height: 800,
    },
    {
      id: "4",
      img: "/images/14.jpg",
      url: "#",
      height: 800,
    },
    {
      id: "5",
      img: "/images/15.jpg",
      url: "#",
      height: 850,
    },
    {
      id: "6",
      img: "/images/16.jpg",
      url: "#",
      height: 700,
    },
    {
      id: "7",
      img: "/images/17.jpg",
      url: "#",
      height: 700,
    },
    {
      id: "8",
      img: "/images/18.jpg",
      url: "#",
      height: 700,
    },
    {
      id: "9",
      img: "/images/19.jpg",
      url: "#",
      height: 700,
    },
  ];

  useEffect(() => {
    // Show message with stagger
    setTimeout(() => setShowMessage(true), 300);
    setTimeout(() => setImageLoaded(true), 800);

    // Create elegant particle effect
    const createParticles = () => {
      for (let i = 0; i < 40; i++) {
        setTimeout(() => {
          setParticles(prev => [
            ...prev,
            {
              id: Date.now() + i,
              x: Math.random() * 100,
              y: -5,
              rotation: Math.random() * 360,
              size: Math.random() * 4 + 2
            }
          ]);
        }, i * 60);
      }
    };

    createParticles();
    const interval = setInterval(createParticles, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Remove old particles
    const cleanupInterval = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 6000));
    }, 1000);

    return () => clearInterval(cleanupInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Silk animated background */}
      <div className="fixed inset-0 overflow-hidden">
        <Silk
          speed={5}
          scale={1}
          color="#ff0de7"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Elegant particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed rounded-full pointer-events-none bg-gradient-to-br from-pink-400 to-red-400 z-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `rotate(${particle.rotation}deg)`,
            animation: 'float 6s ease-out forwards',
            opacity: 0.6
          }}
        />
      ))}

      {/* Main content - scrollable */}
      <div className="relative z-10 w-full py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Success icon */}
          <div className={`mb-8 md:mb-12 text-center transition-all duration-700 ${showMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-xl border border-white/20 mb-6 md:mb-8">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Main heading */}
          <h1 className={`text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-handwriting-bold tracking-tight text-white mb-6 md:mb-8 leading-tight transition-all duration-700 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Perfect.
          </h1>

          <p className={`text-center text-lg md:text-xl lg:text-2xl text-gray-400 mb-12 md:mb-16 font-light transition-all duration-700 delay-100 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            You just made the best decision ever.
          </p>

          {/* Content card - glassmorphism with Masonry Gallery */}
          <div className={`backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-12 lg:p-16 mb-6 md:mb-8 transition-all duration-700 delay-200 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            <p className="text-center text-xl md:text-3xl lg:text-4xl font-handwriting font-semibold text-white mb-6 md:mb-8 leading-tight">
              Are you ready to create
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-red-400 to-pink-500 bg-clip-text text-transparent font-handwriting-fancy text-2xl md:text-4xl lg:text-5xl">
                something beautiful again?
              </span>
            </p>

            <p className="text-center text-sm md:text-base lg:text-lg text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Just like every year, we'll create moments that matter, memories that last,
              and another unforgettable chapter of our love story.
              Hand in hand, heart to heart, let's turn simple moments into forever memories.
              With you, every year feels magical — and this one will be our most beautiful yet.
            </p>

            {/* Masonry Gallery */}
            <div className="w-full mx-auto mb-8 md:mb-12">
              <Masonry
                items={masonryItems}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover
                hoverScale={0.95}
                blurToFocus
                colorShiftOnHover={false}
              />
            </div>

            {/* Quote */}
            <div className="border-l-2 border-pink-500/50 pl-4 md:pl-6 mb-6 md:mb-8 text-left mt-12">
              <p className="text-base md:text-xl lg:text-2xl font-light text-white/90 italic leading-relaxed">
                "The best things in life are the people we love, the places we've been,
                and the memories we've made along the way."
              </p>
            </div>

            {/* Feature list - Apple style */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-6 md:mb-8">
              <div className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">🌹</div>
                <h3 className="text-white font-medium mb-1 md:mb-2 text-sm md:text-base">Thoughtful</h3>
                <p className="text-gray-400 text-xs md:text-sm font-light">Every moment carefully crafted</p>
              </div>
              <div className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">✨</div>
                <h3 className="text-white font-medium mb-1 md:mb-2 text-sm md:text-base">Magical</h3>
                <p className="text-gray-400 text-xs md:text-sm font-light">Creating unforgettable experiences</p>
              </div>
              <div className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">💖</div>
                <h3 className="text-white font-medium mb-1 md:mb-2 text-sm md:text-base">Genuine</h3>
                <p className="text-gray-400 text-xs md:text-sm font-light">From the heart, always</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              href="/"
              className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium py-3 px-6 md:py-4 md:px-8 rounded-full text-sm md:text-base hover:bg-white/20 transition-all duration-300 hover:scale-105 ${showMessage ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to question
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 py-8 text-center">
        <p className="text-gray-600 text-sm font-light">
          You + Me = Forever 💞
        </p>
      </div>
    </div>
  );
}