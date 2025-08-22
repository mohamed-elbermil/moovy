import styles from "./Footer.module.css"


export default function Footer() {
    return(
        <footer className={styles.footer}>
            <p>
                © {new Date().getFullYear()} Moovy. Tous droits réservés.
            </p>
            <p>
                Propulsé par{" "}
                <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                >
                TMDb
                 </a>
            </p>
            <p>Réalisé par Mohamed E</p>
        </footer>
    )
}