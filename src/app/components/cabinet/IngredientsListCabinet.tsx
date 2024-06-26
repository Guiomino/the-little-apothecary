// IngredientsListCabinet.tsx

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ingredientsListCabinet.module.scss";

interface Ingredient {
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

interface IngredientsListCabinetProps {
    ingredients: Ingredient[];
}

const IngredientsListCabinet: React.FC<IngredientsListCabinetProps> = ({ ingredients }) => {
    const [currentIngredients, setCurrentIngredients] = useState<Ingredient[]>(ingredients);

    useEffect(() => {
        setCurrentIngredients(ingredients);
    }, [ingredients]);

    const getRarityClass = (rarity: string) => {
        switch (rarity) {
            case 'Common':
                return styles.common;
            case 'Uncommon':
                return styles.uncommon;
            case 'Rare':
                return styles.rare;
            case 'Epic':
                return styles.epic;
            default:
                return '';
        }
    };


    return (
        <ul className={styles.ingredientsContainer}>
            {currentIngredients.map((ingredient, index) => {
                const rarityClass = getRarityClass(ingredient.ingredient.rarity);

                return (
                    <li key={index} className={`${styles.ingredient} ${rarityClass}`}>

                        <div className={styles.ingrImage}>
                            <Image src={ingredient.ingredient.imagePath} width={40} height={40} alt={ingredient.ingredient.name} />
                        </div>

                        <div className={styles.ingrTitle}>
                            <button className={styles.buttonWithOverlay}>{ingredient.ingredient.name}</button>
                            <div className={styles.ingrTypeAndRarity}>
                                <p>Type: {ingredient.ingredient.type}</p>
                                <p>Rarity: {ingredient.ingredient.rarity}</p>
                            </div>
                        </div>

                        <div className={styles.ingrHandle}>
                            <div className={styles.price}>
                                <p>Price: {ingredient.ingredient.price}</p>
                            </div>

                            <div className={styles.successRate}>
                                <p>Success rate: {ingredient.ingredient.successRate}%</p>
                            </div>

                            <div className={styles.quantity}>
                                <p>Quantity: {ingredient.quantity}</p>
                            </div>
                        </div>
                        <button className={styles.add}>Add</button>
                    </li>
                )
            })}
        </ul>
    );
};

export default IngredientsListCabinet;
