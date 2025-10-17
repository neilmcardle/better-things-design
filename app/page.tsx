"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { Mail, Copy } from 'lucide-react';

interface Particle {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
  size: number;
  glowIntensity: number;
}

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  loaded: boolean;
}

// Sample portfolio data - replace with your actual work
const portfolioData: Omit<PortfolioItem, 'loaded'>[] = [
  { id: 1, title: "Christianity Explored", category: "Event Flyer Design", image: "/christianity-explored.jpg" },
  { id: 2, title: "If Heaven Were Opened", category: "Event Flyer Design", image: "/if-heaven.jpg" },
  { id: 3, title: "The Man Who", category: "Event Flyer Design", image: "/man-who.jpg" },
  { id: 4, title: "Philippians", category: "Sermon Graphics", image: "/philippians.jpg" },
  { id: 5, title: "Missionary Pioneers", category: "Event Front Cover", image: "/pioneers.jpg" },
  { id: 6, title: "When I'm Gone", category: "Sermon Graphics", image: "/when-im-gone.jpg" },
  { id: 7, title: "Brownlow North", category: "Book Cover Design", image: "/brownlow.jpg" },
  { id: 8, title: "The Child's Story Bible", category: "Book Cover Design", image: "/childs-story.jpg" },
  { id: 9, title: "The Pastor of Kilsyth", category: "Book Cover Design", image: "/pastor-kilsyth.jpg" },
];

