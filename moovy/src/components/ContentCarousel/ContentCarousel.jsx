"use client"
import { useRef } from "react"
import styles from "../ContentCarousel/ContentCarousel.module.css"
import genreMap from "../../data/genreMap"
import Btn from "../Button/Button"


const ContentCarousel = ({movies}) => {
    const moviesRef = useRef(null);
    const scrollLeft = () => {
        moviesRef.current.scrollBy({left: -500, behavior: "smooth"});
    }
    const scrollRight = () => {
        moviesRef.current.scrollBy({left: 500, behavior: "smooth"});
    }
 return(
    <section>
        <div className={styles.carousel}>
        <div className={styles.titleList}>
            <span>Les dernières nouveauté </span>
            <h1>Sortie cette année</h1>
        </div>
        <Btn variant="arrow" className={styles.arrowLeft} onClick={scrollLeft}></Btn>
        <Btn variant="arrow" className={styles.arrowRight} onClick={scrollRight}></Btn>
            <div className={styles.container} >
                <div className={styles.movies}ref={moviesRef}>
                {movies.map((movie, index) => (
                    <div key={movie.id || index} className={styles.movie}>
                        {movie.poster_path ? (
                            <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className={styles.poster}
                            />
                        ) : (
                            <div>Pas d'affiche pour ce film 🙄</div>
                        )}
                        <div className={styles.activeCard}>
                            <span>
                                {movie.genre_ids
                                    ?.map(id => genreMap[id])
                                    .filter(Boolean)
                                    .join(',')}
                            </span>
                            <p className={styles.title}>{movie.title}</p>                  
                            <p className={styles.overview}>
                                {movie.overview.length > 273
                                ? movie.overview.slice(0,270) + " ..."
                                :movie.overview}
                            </p>
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