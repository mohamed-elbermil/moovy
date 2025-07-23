import React from "react"
import styles from './Button.module.css'
import Link from "next/link";

const Btn = ({children, href , variant = "primary"}) => {
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
    /* Si href est défini, on retourne un lien */
    if (href) {
        return(
            <Link className={className} href={href}>{children}</Link>
        )
    }

    /* Sinon, on retourne un bouton */
    return (
    <button className={className}>{children}</button>)
}

export default Btn;