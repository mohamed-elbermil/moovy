import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Btn from "../Button/Button";
import Image from "next/image";
import Logo from "../../assets/images/logo.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (query.trim() === "") {
      setMovies([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        if (abortRef.current) {
          try { abortRef.current.abort(); } catch (_) {}
        }
        abortRef.current = new AbortController();
        const url = `/api/search?query=${encodeURIComponent(query)}`;
        const res = await fetch(url, { cache: "no-store", signal: abortRef.current.signal });
        if (!res.ok) {
          console.error("Erreur TMDb:", res.status);
          setMovies([]);
        } else {
          const data = await res.json();
          const results = Array.isArray(data?.results) ? data.results : [];
          const seenIds = new Set();
          const seenTitles = new Set();
          const unique = [];
          for (const m of results) {
            const titleKey = (m?.title || "").trim().toLowerCase();
            if (seenIds.has(m.id) || (titleKey && seenTitles.has(titleKey))) continue;
            seenIds.add(m.id);
            if (titleKey) seenTitles.add(titleKey);
            unique.push(m);
          }
          setMovies(unique.slice(0, 8));
        }
      } catch (error) {
        if (error?.name !== "AbortError") {
          console.error(error);
          setMovies([]);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

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
          <input
            type="search"
            placeholder="Rechercher un film..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>

          {(loading || (query && movies.length > 0)) && (
            <div className={styles.searchMenu}>
          {loading && (
            <div className="message">Chargement...</div>
  )}
  {!loading && movies.length === 0 && query && (
    <div className="message">Aucun résultat</div>
  )}
  {!loading && movies.length > 0 && (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => setQuery(movie.title)}>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
              alt={movie.title}
              width={46}
              height={69}
            />
          ) : (
            <div className="placeholder" />
          )}
          <span>{movie.title}</span>
        </li>
      ))}
    </ul>
  )}
</div>
          )}
        </div>
        <Btn>Connexion</Btn>
      </div>
    </nav>
  );
}
