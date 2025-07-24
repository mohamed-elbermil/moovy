import styles from "../ContentCarousel/ContentCarousel.module.css"
import genreMap from "../../data/genreMap"

const ContentCarousel = ({movies}) => {
 return(
    <section>
        <div className={styles.carousel}>
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
    </section>
 )   
}

export default ContentCarousel;