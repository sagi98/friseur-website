"use client";

import { useState, useEffect, useRef } from "react";
import "./stylesheet.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openingRef = useRef(null);
  const heroActionsRef = useRef(null);
  const heroActionsInitialTopRef = useRef(0);
  const heroActionsHeightRef = useRef(0);

  useEffect(() => {
    const openingCard = document.querySelector(".opening-card");
    const teamCard = document.querySelector(".team-card");
    const contactCard = document.querySelector(".contact-card");

    const overlay = document.querySelector(".video-dark-overlay");
    const title = document.querySelector(".opening-card .opening-title");
    const times = document.querySelector(".opening-card .opening-times");

    if (heroActionsRef.current) {
      const rect = heroActionsRef.current.getBoundingClientRect();
      heroActionsInitialTopRef.current = rect.top;
      heroActionsHeightRef.current = rect.height;
    }

    const handleScroll = () => {
      const scroll = Math.round(window.scrollY);

      /* GANZ OBEN: Startzustand beibehalten */
      if (scroll <= 0) {
        if (overlay) overlay.style.opacity = "0";

        if (title) title.style.opacity = "0";

        if (times) {
          times.style.opacity = "0";
          times.style.transform = "translateY(10px)";
        }

        if (openingCard) openingCard.style.transform = "translateZ(0)";
        if (teamCard) teamCard.style.transform = "translateZ(0)";
        if (contactCard) contactCard.style.transform = "translateZ(0)";

        return;
      }

      /* VIDEO DARKEN */
      const darkness = Math.min(scroll / 300, 0.55);
      if (overlay) overlay.style.opacity = String(darkness);

      /* OPENING TEXT */
      const titleOpacity = Math.min(scroll / 180, 1);
      const timesOpacity = Math.min(Math.max((scroll - 70) / 180, 0), 1);

      if (title) {
        title.style.opacity = String(titleOpacity);
      }

      if (times) {
        times.style.opacity = String(timesOpacity);
        times.style.transform = `translateY(${10 - timesOpacity * 10}px)`;
      }

      /* SIMPLE PARALLAX */
     const openingParallax = Math.round(Math.min(scroll * 0.7, 260));
     const teamParallax = Math.round(Math.min(scroll * 0.62, 260));
     const contactParallax = Math.round(Math.min(scroll * 0.26, 120));

          if (openingCard) {
        openingCard.style.transform = `translate3d(0, ${-openingParallax}px, 0)`;
      }

      if (teamCard) {
        teamCard.style.transform = `translate3d(0, ${-teamParallax}px, 0)`;
      }

      if (contactCard) {
        contactCard.style.transform = `translate3d(0, ${-contactParallax}px, 0)`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToOpening = () => {
  const section = openingRef.current;
  const heroActions = heroActionsRef.current;

  if (!section || !heroActions) return;

  const sectionTop = section.offsetTop;
  const heroActionsTop = heroActions.offsetTop;
  const heroActionsHeight = heroActions.offsetHeight;

 
  const overlap = heroActionsHeight * 3.1;

 
  let target = (sectionTop - heroActionsTop + overlap) / 0.7;

  
  if (target * 0.7 > 260) {
    target = sectionTop - heroActionsTop + overlap - 260;
  }

  window.scrollTo({
    top: Math.max(0, target),
    behavior: "smooth",
  });
};

  const getOpenStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minutes = now.getMinutes();

    const time = hour * 60 + minutes;

    const weekdayOpen = 9 * 60;
    const weekdayClose = 19 * 60;

    const saturdayOpen = 9 * 60;
    const saturdayClose = 17 * 60;

    if (day >= 1 && day <= 5) {
      return time >= weekdayOpen && time < weekdayClose;
    }

    if (day === 6) {
      return time >= saturdayOpen && time < saturdayClose;
    }

    return false;
  };

  const isOpen = getOpenStatus();

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

      <section className="hero-video">
        <video src="/salon.mp4" autoPlay muted loop playsInline />

        <div className="video-dark-overlay" />

        <div className="hero-title">
          <span className="hero-title-main">FRISEURSALON</span>
          <span className="hero-title-sub">Hair • Color • Style</span>
        </div>

        <div className="hero-actions" ref={heroActionsRef}>
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

      <section id="opening" className="opening-card" ref={openingRef}>
        <div className="opening-card-inner">
          <h2 className="opening-title">Öffnungszeiten</h2>

          <div className="opening-status">
            <span className={`status-dot ${isOpen ? "open" : "closed"}`}></span>
            <span className="status-text">
              {isOpen ? "Jetzt geöffnet" : "Jetzt geschlossen"}
            </span>
          </div>

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

      <section className="team-card">
        <div className="opening-card-inner">
          <h2 className="opening-title">Unser Team</h2>
        </div>
      </section>

      <section className="contact-card">
        <div className="opening-card-inner">
          <h2 className="opening-title">Kontakt</h2>
        </div>
      </section>
    </main>
  );
}