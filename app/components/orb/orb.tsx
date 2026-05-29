"use client";

import { useOrbState } from "./useOrbState";
import styles from "./orb.module.css";
import clsx from "clsx";

export function Orb() {
  const state = useOrbState((s) => s.state);
  const volume = useOrbState((s) => s.volume);

  // Dynamically scale the orb and glow based on voice volume
  const scale = 1 + volume * 0.4;
  const glowIntensity = 15 + volume * 45;

  return (
    <div className={styles.container}>
      {/* Background radial ambient glow */}
      <div
        className={clsx(styles.ambientGlow, styles[state])}
        style={{
          transform: `scale(${scale * 0.9})`,
          opacity: state === "idle" ? 0.35 : 0.6 + volume * 0.4,
        }}
      />

      {/* Main interactive Orb sphere */}
      <div
        className={clsx(styles.orb, styles[state])}
        style={{
          transform: `scale(${scale})`,
          boxShadow: `
            0 0 ${glowIntensity}px var(--glow-color),
            inset 0 0 25px rgba(255, 255, 255, 0.2),
            inset 0 10px 15px rgba(255, 255, 255, 0.25),
            inset 0 -10px 20px rgba(0, 0, 0, 0.4)
          `,
        }}
      >
        {/* Shimmer/Reflection overlay */}
        <div className={styles.reflection} />

        {/* Center glowing core */}
        <div className={styles.core} />

        {/* Orbiting Ring 1 */}
        <div className={styles.ring} />

        {/* Orbiting Ring 2 */}
        <div className={styles.ring2} />
      </div>

      {/* Status visual tag */}
      <div className={styles.statusLabel}>
        {state === "idle" && <span className={styles.idleText}>Tap to Start</span>}
        {state === "listening" && <span className={styles.listeningText}>Listening...</span>}
        {state === "thinking" && <span className={styles.thinkingText}>Thinking...</span>}
        {state === "speaking" && <span className={styles.speakingText}>Assistant Speaking</span>}
      </div>
    </div>
  );
}