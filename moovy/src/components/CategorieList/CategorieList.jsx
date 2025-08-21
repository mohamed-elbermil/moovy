import genreMap from "../../data/genreMap";
import styles from "./CategorieList.module.css";

export default function CategorieList({ title, subtitle, movies }) {
  const usedPosters = new Set();

  return (
    <section>
      <div className={styles.container}>
        <div className="title-container-center">
          <span className="subtitle">{subtitle}</span>
          <h2 className="title-section">{title}</h2>
        </div>

        <div className={styles.categories}>
          {Object.entries(genreMap).map(([id, name]) => {
            const moviesInCategory = movies.filter(m =>
              m.genre_ids.includes(Number(id)) &&
              m.poster_path &&
              !usedPosters.has(m.poster_path)
            );

            if (!moviesInCategory.length) return null;

            const poster = `https://image.tmdb.org/t/p/w500${moviesInCategory[0].poster_path}`;
            usedPosters.add(moviesInCategory[0].poster_path);

            return (
              <div className={styles.card} key={id}>
                <span>{name}</span>
                <span>{moviesInCategory.length} films & séries</span>
                <div
                  className={styles.movie}
                  style={{
                    backgroundImage: `url(${poster})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
