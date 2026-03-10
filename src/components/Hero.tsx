"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const terminalLines = [
  { text: "$ phantom haunt --url https://yourapp.com --ghosts 500", delay: 0 },
  { text: "", delay: 800 },
  { text: "👻 Summoning 500 phantoms...", delay: 1200 },
  { text: "   ├── 125 first-time visitors", delay: 1600 },
  { text: "   ├── 125 tech-savvy developers", delay: 1900 },
  { text: "   ├── 125 skeptical enterprise buyers", delay: 2200 },
  { text: "   └── 125 impatient mobile users", delay: 2500 },
  { text: "", delay: 2800 },
  { text: "⏱  Running simulation... done (28m 14s)", delay: 3200 },
  { text: "", delay: 3500 },
  { text: "📊 Séance Report Ready", delay: 3800 },
  { text: "   ├── 12 friction points found", delay: 4100 },
  { text: "   ├── 3 conversion blockers identified", delay: 4400 },
  { text: "   ├── Onboarding drop-off: 34% at step 3", delay: 4700 },
  { text: "   └── Pricing page confusion score: HIGH", delay: 5000 },
  { text: "", delay: 5300 },
  { text: "✓ Full report: https://tryphantom.dev/reports/abc123", delay: 5600 },
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.bgGlow} />
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Now in private beta
          </div>

          <h1 className={styles.headline}>
            AI that haunts your product
            <br />
            <span className={styles.accent}>before users do.</span>
          </h1>

          <p className={styles.sub}>
            Deploy hundreds of AI customers against your live product.
            <br />
            Find every friction point, conversion blocker, and confusion point
            in 30 minutes.
          </p>

          <div className={styles.ctas}>
            <a href="#pricing" className={styles.btnPrimary}>
              Start Haunting →
            </a>
            <a href="#demo" className={styles.btnSecondary}>
              See how it works
            </a>
          </div>

          <p className={styles.micro}>
            No credit card required · 3 free haunts · Setup in 60 seconds
          </p>
        </motion.div>

        <motion.div
          className={styles.terminal}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.terminalBar}>
            <div className={styles.terminalDots}>
              <span />
              <span />
              <span />
            </div>
            <span className={styles.terminalTitle}>terminal</span>
            <div />
          </div>
          <div className={styles.terminalBody}>
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={styles.terminalLine}>
                {line.text.startsWith("$") ? (
                  <>
                    <span className={styles.prompt}>$</span>
                    <span className={styles.command}>
                      {line.text.slice(2)}
                    </span>
                  </>
                ) : line.text.startsWith("✓") ? (
                  <span className={styles.success}>{line.text}</span>
                ) : line.text.startsWith("👻") ||
                  line.text.startsWith("⏱") ||
                  line.text.startsWith("📊") ? (
                  <span className={styles.info}>{line.text}</span>
                ) : (
                  <span className={styles.output}>{line.text}</span>
                )}
              </div>
            ))}
            {visibleLines < terminalLines.length && (
              <span className={styles.cursor} />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
