import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from next/image /* Permet un chargement plus rapide et responsive */
import Logo from "../assets/images/logo.svg"

export default function Navbar() {
  return (
    <nav>
        <Image 
            src={Logo}
            alt="Logo Moovy"  
            width={150}   
            height={150 }   
        />
        <div>
            <Link href="/">Accueil</Link>
            <Link href="/">Films</Link>
            <Link href="/">Séries</Link>
        </div>
        <div>
            <input type="search" name="" id="" />
            <button>Connexion</button>
        </div>
    </nav>
  );
}
