"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

// Helper to strip protocol and www.
function formatDisplayLink(url: string) {
  try {
    const u = new URL(url);
    let host = u.host.replace(/^www\./, "");
    let display = host + u.pathname;
    if (!display.endsWith("/")) display += "/";
    return display;
  } catch {
    return url;
  }
}

const CYAN = "#00f0e0"; // Pulsing cyan cursor color

const clients = [
  {
    id: 1,
    name: "Gatewick House & Gardens",
    logo: "/images/gatewick-house-logo.png",
    description: "Logo Design",
    link: {
      url: "https://www.instagram.com/gatewick_gardens/",
    }
  },
  {
    id: 2,
    name: "The Dan Roberts Group",
    logo: "/images/nuk-soo-logo.png",
    description: "Logo Design",
    link: {
      url: "https://danrobertsgroup.com/nuksoo/",
    }
  }
];

function ClientCard({ client, onMouseEnter, onMouseLeave }) {
  const descLines = client.description.split("\n");
  return (
    <div
      className="client-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tabIndex={-1}
    >
      <div className="card-content">
        <div className="logo-col">
          <div className="card-avatar-circle">
            <Image
              src={client.logo}
              alt={client.name}
              width={48}
              height={48}
              style={{
                borderRadius: "50%",
                background: "#232323",
                objectFit: "contain"
              }}
              unoptimized
            />
          </div>
        </div>
        <div className="info-col">
          <div className="client-name">{client.name}</div>
          {descLines.map((line, idx) => (
            <div className="client-desc" key={idx}>{line}</div>
          ))}
          <a
            className="client-link"
            href={client.link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {formatDisplayLink(client.link.url)}
          </a>
        </div>
      </div>
      <style jsx>{`
        .client-card {
          position: absolute;
          left: 60px;
          bottom: 65px;
          background: #000;
          color: #e6e6e6;
          border-radius: 20px;
          min-width: 300px;
          max-width: 330px;
          box-shadow: 0 8px 36px #000a;
          padding: 22px 20px 18px 20px;
          font-family: 'Fira Mono', 'Menlo', 'Consolas', monospace;
          z-index: 20;
          overflow: hidden;
          animation: fadeIn 0.13s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .card-content {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 15px;
        }
        .logo-col {
          flex: none;
          display: flex;
          align-items: flex-start;
        }
        .card-avatar-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2.5px solid #bbb;
          background: #181818;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .info-col {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
        }
        .client-name {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          line-height: 1.22;
          margin-bottom: 4px;
        }
        .client-desc {
          font-size: 12px;
          color: #bababa;
          margin-bottom: 4px; /* Reduced from 8px to 4px for 8-point system, tighter spacing */
        }
        .client-link {
          font-size: 10px;
          color: #1d9bf0;
          text-decoration: none;
          word-break: normal;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 180px;
          display: inline-block;
          /* Remove margin-top or set to 0 to keep spacing tight */
          margin-top: 0;
        }
        .client-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 650px) {
          .client-card {
            position: fixed !important;
            left: 16px !important;
            right: 16px !important;
            width: auto !important;
            max-width: calc(100vw - 32px) !important;
            bottom: 16px !important;
            min-width: 0;
            background: #000 !important;
            border-radius: 20px !important;
            box-shadow: 0 8px 36px #000a !important;
            padding: 14px 10px 14px 12px !important;
            z-index: 1000 !important;
            overflow: hidden !important;
          }
          .card-avatar-circle {
            width: 44px;
            height: 44px;
          }
          .client-link {
            font-size: 10px;
            max-width: 95vw;
          }
        }
      `}</style>
    </div>
  );
}

function PlusCard({ onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="client-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tabIndex={-1}
      style={{ minWidth: 220, maxWidth: 320 }}
    >
      <div className="main-info">
        <div className="client-name">Let's design better</div>
        <a
          className="client-link email-link"
          href="mailto:neil@betterthings.design"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="email-icon" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }}>
              <rect x="1.1" y="2.1" width="10.8" height="8.8" rx="1.5" stroke="#1d9bf0" strokeWidth="1.2" fill="none"/>
              <path d="M2.5 3.5L6.5 7L10.5 3.5" stroke="#1d9bf0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          neil@betterthings.design
        </a>
      </div>
      <style jsx>{`
        .client-card {
          position: absolute;
          left: 60px;
          bottom: 65px;
          background: #000;
          color: #e6e6e6;
          border-radius: 20px;
          box-shadow: 0 4px 24px #000a;
          padding: 18px 18px 15px 18px;
          font-family: 'Fira Mono', 'Menlo', 'Consolas', monospace;
          z-index: 20;
          overflow: hidden;
          animation: fadeIn 0.16s;
        }
        .main-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .client-name {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }
        .client-link {
          font-size: 10px;
          color: #1d9bf0;
          text-decoration: none;
          word-break: break-all;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 0; /* Tighten spacing above link */
        }
        .client-link:hover {
          text-decoration: underline;
        }
        .email-icon {
          display: inline-flex;
          align-items: center;
          margin-right: 2px;
        }
        @media (max-width: 650px) {
          .client-card {
            position: fixed !important;
            left: 16px !important;
            right: 16px !important;
            width: auto !important;
            max-width: calc(100vw - 32px) !important;
            bottom: 16px !important;
            min-width: 0;
            background: #000 !important;
            border-radius: 20px !important;
            box-shadow: 0 8px 36px #000a !important;
            padding: 14px 10px 14px 12px !important;
            z-index: 1000 !important;
            overflow: hidden !important;
          }
          .client-link {
            font-size: 10px;
            max-width: 95vw;
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [openIdx, setOpenIdx] = useState(null);
  const closeTimeout = useRef();

  function open(i) {
    clearTimeout(closeTimeout.current);
    setOpenIdx(i);
  }

  function close(i, withDelay = true) {
    clearTimeout(closeTimeout.current);
    if (withDelay) {
      closeTimeout.current = setTimeout(() => {
        setOpenIdx(null);
      }, 120);
    } else {
      setOpenIdx(null);
    }
  }

  React.useEffect(() => {
    document.body.style.overflowY = "scroll";
    return () => {
      document.body.style.overflowY = "";
    };
  }, []);

  return (
    <div
      style={{
        background: "#212121",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div className="terminal-content">
        <div>Look.</div>
        <div style={{ marginTop: "2.5rem" }}>I build ideas.</div>
        <div style={{ marginTop: "2.5rem" }}>I do not have a niche to sell you.</div>
        <div style={{ marginTop: "2.5rem" }}>
          Instead, for you, I am convinced of better things.
        </div>
        <div style={{ marginTop: "2.5rem" }}>
          <span className="flashing-cursor" />
        </div>
        <div className="client-circles-row">
          {clients.map((c, i) => (
            <div
              className={
                "client-circle" + (openIdx === i ? " client-circle-active" : "")
              }
              key={c.id}
              tabIndex={0}
              aria-label={`Show profile card for ${c.name}`}
              onMouseEnter={() => open(i)}
              onFocus={() => open(i)}
              onMouseLeave={() => close(i)}
              onBlur={() => close(i)}
              onClick={e => {
                e.preventDefault();
                open(i);
              }}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") open(i);
                if (e.key === "Escape") close(i, false);
              }}
              style={{ zIndex: openIdx === i ? 21 : 1, position: "relative" }}
            >
              <span className="circle-avatar">
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={40}
                  height={40}
                  style={{
                    objectFit: "contain",
                    borderRadius: "50%",
                    background: "#232323",
                    border: "none"
                  }}
                  unoptimized
                />
              </span>
              {openIdx === i && (
                <ClientCard
                  client={c}
                  onMouseEnter={() => open(i)}
                  onMouseLeave={() => close(i)}
                />
              )}
            </div>
          ))}
          <div
            className={
              "client-circle plus" + (openIdx === clients.length ? " client-circle-active" : "")
            }
            tabIndex={0}
            aria-label="Contact to become a client"
            onMouseEnter={() => open(clients.length)}
            onFocus={() => open(clients.length)}
            onMouseLeave={() => close(clients.length)}
            onBlur={() => close(clients.length)}
            onClick={e => {
              e.preventDefault();
              open(clients.length);
            }}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") open(clients.length);
              if (e.key === "Escape") close(clients.length, false);
            }}
            style={{
              zIndex: openIdx === clients.length ? 21 : 1,
              position: "relative"
            }}
          >
            <span className="circle-avatar">
              <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" style={{ display: "block" }}>
                <rect x="0" y="0" width="34" height="34" rx="17" fill="#232323" />
                <path d="M17 11v12M11 17h12" stroke={CYAN} strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </span>
            {openIdx === clients.length && (
              <PlusCard
                onMouseEnter={() => open(clients.length)}
                onMouseLeave={() => close(clients.length)}
              />
            )}
          </div>
        </div>
        <style jsx>{`
          @keyframes blink {
            to {
              opacity: 0;
            }
          }
          .terminal-content {
            margin-top: 80px;
            font-family: 'Fira Mono', 'Menlo', 'Consolas', monospace;
            color: #e0e0e0;
            font-size: 1.19rem;
            line-height: 2.2rem;
            max-width: 900px;
            word-break: break-word;
            margin-left: 0;
          }
          .flashing-cursor {
            display: inline-block;
            width: 2px;
            height: 2rem;
            background: #00f0e0;
            animation: blink 1.6s steps(2, start) infinite;
          }
          .client-circles-row {
            display: flex;
            gap: 2rem;
            margin-top: 3.2rem;
            margin-bottom: 2rem;
            justify-content: flex-start;
            position: relative;
          }
          .client-circle {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #232323;
            border: 2.5px solid rgba(220,220,220,0.23);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: border-color 0.18s, box-shadow 0.16s, background 0.22s, opacity 0.2s, filter 0.2s;
            outline: none;
            position: relative;
            box-shadow: 0 2px 10px #0003;
            opacity: 0.38;
          }
          .client-circle-active,
          .client-circle:focus,
          .client-circle:hover {
            border-color: #fff;
            background: #282828;
            opacity: 1;
          }
          .circle-avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: none;
          }
          .plus .circle-avatar svg {
            width: 34px;
            height: 34px;
            display: block;
          }
          @media (max-width: 650px) {
            .terminal-content {
              margin-left: 16px;
              margin-right: 0;
              font-size: 1.08rem;
            }
            .client-circles-row {
              gap: 1.1rem;
              margin-top: 1.6rem;
              margin-bottom: 1.2rem;
            }
            .client-circle {
              width: 52px;
              height: 52px;
              min-width: 52px;
              min-height: 52px;
            }
            .circle-avatar {
              width: 40px;
              height: 40px;
              min-width: 40px;
              min-height: 40px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}