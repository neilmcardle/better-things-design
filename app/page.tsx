"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

// Helper to strip the protocol and www. from URLs for display
function formatDisplayLink(url: string) {
  try {
    const u = new URL(url);
    let display = u.host.replace(/^www\./, "") + u.pathname;
    if (!display.endsWith("/")) display += "/";
    return display;
  } catch {
    return url;
  }
}

const clients = [
  {
    id: 1,
    name: "Gatewick House & Gardens",
    logo: "/images/gatewick-house-logo.png",
    description: "Logo and signage design",
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

function ClientCard({ client, onClose, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="client-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tabIndex={-1}
    >
      <button
        className="close-btn"
        onClick={onClose}
        tabIndex={0}
        aria-label="Close profile card"
      >
        ×
      </button>
      <div className="card-content">
        <div className="logo-col">
          <Image
            src={client.logo}
            alt={client.name}
            width={56}
            height={56}
            className="client-logo"
            style={{
              borderRadius: 12,
              background: "#232323",
              objectFit: "contain",
              border: "1.5px solid #666",
              marginBottom: 4,
              marginRight: 0
            }}
            unoptimized
          />
        </div>
        <div className="info-col">
          <div className="client-name">{client.name}</div>
          <div className="client-desc">{client.description}</div>
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
          background: #181818;
          color: #e6e6e6;
          border-radius: 24px;
          min-width: 330px;
          max-width: 400px;
          box-shadow: 0 10px 48px #000a;
          padding: 24px 28px 22px 24px;
          font-family: 'Fira Mono', 'Menlo', 'Consolas', monospace;
          font-size: 15px;
          z-index: 20;
          animation: fadeIn 0.13s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .close-btn {
          position: absolute;
          top: 13px;
          right: 18px;
          background: none;
          border: none;
          color: #888;
          font-size: 1.32rem;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          transition: color 0.15s;
        }
        .close-btn:hover {
          color: #fff;
        }
        .card-content {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 20px;
        }
        .logo-col {
          flex: none;
          display: flex;
          align-items: flex-start;
        }
        .client-logo {
          box-shadow: 0 1.5px 8px #0002;
        }
        .info-col {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .client-name {
          font-size: 1.28rem;
          font-weight: 700;
          margin-bottom: 1px;
          color: #fff;
          line-height: 1.19;
        }
        .client-desc {
          font-size: 1.02rem;
          color: #bababa;
          margin-bottom: 3px;
        }
        .client-link {
          font-size: 0.92rem;
          color: #1d9bf0;
          text-decoration: none;
          margin-top: 0;
          word-break: normal;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 225px;
          display: inline-block;
          font-family: inherit;
        }
        .client-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 600px) {
          .client-card {
            min-width: unset;
            max-width: 98vw;
            left: 18px;
            bottom: 20px;
            padding: 12px 7px 10px 7px;
          }
          .client-logo {
            width: 44px !important;
            height: 44px !important;
          }
          .client-name { font-size: 1.08rem; }
          .client-link { max-width: 100px; }
        }
      `}</style>
    </div>
  );
}

function PlusCard({ onClose, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="client-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tabIndex={-1}
      style={{ minWidth: 280, maxWidth: 320 }}
    >
      <div className="main-info">
        <div className="client-name">Join the client list</div>
        {/* <div className="client-desc">Get in touch:</div> */}
        <a
          className="client-link"
          href="mailto:neil@betterthings.design"
          target="_blank"
          rel="noopener noreferrer"
        >
          neil@betterthings.design
        </a>
      </div>
      <button
        className="close-btn"
        onClick={onClose}
        tabIndex={0}
        aria-label="Close contact card"
      >
        ×
      </button>
      <style jsx>{`
        .client-card {
          position: absolute;
          left: 60px;
          bottom: 65px;
          background: #181818;
          color: #e6e6e6;
          border-radius: 20px;
          box-shadow: 0 4px 24px #000a;
          padding: 18px 18px 15px 18px;
          font-family: 'Fira Mono', 'Menlo', 'Consolas', monospace;
          font-size: 14px;
          z-index: 20;
          animation: fadeIn 0.16s;
        }
        .main-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .client-name {
          font-size: 16.5px;
          font-weight: 700;
          line-height: 1.18;
        }
        .client-desc {
          font-size: 13.5px;
          color: #bdbdbd;
        }
        .client-link {
          font-size: 13.5px;
          color: #1d9bf0;
          text-decoration: none;
          margin-top: 1px;
          word-break: break-all;
        }
        .client-link:hover {
          text-decoration: underline;
        }
        .close-btn {
          position: absolute;
          top: 7px;
          right: 12px;
          background: none;
          border: none;
          color: #888;
          font-size: 1.23rem;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          transition: color 0.15s;
        }
        .close-btn:hover {
          color: #fff;
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
              <Image
                src={c.logo}
                alt={c.name}
                width={40}
                height={40}
                style={{
                  objectFit: "contain",
                  borderRadius: 10,
                  background: "#222",
                  border: "none"
                }}
                unoptimized
              />
              {openIdx === i && (
                <ClientCard
                  client={c}
                  onClose={() => close(i, false)}
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
            <svg width="27" height="27" viewBox="0 0 28 28" aria-hidden="true" style={{ display: "block" }}>
              <circle cx="14" cy="14" r="13" fill="#232323" stroke="#666" strokeWidth="1.5"/>
              <path d="M14 8.5v11M8.5 14h11" stroke="#e6e6e6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {openIdx === clients.length && (
              <PlusCard
                onClose={() => close(clients.length, false)}
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
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: #232323;
            border: 2px solid rgba(100,100,100,0.18);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: border-color 0.18s, box-shadow 0.16s, background 0.22s, opacity 0.2s, filter 0.2s;
            outline: none;
            position: relative;
            box-shadow: 0 2px 10px #0002;
            opacity: 0.38;
          }
          .client-circle-active,
          .client-circle:focus,
          .client-circle:hover {
            border-color: #e0e0e0;
            background: #282828;
            opacity: 1;
          }
          .plus svg {
            width: 31px;
            height: 31px;
            display: block;
          }
        `}</style>
      </div>
    </div>
  );
}