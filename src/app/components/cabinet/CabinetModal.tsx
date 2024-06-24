// CabinetModal.tsx

import React from "react";
import IngredientsListCabinet from "./IngredientsListCabinet";
import styles from "./cabinetModal.module.scss";

export interface Ingredient {
    ingredient: {
        name: string;
        type: string;
        rarity: string;
        description: string;
        imagePath: string;
        successRate: number;
        price: number;
    };
    quantity: number;
}

interface CabinetModalProps {
    ingredients: Ingredient[];
    onCloseClick: () => void;
}

const CabinetModal: React.FC<CabinetModalProps> = ({ ingredients, onCloseClick }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onCloseClick}>X</button>
                <IngredientsListCabinet ingredients={ingredients} />
            </div>
        </div>
    );
};

export default CabinetModal;
