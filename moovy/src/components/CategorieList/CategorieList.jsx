import styles from "./CategorieList.module.css"
import genreMap from "@/data/genreMap"


export default function CategorieList() {
    return (
        <div className={styles.container}>
            <div className="title-container">
                <span className="subtitle">Genres</span>
                <h2 className="title-section">Parcours nos catégories</h2>
            </div>
            <div className={styles.categories}>
                <div className={styles.card}>
                    <span>Action</span>
                    <span>{14} films & séries</span>
                    <div className={styles.movie}></div>
                </div>
                <div className={styles.card}>
                    <span>Action</span>
                    <span>{14} films & séries</span>
                    <div className={styles.movie}></div>
                </div>
            </div>
        </div>
    )
}

