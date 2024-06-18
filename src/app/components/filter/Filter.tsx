// Filter.tsx

import React from 'react'
import styles from "./filter.module.scss"

interface FilterProps {
    onClose: () => void;
};

const Filter: React.FC<FilterProps> = ({ onClose }) => {
    return (
        <>
            <div className={styles.filter}>
                <div>Filter</div>
                <button onClick={onClose}>X</button>
            </div>
        </>
    )
}

export default Filter