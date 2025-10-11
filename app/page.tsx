"use client";

import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';

interface Particle {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
  size: number;
  glowIntensity: number;
}

export default function Page() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate glowing firefly particles
    const generatedParticles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      generatedParticles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${15 + Math.random() * 15}s`,
        size: 1.5 + Math.random() * 2.5,
        glowIntensity: 8 + Math.random() * 12
      });
    }
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Red Glow Effect */}
      <div 
        className="absolute pointer-events-none glow-effect"
        style={{
          width: '80vw',
          height: '80vh',
          top: '-30%',
          right: '-30%',
          background: 'radial-gradient(circle, rgba(255, 87, 51, 0.6) 0%, rgba(255, 87, 51, 0.3) 40%, transparent 70%)',
          zIndex: 0,
          filter: 'blur(40px)'
        }}
      />

      {/* Glowing Firefly Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute firefly"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          >
            <div 
              className="rounded-full bg-white firefly-glow"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                boxShadow: `0 0 ${particle.glowIntensity}px rgba(255, 255, 255, 0.8), 0 0 ${particle.glowIntensity * 2}px rgba(255, 200, 150, 0.4)`,
                animationDelay: particle.delay
              }}
            />
          </div>
        ))}
      </div>

      {/* Main Text */}
      <div 
        className="absolute inset-0 flex items-center justify-center px-4"
        style={{ zIndex: 1 }}
      >
        <h1 
          className="main-text text-white text-center"
          style={{
            fontFamily: 'Inter, Arial, Helvetica, sans-serif',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            textShadow: '0 4px 30px rgba(255, 255, 255, 0.7)',
            animation: 'textReveal 2s ease-in-out forwards',
            opacity: 0
          }}
        >
          BETTER THINGS
        </h1>
      </div>

      {/* Button - Desktop (Top Center) */}
      <button
        className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full glass-button transition-all duration-500"
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
          color: 'white',
          fontSize: '1.25rem',
          fontWeight: 600,
          zIndex: 2,
          animation: 'buttonFadeIn 1.5s ease-in-out 0.5s forwards',
          opacity: 0
        }}
        onClick={() => alert('Get in Touch clicked!')}
      >
        <Mail className="w-5 h-5" />
        <span>Get in Touch</span>
      </button>

      {/* Button - Mobile (Bottom Center) */}
      <button
        className="flex md:hidden items-center gap-2 px-5 py-2.5 rounded-full glass-button-mobile transition-all duration-500"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 'calc(100% - 48px)',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
          color: 'white',
          fontSize: '1.1rem',
          fontWeight: 600,
          zIndex: 2,
          animation: 'buttonFadeIn 1.5s ease-in-out 0.5s forwards',
          opacity: 0
        }}
        onClick={() => alert('Get in Touch clicked!')}
      >
        <Mail className="w-5 h-5" />
        <span>Get in Touch</span>
      </button>
    </div>
  );
}