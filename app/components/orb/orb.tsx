"use client";
import { useOrbState } from "./useOrbState";
import styles from "./orb.module.css";
import clsx from "clsx";

export function Orb() {
  const state = useOrbState((s) => s.state);
  return (
    <div className={clsx(styles.orb, styles[state])}>
      <div className={styles.core} />
      <div className={styles.ring} />
      <div className={styles.ring2} />
    </div>
  );
}