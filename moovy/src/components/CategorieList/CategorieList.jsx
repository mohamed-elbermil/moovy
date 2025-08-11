import styles from "./CategorieList.module.css"
import genreMap from "@/data/genreMap"


export default function CategorieList({title, subtitle}) {
    return (
        <section>
            <div className={styles.container}>
                <div className="title-container">
                    <span className="subtitle">{subtitle}</span>
                    <h2 className="title-section">{title}</h2>
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
        </section>
    )
}

