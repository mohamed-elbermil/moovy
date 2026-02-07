"use client"
import { useRef } from "react"
import styles from "../ContentCarousel/ContentCarousel.module.css"
import genreMap from "../../data/genreMap"
import tvGenreMap from "../../data/tvGenreMap"
import Btn from "../Button/Button"
// Composants et helpers partagés
import { buildTrailerApiUrl, mediaTypeFromFlags } from "@/lib/media"

// Ouvre le trailer YouTube via l'API interne (film/série)
const openTrailer = async (id, mediaType = 'movie') => {
  try {
    const response = await fetch(buildTrailerApiUrl(id, mediaType), { cache: 'no-store' });
    const data = await response.json();
    const pick = (data?.trailers || data?.allVideos || []).find(
      (video) => video?.site === "YouTube" && video?.type === "Trailer"
    );
    if (pick?.key) {
      window.open(`https://www.youtube.com/watch?v=${pick.key}`, "_blank");
    } else {
      alert("Trailer non disponible");
    }
  } catch {
    alert("Erreur lors de la récupération du trailer");
  }
};

  /**
   * @param {{ movies: any[], title: string, subtitle: string, onMovieClick?: (movie: any) => void }} props
   */
  const ContentCarousel = ({movies, title, subtitle, onMovieClick = undefined}) => {
    const moviesRef = useRef(null);
  
    const scrollLeft = () => {
      moviesRef.current.scrollBy({left: -500, behavior: "smooth"});
    }
    const scrollRight = () => {
      moviesRef.current.scrollBy({left: 500, behavior: "smooth"});
    }
  
    return (
      <section>
        <div className={styles.carousel}>
          <div className="title-container">
            <span className="subtitle">{subtitle}</span>
            <h2 className="title-section">{title}</h2>
          </div>
          <Btn variant="arrow" className={styles.arrowLeft} onClick={scrollLeft}></Btn>
          <Btn variant="arrow" className={styles.arrowRight} onClick={scrollRight}></Btn>
          <div className={styles.container} >
            <div className={styles.movies} ref={moviesRef}>
              {movies.map((movie, index) => (
                <div 
                  key={movie.id || index} 
                  className={styles.movie}
                  onClick={() => onMovieClick && onMovieClick(movie)}
                  style={{ cursor: onMovieClick ? 'pointer' : 'default' }}
                >
                  {(() => {
                    const typeLabel = mediaTypeFromFlags(movie) === 'tv' ? 'Série' : 'Film';
                    return <div className={styles.badgeType}>{typeLabel}</div>
                  })()}
                  {movie.poster_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className={styles.poster}
                    />
                  ) : (
                    <div>Pas d'affiche 🙄</div>
                  )}
                  <div className={styles.activeCard}>
                    <span className={styles.genres}>
                      {(movie.genre_ids || [])
                        .map(id => (movie?.media_type === 'tv' || (!!movie?.name && !movie?.title)) ? tvGenreMap[id] : genreMap[id])
                        .filter(Boolean)
                        .slice(0,2)
                        .map((genre, index) => (
                          <div key={index} className={styles.genreItem}>
                            {genre}
                          </div>
                      ))}
                    </span>
                    <p className={styles.title}>{movie.title || movie.name}</p>                  
                    {typeof movie.vote_average === 'number' ? (
                      <div className={styles.rating}>
                        <span className={styles.star}>★</span>
                        <span className={styles.ratingBadge}>{(Math.round(movie.vote_average * 10) / 10).toFixed(1)} / 10</span>
                      </div>
                    ) : (
                      <div className={styles.rating}>
                        <span className={styles.ratingBadgeMuted}>Note indisponible</span>
                      </div>
                    )}
                    <p className={
                      (movie.overview || '').length === 0
                        ? styles.noneOverview
                        : styles.overview
                      }>
                      {(movie.overview || '').length === 0
                        ? "Pas de résumé disponible"
                        : (movie.overview || '').length > 200
                            ? (movie.overview || '').slice(0,100) + " ..."
                            : (movie.overview || '')}
                    </p>
                    <Btn className={styles.btnTrailer} onClick={() => openTrailer(movie.id, mediaTypeFromFlags(movie))}>Voir Trailer</Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  
export default ContentCarousel;
