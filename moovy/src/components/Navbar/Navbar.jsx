import { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Btn from "../Button/Button";
import Image from "next/image";
import Logo from "../../assets/images/logo.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link href="/">
          <Image src={Logo} alt="Logo Moovy" width={100} height={34} />
        </Link>
      </div>

      {/* Bouton burger */}
      <div
        className={styles.burger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        ☰
      </div>

      {/* Liens de navigation */}
      <div className={`${styles.links} ${isOpen ? styles.open : ""}`}>
        <Link href="/">Accueil</Link>
        <Link href="/films">Films</Link>
        <Link href="/">Séries</Link>
        <div className={styles.search}>
          <input type="search" placeholder="Rechercher" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <Btn>Connexion</Btn>
      </div>
    </nav>
  );
}
