"use client";

import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src="/logo.svg" alt="Loader" className={styles.logo} />
      <div className={styles.spinner}></div>
      <p>Chargement en cours... le divertissement arrive !</p>
    </div>
  );
};

export default Loader;
