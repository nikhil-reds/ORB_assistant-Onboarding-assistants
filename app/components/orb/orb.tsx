"use client";

import { useOrbState } from "./useOrbState";
import styles from "./orb.module.css";
import clsx from "clsx";

// Fixed particle set (deterministic positions/delays via index).
const PARTICLES = Array.from({ length: 16 }, (_, i) => i);

export function Orb() {
  const state = useOrbState((s) => s.state);
  const volume = useOrbState((s) => s.volume);

  // Volume drives subtle scale + core glow intensity (coreGlowIntensity analogue).
  const scale = 1 + volume * 0.16;
  const intensity = 0.85 + volume * 0.9;

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        {/* Outer colored shadow / ambient halo */}
        <div
          className={clsx(styles.ambient, styles[state])}
          style={{
            transform: `scale(${1 + volume * 0.45})`,
            opacity: 0.4 + volume * 0.5,
          }}
        />

        {/* The orb — every effect below is masked to this circle */}
        <div
          className={clsx(styles.orb, styles[state])}
          style={
            {
              transform: `scale(${scale})`,
              "--intensity": intensity,
            } as React.CSSProperties
          }
        >
          {/* Base gradient background */}
          <div className={styles.background} />

          {/* Slow rotating crescent glows for depth */}
          <div className={styles.depthGlow} />
          <div className={styles.outerRing} />

          {/* Flowing organic wavy blobs */}
          <div className={styles.blob1} />
          <div className={styles.blob2} />

          {/* Fast, energetic core glows */}
          <div className={styles.coreGlow1} />
          <div className={styles.coreGlow2} />

          {/* Bright central core */}
          <div className={styles.core} />

          {/* Floating particles */}
          <div className={styles.particles}>
            {PARTICLES.map((i) => (
              <span
                key={i}
                className={styles.particle}
                style={{ "--p": i } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Realistic rim / inner glow */}
          <div className={styles.rim} />
        </div>
      </div>

      {/* Status label */}
      <div className={styles.statusLabel}>
        {state === "idle" && <span className={styles.idleText}>Tap to Start</span>}
        {state === "listening" && <span className={styles.listeningText}>Listening...</span>}
        {state === "thinking" && <span className={styles.thinkingText}>Thinking...</span>}
        {state === "speaking" && <span className={styles.speakingText}>Assistant Speaking</span>}
      </div>
    </div>
  );
}
