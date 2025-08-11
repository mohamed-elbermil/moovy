import styles from "./FollowUsBar.module.css"
import React from "react"
import Btn from "../Button/Button"

const FollowUsBar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.leftElement}>
                    <h2 className="title-section">Un souci, une question ? Ou envie de suivre les actus ?</h2>
                    <p className="paragraph">Rejoins notre serveur Discord pour poser tes questions, obtenir de l'aide et suivre toutes les dernières mises à jour.
                    C’est notre centre d’info : bugs, nouveautés, annonces… tout y est !</p>
                </div>
                <div className={styles.rightElement}>
                    <Btn 
                    variant="socialMedia"
                    as = "a"
                    href={"#"}
                    
                    >Notre Discord</Btn>
                </div>
            </div>
        </div>
    )
}

export default FollowUsBar