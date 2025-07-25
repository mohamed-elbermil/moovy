import React from "react"
import styles from './Button.module.css'
import Link from "next/link";

const Btn = ({ children, href, variant = "primary", className = "", ...props }) => {
    let baseClass = "";

    switch (variant) {
        case 'primary':
            baseClass = styles.btnPrimary;
            break;
        case 'arrow':
            baseClass = styles.btnArrow;
            break;
        case 'play':
            baseClass = styles.btnPlay;
            break;
        default:
            baseClass = styles.btnPrimary;
    }

    // Fusionne les classes : btnArrow + arrowLeft par ex.
    const combinedClassName = `${baseClass} ${className}`.trim();

    if (href) {
        return (
            <Link className={combinedClassName} href={href} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
};


export default Btn;