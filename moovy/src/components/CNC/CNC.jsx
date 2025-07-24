import styles from "../CNC/CNC.module.css"
// Créer un component pour les limitations d'âge
const CNC = ({children}) => {
        return(
            <div className= {styles.CNC}>
                {children}
            </div>
        )
    }

export default CNC;
