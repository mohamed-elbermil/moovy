import styles from "./Navbar.module.css";
import Link from "next/link";
import Btn from "../Button/Button";
import Image from "next/image"; /* Permet un chargement plus rapide et responsive */
import Logo from "../../assets/images/logo.svg";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image src={Logo} alt="Logo Moovy" width={150} height={34} />
      </Link>

      <div className="flex flex-row items-center h-full gap-5 md:gap-10 hidden sm:flex">
        <Link href="/">Accueil</Link>
        <Link href="/">Films</Link>
        <Link href="/">Séries</Link>
      </div>
      <div className={styles.rightElement}>
        <div className={styles.search}>
          <input type="search" placeholder="Rechercher" />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <Btn>Connexion</Btn>
      </div>
    </nav>
  );
}
