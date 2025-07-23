import React from "react"
import styles from './Button.module.css'

const Btn = ({children, variant = "primary"}) => {
    let className = "";

    switch (variant) {
        case 'primary':
            className = styles.btnPrimary
        break;
        case 'arrow':
            className = styles.btnArrow
        break;
        case 'play':
            className = styles.btnPlay
        break;
        default:
            className = styles.btnPrimary
    }
    return (
    <button className={className}>{children}</button>)
}

export default Btn;