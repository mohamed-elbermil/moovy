import styles from "../ContentCarousel/ContentCarousel.module.css"

const ContentCarousel = ({items}) => {
 return(
    <section>
        <div className={styles.carousel}>
            {items.map((item, index) => (
                <div key={index} className={styles.movie}>
                    <span>{item.style}</span>
                    <img src={item.imageUrl} alt={item.title} />
                    <div className={styles.activeCard}>
                    <p>{item.title}</p>
                    <p>{item.description}</p>

                    </div>
                </div>
            ))}
        </div>
    </section>
 )   
}

export default ContentCarousel;