"use client";

import { useState, useEffect } from "react";
import "./stylesheet.css";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {

    const card = document.querySelector(".opening-card");
    const overlay = document.querySelector(".video-dark-overlay");
    const title = document.querySelector(".opening-title");
    const times = document.querySelector(".opening-times");

    const handleScroll = () => {

      const scroll = Math.round(window.scrollY);

      const parallax = Math.round(Math.min(scroll * 0.7, 260));
      const opacity = Math.min(scroll / 180, 1);
      const darkness = Math.min(scroll / 300, 0.55);

      if (card) {
        card.style.transform = `translate3d(0, ${-parallax}px, 0)`;
      }

      if (overlay) {
        overlay.style.opacity = darkness;
      }

      if (title) {
        title.style.opacity = opacity;
      }

      if (times) {
        times.style.opacity = opacity;
      }

    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

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

        <div className="video-dark-overlay" />

        <div className="hero-title">
          <span className="hero-title-main">BARBERSHOP</span>
          <span className="hero-title-sub">Men’s Hair & Beard</span>
        </div>

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

      <section id="opening" className="opening-card">

        <div className="opening-card-inner">

          <h2 className="opening-title">
            Öffnungszeiten
          </h2>

          <div className="opening-times">

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

        </div>

      </section>

    </main>
  );
}