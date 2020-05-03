import * as React from 'react';
import styles from './header.scss'

export function Header(props:{text:string}) {
    return (
        <div className={styles.header} >{props.text}</div>
    )
}