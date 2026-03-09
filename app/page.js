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
      </section>
    </main>
  );
}