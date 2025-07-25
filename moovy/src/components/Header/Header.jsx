import Btn from '../Button/Button'
import CNC from "../CNC/CNC"
import styles from "./Header.module.css"

export default function Header() {
    return(
        <header className={styles.header}>
            <h1>Lorem ipsum</h1>
            <div className="categorieList">
                <CNC>12 +</CNC>
                <p>Action</p> 
            </div>
            <p>Ceci est une description de film Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor Lorem ipsum Dolor </p>
            <Btn variant='play'>Lecture</Btn>
        </header>
        
    )
}