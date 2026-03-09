"use client";

import { useState } from "react";
import "./stylesheet.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="page">
      <header className="header">
        <div className="header-top">
          <div className="logo">
            <img src="/logo.png" alt="Arshad & Rewano Logo" />
          </div>

          <button
            className={`menu-button ${menuOpen ? "open" : ""}`}
            aria-label="Menü öffnen"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* VIDEO SECTION */}
      <section className="hero-video">
        <video
          src="/salon.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <h1 className="hero-title">HERRENSALON</h1>

        {/* OVERLAY BUTTONS */}
        <div className="hero-actions">

          {/* Öffnungszeiten */}
          <button className="hero-action">
            <svg viewBox="0 0 24 24" className="hero-icon">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span>Öffnungszeiten</span>
          </button>

          {/* Unser Team */}
          <button className="hero-action">
            <svg viewBox="0 0 24 24" className="hero-icon">
              <circle cx="9" cy="8" r="3" />
              <circle cx="16" cy="9" r="2.5" />
              <path d="M4 18c0-3 3-5 5-5s5 2 5 5" />
              <path d="M14 18c0-2 2-3.5 4-3.5S22 16 22 18" />
            </svg>
            <span>Unser Team</span>
          </button>

          {/* Kontakt */}
          <button className="hero-action">
            <svg viewBox="0 0 24 24" className="hero-icon">
              <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>Kontakt</span>
          </button>

        </div>

      </section>
    </main>
  );
}