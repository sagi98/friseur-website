"use client";

import { useState, useEffect } from "react";
import "./stylesheet.css";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallax = Math.min(scrollY * 0.7, 260);
  const titleOpacity = Math.min(scrollY / 180, 1);
  const videoDarkness = Math.min(scrollY / 300, 0.55);


  const scrollToOpening = () => {
  const section = document.getElementById("opening");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
};

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

        <div
          className="video-dark-overlay"
          style={{ opacity: videoDarkness }}
        />


        <div className="hero-title">
          <span className="hero-title-main">BARBERSHOP</span>
          <span className="hero-title-sub">Men’s Hair & Beard</span>
        </div>

        {/* ICON BUTTONS */}
        <div className="hero-actions">


          <button className="hero-action" onClick={scrollToOpening}>
            <div className="hero-icon-wrapper">
              <svg viewBox="0 0 24 24" className="hero-icon">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </div>
            <span>Öffnungszeiten</span>
          </button>


          <button className="hero-action">
            <div className="hero-icon-wrapper">
              <svg viewBox="0 0 24 24" className="hero-icon">
                <circle cx="9" cy="8" r="3" />
                <circle cx="16" cy="9" r="2.5" />
                <path d="M4 18c0-3 3-5 5-5s5 2 5 5" />
                <path d="M14 18c0-2 2-3.5 4-3.5S22 16 22 18" />
              </svg>
            </div>
            <span>Unser Team</span>
          </button>


          <button className="hero-action">
            <div className="hero-icon-wrapper">
              <svg viewBox="0 0 24 24" className="hero-icon">
                <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>
            <span>Kontakt</span>
          </button>

        </div>

      </section>

      {/* OPENING HOURS CARD */}

      <section
        id="opening"
        className="opening-card"
        style={{ transform: `translateY(${-parallax}px)` }}
      >

       <h2
          className="opening-title"
          style={{ opacity: titleOpacity }}
        >
          Öffnungszeiten
      </h2>

        <div className="opening-times" style={{ opacity: titleOpacity }}>

          <div className="opening-row">
            <span>Montag – Freitag</span>
            <span>09:00 – 19:00</span>
          </div>

          <div className="opening-row">
            <span>Samstag</span>
            <span>09:00 – 17:00</span>
          </div>

          <div className="opening-row">
            <span>Sonntag</span>
            <span>Geschlossen</span>
          </div>

        </div>

      </section>

    </main>
  );
}