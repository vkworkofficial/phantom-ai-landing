"use client";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className={styles.ghostIcon}>
            <path
              d="M16 2C10.477 2 6 6.477 6 12v14l3-3 3 3 3-3 3 3 3-3 3 3V12c0-5.523-4.477-10-10-10z"
              fill="#F97316"
            />
            <circle cx="12" cy="13" r="2" fill="#0A0A0F" />
            <circle cx="20" cy="13" r="2" fill="#0A0A0F" />
          </svg>
          <span className={styles.logoText}>phantom</span>
        </a>

        <div className={styles.links}>
          <a href="#problem">Problem</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>

        <div className={styles.actions}>
          <a href="#demo" className={styles.btnSecondary}>
            See Demo
          </a>
          <a href="#pricing" className={styles.btnPrimary}>
            Start Haunting →
          </a>
        </div>
      </div>
    </nav>
  );
}
