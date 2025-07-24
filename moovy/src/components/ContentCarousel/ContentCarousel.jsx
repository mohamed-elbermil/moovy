import styles from "../ContentCarousel/ContentCarousel.module.css"

const ContentCarousel = ({movies}) => {
 return(
    <section>
        <div className={styles.carousel}>
            {movies.map((movie, index) => (
                <div key={movie.id || index} className={styles.movie}>
                    <span>{movie.genre_ids?.join(',')}</span>
                    {movie.poster_path ? (
                        <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className={styles.poster}
                        />
                    ) : (
                        <div>Pas d'affiche</div>
                    )}
                    <div className={styles.activeCard}>
                        <p>{movie.title}</p>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
 )   
}

export default ContentCarousel;