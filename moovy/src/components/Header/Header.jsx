import Btn from '../Button/Button'
import CNC from "../CNC/CNC"
import styles from "./Header.module.css"

export default function Header() {
    return(
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <h1 className={styles.title}>Lorem ipsum</h1>
                <div className={styles.categorieList}>
                    <CNC className={styles.cnc}>12 +</CNC>
                    <p className={styles.infos}>Action</p> 
                    <p className={styles.infos}>2h05</p> 
                </div>
                <p className="paragraph">Ceci est une description de film Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor </p>
                <Btn variant='play'>Lecture</Btn>
            </div>
                <div className={styles.bannerFade}></div>
        </header>
        
    )
}