"use client";
import Image from "next/image";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Image src="/logo.svg" alt="Loader" className={styles.logo} width={240} height={82} priority />
      <div className={styles.spinner}></div>
      <p>Chargement en cours... le divertissement arrive !</p>
    </div>
  );
};

export default Loader;
