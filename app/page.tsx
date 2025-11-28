"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { Mail, Copy } from 'lucide-react';
import BrandStrip from '../components/ui/brand-strip';

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

// Sample portfolio data - first two are Coverly and MakeEbook with logos
const portfolioData: Omit<PortfolioItem, 'loaded'>[] = [
  {
    id: 1,
    title: "Coverly",
    category: "Book Cover Generator Platform",
    image: "/coverly-logo.svg"
  },
  {
    id: 2,
    title: "MakeEbook",
    category: "Ebook Creation Tool",
    image: "/make-ebook-logomark.svg"
  },
  { id: 3, title: "Christianity Explored", category: "Event Flyer Design", image: "/christianity-explored.jpg" },
  { id: 4, title: "If Heaven Were Opened", category: "Event Flyer Design", image: "/if-heaven.jpg" },
  { id: 5, title: "The Man Who", category: "Event Flyer Design", image: "/man-who.jpg" },
  { id: 6, title: "Philippians", category: "Sermon Graphics", image: "/philippians.jpg" },
  { id: 7, title: "Missionary Pioneers", category: "Event Front Cover", image: "/pioneers.jpg" },
  { id: 8, title: "When I'm Gone", category: "Sermon Graphics", image: "/when-im-gone.jpg" },
  { id: 9, title: "Brownlow North", category: "Book Cover Design", image: "/brownlow.jpg" },
  { id: 10, title: "The Child's Story Bible", category: "Book Cover Design", image: "/childs-story.jpg" },
  { id: 11, title: "The Pastor of Kilsyth", category: "Book Cover Design", image: "/pastor-kilsyth.jpg" },
];

export default function Page() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [visibleItems, setVisibleItems] = useState(6);
  const [touchedCardId, setTouchedCardId] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const email = "hello@betterthings.design";

  useEffect(() => {
    setPortfolioItems(portfolioData.map(item => ({ ...item, loaded: false })));
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

  // No-op: removed old hero/email handlers for new layout

  const handleImageLoad = useCallback((id: number) => {
    setPortfolioItems(prev => prev.map(item => 
      item.id === id ? { ...item, loaded: true } : item
    ));
  }, []);

  // No-op: removed hero intersection observer for new layout

  // Entry observer for the explanatory copy section
  const copyRef = useRef<HTMLDivElement | null>(null);
  const [copyVisible, setCopyVisible] = useState(false);

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (!e) return;
      setCopyVisible(e.isIntersecting);
    }, { threshold: 0.12 });

    io.observe(el);
    return () => io.disconnect();
  }, [copyRef]);

  return (
    <div className="bt1042-root-layout">
      {/* Sidebar (left) */}
      <aside className="bt1042-sidebar">
        <div className="bt1042-sidebar-content">
          <div className="bt1042-logo">BETTER<br/>THINGS</div>
          <div className="bt1042-sidebar-section">
            <div className="bt1042-sidebar-title">We design for tomorrow</div>
            <div className="bt1042-sidebar-desc">
              Better Things is a creative design studio transforming ideas into unforgettable brand experiences.<br/><br/>
              We partner with visionaries from emerging start-ups to global leaders to create identities and products that resonate and endure.
            </div>
          </div>
          <div className="bt1042-sidebar-section bt1042-sidebar-contact">
            <div>Contact</div>
            <a href="mailto:hello@betterthings.design" className="bt1042-sidebar-email">hello@betterthings.design</a>
          </div>
          <div className="bt1042-sidebar-footer">
            <img src="/neilmcardle-avatar.png" alt="Neil McArdle" className="bt1042-sidebar-avatar" />
            <a href="https://neilmcardle.com" target="_blank" rel="noopener noreferrer">Founded by Neil McArdle</a>
          </div>
        </div>
      </aside>
      {/* Main content (right) */}
      <main className="bt1042-main-content">
        <div className="bt1042-projects">
          {portfolioItems.slice(0, visibleItems).map((item, index) => (
            <section key={item.id} className="bt1042-project-section">
              <div className="bt1042-project-image-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="bt1042-project-image"
                  style={{ opacity: item.loaded ? 1 : 0, transition: 'opacity 0.5s' }}
                  onLoad={() => setPortfolioItems(prev => prev.map(p => p.id === item.id ? { ...p, loaded: true } : p))}
                  loading="lazy"
                />
              </div>
              <div className="bt1042-project-meta">
                <div className="bt1042-project-title">
                  {item.title}
                  {item.title === "Coverly" && (
                    <a
                      href="https://coverly.figma.site/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginLeft: 4,
                        fontSize: '1.05rem',
                        color: '#888',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        opacity: 0.8,
                        transition: 'color 0.2s',
                        verticalAlign: 'middle',
                      }}
                      aria-label="Open Coverly in new tab"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18" height="18" viewBox="0 0 20 20" fill="none"
                        style={{ marginLeft: 0, marginBottom: 0, display: 'inline-block', verticalAlign: 'middle' }}
                      >
                        <path d="M7 13L13 7M13 7H8M13 7V12" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="3.75" y="3.75" width="12.5" height="12.5" rx="2.25" stroke="#888" strokeWidth="1.5"/>
                      </svg>
                    </a>
                  )}
                  {item.title === "MakeEbook" && (
                    <a
                      href="https://neilmcardle.com/make-ebook"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginLeft: 4,
                        fontSize: '1.05rem',
                        color: '#888',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        opacity: 0.8,
                        transition: 'color 0.2s',
                        verticalAlign: 'middle',
                      }}
                      aria-label="Open MakeEbook in new tab"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18" height="18" viewBox="0 0 20 20" fill="none"
                        style={{ marginLeft: 0, marginBottom: 0, display: 'inline-block', verticalAlign: 'middle' }}
                      >
                        <path d="M7 13L13 7M13 7H8M13 7V12" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="3.75" y="3.75" width="12.5" height="12.5" rx="2.25" stroke="#888" strokeWidth="1.5"/>
                      </svg>
                    </a>
                  )}
                </div>
                <div className="bt1042-project-category">{item.category}</div>
              </div>
            </section>
          ))}
          {/* Load more trigger */}
          {visibleItems < portfolioItems.length && (
            <div ref={loadMoreRef} style={{ height: '20px', margin: '40px 0' }} />
          )}
        </div>
      </main>
    </div>
  );
}

// Portfolio Card Component
interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  onImageLoad: (id: number) => void;
  touchedCardId: number | null;
  setTouchedCardId: (id: number | null) => void;
}

function PortfolioCard({ item, index, onImageLoad, touchedCardId, setTouchedCardId }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isTouched = touchedCardId === item.id;

  const handleTouchStart = () => {
    if (isTouched) {
      // If this card is already touched, untouched it
      setTouchedCardId(null);
    } else {
      // Touch this card (will automatically untouched any other card)
      setTouchedCardId(item.id);
    }
  };

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
      onTouchStart={handleTouchStart}
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