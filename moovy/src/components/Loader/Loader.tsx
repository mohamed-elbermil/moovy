"use client";

import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
      <p>Chargement...</p>
    </div>
  );
};

export default Loader;
