// Candles.tsx

import React from 'react'
import styles from "./miscellaneous.module.scss"

const Candles = () => {
    return (
        <>
            <div className={styles.holder}>
                <div className={styles.candle}>
                    <div className={styles.blinkingGlow}></div>
                    <div className={styles.thread}></div>
                    <div className={styles.glow}></div>
                    <div className={styles.flame}></div>
                </div>
            </div>
        </>
    )
}

export default Candles