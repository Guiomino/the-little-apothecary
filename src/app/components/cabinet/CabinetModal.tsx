// CabinetModal.tsx

import React from "react";
import Ingredient from "../../OOP/IngredientClass";
import styles from "./cabinetModal.module.scss";

interface CabinetModalProps {
    ingredients: Ingredient[];
    onClose: () => void;
}

const CabinetModal: React.FC<CabinetModalProps> = ({ ingredients, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <h2>Ingrédients</h2>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            <h3>{ingredient.name}</h3>
                            <p>{ingredient.description}</p>
                            <p>Rarity: {ingredient.rarity}</p>
                            <p>Price: {ingredient.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CabinetModal;
