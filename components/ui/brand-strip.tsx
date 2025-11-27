import React from 'react';

export default function BrandStrip() {
  return (
    <section aria-labelledby="brands-heading" className="w-full bg-transparent">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col items-center">
        <h3
          id="brands-heading"
          className="text-sm"
          style={{
            color: '#9CA3AF',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 600,
            marginBottom: 12
          }}
        >
          Brands we've built
        </h3>

        <div className="flex items-center justify-center gap-12">
          <a
            href="https://neilmcardle.com/make-ebook"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit makeEbook"
            className="flex items-center justify-center p-0 hover:scale-105 transition-transform duration-200"
            title="makeEbook"
          >
            <img
              src="/dark-make-ebook-logomark.svg"
              alt="makeEbook logo"
              style={{ height: 56, width: 'auto', display: 'block' }}
              loading="lazy"
            />
          </a>

          <a
            href="https://coverly.figma.site"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Coverly"
            className="flex items-center justify-center p-0 hover:scale-105 transition-transform duration-200"
            title="Coverly"
          >
            <img
              src="/dark-coverly-logo.svg"
              alt="Coverly logo"
              style={{ height: 56, width: 'auto', display: 'block' }}
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
