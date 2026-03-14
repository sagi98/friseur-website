"use client";

import { useState, useEffect, useRef } from "react";
import "./stylesheet.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [teamIndex, setTeamIndex] = useState(0);

  const openingRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);
  const socialRef = useRef(null);

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const metricsRef = useRef({
    openingTop: 0,
    teamTop: 0,
    contactTop: 0,
    socialTop: 0,
    openingMax: 0,
    teamMax: 0,
    contactMax: 0,
    socialMax: 0,
    contactDelayStart: 0,
    socialDelayStart: 0,
    revealRange: 180,
    overlayRange: 300,
  });

  const teamMembers = [
    {
      id: 1,
      name: "Arshad Al-Khidr",
      image: "/Arshad.png",
      role: "Gründer & Salonleitung",
      skills: ["Hair & Beard Specialist", "Color & Hairstyling", "ㅤ"],
      quote: "Ein guter Schnitt macht den Unterschied.",
      empty: false,
    },
    {
      id: 2,
      name: "Rewano Al-Khidr",
      image: "/Rewano.png",
      role: "Gründer & Salonleitung",
      skills: [
        "Friseurmeister",
        "Bachelor of Professional Hairstyling",
        "Color & Hairstyling",
      ],
      quote: "Schönheit liegt im Detail",
      empty: false,
    },
    { id: 3, name: "", image: "", role: "", skills: [], quote: "", empty: true },
    { id: 4, name: "", image: "", role: "", skills: [], quote: "", empty: true },
    { id: 5, name: "", image: "", role: "", skills: [], quote: "", empty: true },
  ];

  useEffect(() => {
    const openingCard = document.querySelector(".opening-card");
    const teamCard = document.querySelector(".team-card");
    const contactCard = document.querySelector(".contact-card");
    const socialCard = document.querySelector(".social-card");
    const teamControls = document.querySelector(".team-controls");

    const overlay = document.querySelector(".video-dark-overlay");
    const title = document.querySelector(".opening-card .opening-title");
    const status = document.querySelector(".opening-card .opening-status");
    const times = document.querySelector(".opening-card .opening-times");
    const openingInner = document.querySelector(".opening-card .opening-card-inner");

    if (!openingCard || !teamCard || !contactCard || !socialCard || !openingInner) return;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const getLinearParallax = (scroll, speed, max) => {
      return Math.round(Math.min(scroll * speed, max));
    };

    const getDelayedParallax = (scroll, delayStart, speed, max) => {
      if (scroll <= delayStart) return 0;
      return Math.round(Math.min((scroll - delayStart) * speed, max));
    };

    const measureLayout = () => {
      const viewportH = window.innerHeight;

      const openingTop = openingCard.offsetTop;
      const teamTop = teamCard.offsetTop;
      const contactTop = contactCard.offsetTop;
      const socialTop = socialCard.offsetTop;

      const openingHeight = openingCard.offsetHeight;
      const teamHeight = teamCard.offsetHeight;
      const contactHeight = contactCard.offsetHeight;
      const socialHeight = socialCard.offsetHeight;
      const teamControlsHeight = teamControls?.offsetHeight ?? 0;

      const openingBaseMax = Math.round(
        Math.min(viewportH * 0.28, openingHeight * 0.58, Math.max(viewportH * 0.19, 145))
      );

      const teamBaseMax = Math.round(
        Math.min(viewportH * 0.42, teamHeight * 0.5, Math.max(viewportH * 0.3, 250))
      );

      const contactBaseMax = Math.round(
        Math.min(viewportH * 0.46, contactHeight * 0.54, Math.max(viewportH * 0.3, 235))
      );

      const socialBaseMax = Math.round(
        Math.min(viewportH * 0.28, socialHeight * 0.42, Math.max(viewportH * 0.16, 120))
      );

      const openingMinVisible = clamp(viewportH * 0.25, 145, 210);
      const teamMinVisible = clamp(viewportH * 0.2, 120, 190);
      const contactMinVisible = clamp(viewportH * 0.18, 110, 170);

      const teamSafeMax = Math.max(
        0,
        teamTop - openingTop + openingBaseMax - openingMinVisible
      );

      const contactSafeMax = Math.max(
        0,
        contactTop - teamTop + teamBaseMax - teamMinVisible + teamControlsHeight * 0.9
      );

      const socialSafeMax = Math.max(
        0,
        socialTop - contactTop + contactBaseMax - contactMinVisible
      );

      const revealRange = Math.round(
        clamp(openingHeight * 0.42, 160, Math.max(viewportH * 0.25, 210))
      );

      const overlayRange = Math.round(clamp(viewportH * 0.34, 220, 360));

      const contactDelayStart = Math.round(
        Math.max(24, teamTop - viewportH * 0.56)
      );

      const socialDelayStart = Math.round(
        Math.max(contactDelayStart + 40, socialTop - viewportH * 0.62)
      );

      metricsRef.current = {
        openingTop,
        teamTop,
        contactTop,
        socialTop,
        openingMax: openingBaseMax,
        teamMax: Math.min(teamBaseMax, teamSafeMax),
        contactMax: Math.min(contactBaseMax, contactSafeMax),
        socialMax: Math.min(socialBaseMax, socialSafeMax),
        contactDelayStart,
        socialDelayStart,
        revealRange,
        overlayRange,
      };
    };

    let ticking = false;

    const updateScroll = () => {
      const scroll = Math.round(window.scrollY);
      const {
        openingMax,
        teamMax,
        contactMax,
        socialMax,
        contactDelayStart,
        socialDelayStart,
        revealRange,
        overlayRange,
      } = metricsRef.current;

      if (scroll <= 0) {
        if (overlay) overlay.style.opacity = "0";

        openingInner.style.background = `
          linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.35) 42%,
            rgba(0, 0, 0, 0.35) 100%
          )
        `;

        if (title) title.style.opacity = "0";

        if (status) {
          status.style.opacity = "0";
          status.style.transform = "translateY(10px)";
        }

        if (times) {
          times.style.opacity = "0";
          times.style.transform = "translateY(10px)";
        }

        openingCard.style.transform = "translate3d(0, 0, 0)";
        teamCard.style.transform = "translate3d(0, 0, 0)";
        contactCard.style.transform = "translate3d(0, 0, 0)";
        socialCard.style.transform = "translate3d(0, 0, 0)";
        ticking = false;
        return;
      }

      const darkness = Math.min(scroll / overlayRange, 0.55);
      if (overlay) overlay.style.opacity = String(darkness);

      {
        const openingRect = openingCard.getBoundingClientRect();
        const teamRect = teamCard.getBoundingClientRect();

        const triggerStart = openingRect.bottom - revealRange;
        const progress = (triggerStart - teamRect.top) / revealRange;
        const clamped = clamp(progress, 0, 1);

        const topDark = 0.35 + clamped * 0.34;
        const midDark = 0.35 + clamped * 0.22;
        const lowDark = 0.35 + clamped * 0.08;

        openingInner.style.background = `
          linear-gradient(
            to bottom,
            rgba(0, 0, 0, ${topDark}),
            rgba(0, 0, 0, ${midDark}) 42%,
            rgba(0, 0, 0, ${lowDark}) 100%
          )
        `;
      }

      {
        const openingRect = openingCard.getBoundingClientRect();
        const viewportH = window.innerHeight;

        const revealStart = viewportH - openingRect.top;
        const revealProgress = clamp(revealStart / revealRange, 0, 1);
        const timesProgress = clamp(
          (revealStart - revealRange * 0.34) / revealRange,
          0,
          1
        );

        if (title) title.style.opacity = String(revealProgress);

        if (status) {
          status.style.opacity = String(revealProgress);
          status.style.transform = `translateY(${10 - revealProgress * 10}px)`;
        }

        if (times) {
          times.style.opacity = String(timesProgress);
          times.style.transform = `translateY(${10 - timesProgress * 10}px)`;
        }
      }

      const openingParallax = getLinearParallax(scroll, 0.7, openingMax);
      const teamParallax = getLinearParallax(scroll, 0.65, teamMax);
      const contactParallax = getDelayedParallax(
        scroll,
        contactDelayStart,
        0.72,
        contactMax
      );
      const socialParallax = getDelayedParallax(
        scroll,
        socialDelayStart,
        0.68,
        socialMax
      );

      openingCard.style.transform = `translate3d(0, ${-openingParallax}px, 0)`;
      teamCard.style.transform = `translate3d(0, ${-teamParallax}px, 0)`;
      contactCard.style.transform = `translate3d(0, ${-contactParallax}px, 0)`;
      socialCard.style.transform = `translate3d(0, ${-socialParallax}px, 0)`;

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    };

    let resizeRaf = 0;

    const handleResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        measureLayout();
        handleScroll();
      });
    };

    measureLayout();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(openingCard);
    resizeObserver.observe(teamCard);
    resizeObserver.observe(contactCard);
    resizeObserver.observe(socialCard);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(resizeRaf);
    };
  }, []);

  const scrollToOpening = () => {
    const { openingTop, openingMax } = metricsRef.current;
    const target = solveLinearTarget(openingTop, 0.7, openingMax);

    window.scrollTo({
      top: Math.max(0, Math.round(target)),
      behavior: "smooth",
    });
  };

  const scrollToTeam = () => {
    const { teamTop, teamMax } = metricsRef.current;
    const target = solveLinearTarget(teamTop, 0.65, teamMax);

    window.scrollTo({
      top: Math.max(0, Math.round(target)),
      behavior: "smooth",
    });
  };

  const scrollToContact = () => {
    const { contactTop, contactMax } = metricsRef.current;
    const target = contactTop - contactMax;

    window.scrollTo({
      top: Math.max(0, Math.round(target)),
      behavior: "smooth",
    });
  };

  function solveLinearTarget(sectionTop, speed, max) {
    const saturationPoint = max / speed;
    const candidate = sectionTop / (1 + speed);

    if (candidate <= saturationPoint) return candidate;
    return sectionTop - max;
  }

  const nextTeam = () => {
    setTeamIndex((prev) => Math.min(prev + 1, teamMembers.length - 1));
  };

  const prevTeam = () => {
    setTeamIndex((prev) => Math.max(prev - 1, 0));
  };

  const onTeamTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const onTeamTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    if (deltaX < 0) {
      nextTeam();
    } else {
      prevTeam();
    }
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

  const openMaps = () => {
    const destination = encodeURIComponent("Marktstraße 133, 46045 Oberhausen");
    const ua = navigator.userAgent || "";

    const isAppleDevice =
      /iPhone|iPad|iPod/i.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    const url = isAppleDevice
      ? `https://maps.apple.com/?daddr=${destination}`
      : `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

    window.open(url, "_blank", "noopener,noreferrer");
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
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <section className="hero-video">
        <div className="hero-media">
          <video src="/salon.mp4" autoPlay muted loop playsInline />
          <div className="video-dark-overlay" />

          <div className="hero-title">
            <span className="hero-title-main">FRISEURSALON</span>
            <span className="hero-title-sub">Hair • Color • Style</span>
          </div>

          <div className="hero-actions">
            <button className="hero-action" onClick={scrollToOpening} type="button">
              <div className="hero-icon-wrapper">
                <svg viewBox="0 0 24 24" className="hero-icon">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <span>Öffnungszeiten</span>
            </button>

            <button className="hero-action" onClick={scrollToTeam} type="button">
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

            <button className="hero-action" onClick={scrollToContact} type="button">
              <div className="hero-icon-wrapper">
                <svg viewBox="0 0 24 24" className="hero-icon">
                  <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <span>Kontakt</span>
            </button>
          </div>
        </div>
      </section>

      <section id="opening" className="opening-card" ref={openingRef}>
        <div className="opening-card-inner opening-card-large">
          <div className="opening-content-shell">
            <h2 className="opening-title">Öffnungszeiten</h2>

            <div className="opening-status">
              <span className={`status-dot ${isOpen ? "open" : "closed"}`}></span>
              <span className="status-text">
                {isOpen ? "Jetzt geöffnet" : "Jetzt geschlossen"}
              </span>
            </div>

            <div className="opening-times">
              <div className="opening-row">
                <span className="opening-day">Montag – Freitag</span>
                <span className="opening-time">09:00 – 19:00</span>
              </div>

              <div className="opening-row">
                <span className="opening-day">Samstag</span>
                <span className="opening-time">09:00 – 17:00</span>
              </div>

              <div className="opening-row">
                <span className="opening-day">Sonntag</span>
                <span className="opening-time">Geschlossen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-card" ref={teamRef}>
        <div
          className="opening-card-inner team-card-inner"
          onTouchStart={onTeamTouchStart}
          onTouchEnd={onTeamTouchEnd}
        >
          <h2 className="opening-title team-title">Unser Team</h2>

          <div className="team-slider-window">
            <div
              className="team-slider-track"
              style={{ transform: `translate3d(-${teamIndex * 100}%, 0, 0)` }}
            >
              {teamMembers.map((member) => (
                <div className="team-slide" key={member.id}>
                  {!member.empty ? (
                    <div className="team-profile-card">
                      <div className="team-photo-wrap">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="team-photo"
                          draggable="false"
                        />
                      </div>

                      <div className="team-name-block">
                        <h3 className="team-name">{member.name}</h3>
                        <div className="team-role">{member.role}</div>
                        <div className="team-divider"></div>

                        <ul className="team-skills">
                          {member.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>

                        <div className="team-divider"></div>
                        <div className="team-quote">„{member.quote}“</div>
                      </div>
                    </div>
                  ) : (
                    <div className="team-profile-card team-profile-card-empty">
                      <div className="team-empty-text">Coming Soon</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="team-controls">
            <button
              className="team-arrow"
              onClick={prevTeam}
              aria-label="Vorheriger Mitarbeiter"
              disabled={teamIndex === 0}
              type="button"
            >
              ‹
            </button>

            <div className="team-dots">
              {teamMembers.map((member, index) => (
                <button
                  key={member.id}
                  className={`team-dot-nav ${index === teamIndex ? "active" : ""}`}
                  onClick={() => setTeamIndex(index)}
                  aria-label={`Mitarbeiter ${index + 1}`}
                  type="button"
                />
              ))}
            </div>

            <button
              className="team-arrow"
              onClick={nextTeam}
              aria-label="Nächster Mitarbeiter"
              disabled={teamIndex === teamMembers.length - 1}
              type="button"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="contact-card" ref={contactRef}>
        <div className="opening-card-inner contact-card-large">
          <div className="contact-content-shell">
            <h2 className="opening-title contact-title-visible">Kontakt</h2>

            <div className="contact-map-card">
              <div className="contact-address-panel">
                <div className="contact-address-label">Adresse</div>

                <div className="contact-address-line contact-address-street">
                  Marktstraße 133
                </div>

                <div className="contact-address-line contact-address-city">
                  46045 Oberhausen
                </div>

                <div className="contact-address-bottom">
                  <a className="contact-address-phone" href="tel:020874183626">
                    0208 / 741 836 26
                  </a>

                  <button
                    className="contact-go-button"
                    onClick={openMaps}
                    type="button"
                    aria-label="Route zu Marktstraße 133, 46045 Oberhausen öffnen"
                  >
                    Los
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-card" ref={socialRef}>
        <div className="social-card-inner">
          <h2 className="social-title">Social</h2>

          <div className="social-links">
            <a
              className="social-icon-link"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram öffnen"
            >
              <img src="/instagram-black.svg" alt="Instagram" className="social-icon" />
            </a>

            <a
              className="social-icon-link"
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok öffnen"
            >
              <img src="/tiktok-black.png" alt="TikTok" className="social-icon" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}