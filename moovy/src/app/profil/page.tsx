"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function ProfilPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  type WatchedMovie = {
    movieId: string;
    title: string;
    poster_path?: string | null;
    release_date?: string;
    watchedAt: string | Date;
  };
  const [watchedMovies, setWatchedMovies] = useState<WatchedMovie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchWatchedMovies();
    }
  }, [user]);

  const fetchWatchedMovies = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/movies/watched", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWatchedMovies(data.watchedMovies);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des films:", error);
    } finally {
      setIsLoadingMovies(false);
    }
  };

  if (loading || isLoadingMovies) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mon Profil</h1>
        <div className={styles.userInfo}>
          <h2>Bonjour, {user.name} !</h2>
          <p>{user.email}</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3>Mes Films Consultés</h3>
          {watchedMovies.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Vous n&apos;avez pas encore consulté de films.</p>
              <p>Explorez notre catalogue pour commencer !</p>
            </div>
          ) : (
            <div className={styles.moviesGrid}>
              {watchedMovies.map((movie, index) => (
                <div key={`${movie.movieId}-${index}`} className={styles.movieCard}>
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      width={300}
                      height={450}
                      className={styles.moviePoster}
                    />
                  ) : (
                    <div className={styles.placeholderPoster}>
                      <span>Pas d&apos;image</span>
                    </div>
                  )}
                  <div className={styles.movieInfo}>
                    <h4>{movie.title}</h4>
                    {movie.release_date && (
                      <p className={styles.releaseDate}>
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    )}
                    <p className={styles.watchedDate}>
                      Consulté le {new Date(movie.watchedAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