export default function Page() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [visibleItems, setVisibleItems] = useState(6);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const email = "hello@betterthings.design";

  useEffect(() => {
    // Initialize portfolio items
    setPortfolioItems(portfolioData.map(item => ({ ...item, loaded: false })));
    
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

  // Lazy loading for infinite scroll
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && visibleItems < portfolioItems.length) {
          setVisibleItems(prev => Math.min(prev + 6, portfolioItems.length));
        }
      });
    });

    if (loadMoreRef.current && observerRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [visibleItems, portfolioItems.length]);

  const handleScrollToGallery = () => {
    const galleryElement = document.querySelector('.portfolio-gallery');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleButtonClick = () => {
    setShowEmail((prev: boolean) => !prev);
    setCopied(false);
  };

  const handleCopyClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      // fallback or error handling
    }
  };

  const handleImageLoad = useCallback((id: number) => {
    setPortfolioItems(prev => prev.map(item => 
      item.id === id ? { ...item, loaded: true } : item
    ));
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden bg-black">
        {/* Conic Gradient Glow Effect */}
        <div 
          className="absolute pointer-events-none glow-effect"
          style={{
            width: '80vw',
            height: '80vh',
            top: '-30%',
            right: '-30%',
            background: 'conic-gradient(from 90deg at 35% -1% in lab, rgb(255,255,255) 7.2deg, rgb(255,208,134) 14.4deg, rgba(17,17,17,0) 36deg, rgba(17,17,17,0) 342deg, rgb(255,255,255) 360deg)',
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
                  animationDelay: `${particle.delay}, ${Math.random() * 4}s`,
                  animationDuration: `${particle.duration}, 4s`
                }}
              />
            </div>
          ))}
        </div>

        {/* Main Text */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          style={{ zIndex: 1 }}
        >
          <h1 
            className="main-text text-white text-center mb-8"
            style={{
              fontFamily: 'Inter, Arial, Helvetica, sans-serif',
              fontWeight: 800,
              letterSpacing: 'calc(-0.04em - 2px)',
              textShadow: '0 2px 8px rgba(255, 255, 255, 0.35)',
              animation: 'textReveal 2s ease-in-out forwards',
              opacity: 0
            }}
          >
            BETTER THINGS
          </h1>
          
          {/* Scroll Indicator */}
          <div 
            className="scroll-indicator absolute bottom-16 animate-bounce cursor-pointer"
            style={{
              animation: 'scrollIndicator 2s ease-in-out 3s forwards, bounce 2s infinite 3s',
              opacity: 0
            }}
            onClick={handleScrollToGallery}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.6)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M7 13l3 3 3-3"></path>
              <path d="M7 6l3 3 3-3"></path>
            </svg>
          </div>
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
          onClick={handleButtonClick}
        >
          <Mail className="w-5 h-5" />
          {showEmail ? (
            <>
              <span>{email}</span>
              <span
                title={copied ? "Copied!" : "Copy"}
                style={{ cursor: "pointer", display: "flex", alignItems: "center", marginLeft: 6, position: "relative" }}
                onClick={handleCopyClick}
              >
                <Copy className={`w-5 h-5 ${copied ? "text-green-400" : ""}`} />
                {copied && (
                  <span
                    style={{
                      marginLeft: 4,
                      fontSize: '0.95em',
                      color: "#22c55e",
                      fontWeight: 500,
                      transition: "opacity 0.2s",
                      opacity: copied ? 1 : 0,
                      position: "relative",
                    }}
                  >
                    Copied
                  </span>
                )}
              </span>
            </>
          ) : (
            <span>The Future Is Yours</span>
          )}
        </button>

        {/* Button - Mobile (Bottom Center) */}
        <button
          className="flex md:hidden items-center gap-2 px-5 py-2.5 rounded-full glass-button-mobile transition-all duration-500 whitespace-nowrap"
          style={{
            position: 'fixed',
            bottom: '44px', // Ensures at least 16px above the footer
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
          onClick={handleButtonClick}
        >
          <Mail className="w-5 h-5" />
          {showEmail ? (
            <>
              <span className="whitespace-nowrap">{email}</span>
              <span
                title={copied ? "Copied!" : "Copy"}
                style={{ cursor: "pointer", display: "flex", alignItems: "center", marginLeft: 6, position: "relative" }}
                onClick={handleCopyClick}
              >
                <Copy className={`w-5 h-5 ${copied ? "text-green-400" : ""}`} />
                {copied && (
                  <span
                    style={{
                      marginLeft: 4,
                      fontSize: '0.95em',
                      color: "#22c55e",
                      fontWeight: 500,
                      transition: "opacity 0.2s",
                      opacity: copied ? 1 : 0,
                      position: "relative",
                    }}
                  >
                    Copied
                  </span>
                )}
              </span>
            </>
          ) : (
            <span className="whitespace-nowrap">The Future Is Yours</span>
          )}
        </button>

        {/* Footer: Founded by Neil McArdle with miniature profile pic */}
        <div
          style={{
            position: 'fixed',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.82rem',
            color: '#bbb',
            gap: '6px',
          }}
        >
          <img
            src="/neilmcardle-avatar.png"
            alt="Neil McArdle"
            style={{
              width: 20,
              height: 20,
              objectFit: 'cover',
              borderRadius: '50%',
              border: '1px solid #eee',
            }}
          />
          <a
            href="https://neilmcardle.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#bbb',
              textDecoration: 'underline',
              fontWeight: 400,
              letterSpacing: '-0.5px',
            }}
          >
            Founded by Neil McArdle
          </a>
        </div>
      </div>

      {/* Portfolio Gallery */}
      <div 
        className="portfolio-gallery"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#000',
          zIndex: 1,
          padding: '80px 20px 40px',
        }}
      >
        <div 
          className="gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '8px',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          {portfolioItems.slice(0, visibleItems).map((item, index) => (
            <PortfolioCard 
              key={item.id} 
              item={item} 
              index={index}
              onImageLoad={handleImageLoad}
            />
          ))}
        </div>
        
        {/* Load more trigger */}
        {visibleItems < portfolioItems.length && (
          <div 
            ref={loadMoreRef}
            style={{
              height: '20px',
              margin: '40px 0',
            }}
          />
        )}
      </div>
    </div>
  );
}

// Portfolio Card Component
interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  onImageLoad: (id: number) => void;
}

function PortfolioCard({ item, index, onImageLoad }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  return (
    <div
      className="portfolio-card group"
      style={{
        position: 'relative',
        aspectRatio: '1',
        backgroundColor: '#111',
        overflow: 'hidden',
        cursor: 'pointer',
        opacity: 0,
        borderRadius: '8px',
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsTouched(!isTouched)}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.3s ease, opacity 0.3s ease, filter 0.4s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          opacity: item.loaded ? 1 : 0,
          filter: (isHovered || isTouched) ? 'grayscale(0%)' : 'grayscale(100%)',
        }}
        onLoad={() => onImageLoad(item.id)}
        loading="lazy"
      />
      
      {/* Loading placeholder */}
      {!item.loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid #333',
              borderTop: '2px solid #fff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      )}
      
      {/* Overlay with text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '20px',
          opacity: (isHovered || isTouched) ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <h3
          style={{
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 600,
            margin: 0,
            marginBottom: '4px',
            fontFamily: 'Inter, Arial, Helvetica, sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.85rem',
            fontWeight: 400,
            margin: 0,
            fontFamily: 'Inter, Arial, Helvetica, sans-serif',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          }}
        >
          {item.category}
        </p>
      </div>
    </div>
  );
}