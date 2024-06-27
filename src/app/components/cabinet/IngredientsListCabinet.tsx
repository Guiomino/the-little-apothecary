// IngredientsListCabinet.tsx

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ingredientsListCabinet.module.scss";
import IngredientClass from "@/app/OOP/IngredientClass";

interface IngredientData {
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
    onIngredientClick: (ingredient: IngredientClass) => void;
    ingredients: IngredientData[];
    selectedRarity: string | null;
    selectedType: string | null;
}

const IngredientsListCabinet: React.FC<IngredientsListCabinetProps> = ({ onIngredientClick, ingredients, selectedRarity, selectedType }) => {
    const [currentIngredients, setCurrentIngredients] = useState<IngredientClass[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);

    useEffect(() => {
        // Convertir les ingrédients en instances de IngredientClass
        const initializedIngredients = ingredients.map(ingredientData =>
            new IngredientClass(
                ingredientData.ingredient.name,
                ingredientData.ingredient.type,
                ingredientData.ingredient.description,
                ingredientData.ingredient.rarity,
                ingredientData.ingredient.imagePath,
                ingredientData.ingredient.successRate,
                [0, 0], // Passe priceRange comme [0, 0] car j'ai déjà le prix
                ingredientData.ingredient.price
            )
        );
        setCurrentIngredients(initializedIngredients);
    }, [ingredients]);

    const handleIngredientClick = (ingredient: IngredientClass) => {
        setSelectedIngredient(ingredient.name);
        onIngredientClick(ingredient);
    };

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
                const rarityClass = getRarityClass(ingredient.rarity);

                return (
                    <li key={index} className={`${styles.ingredient} ${rarityClass}`}>

                        <div className={styles.ingrImage}>
                            <Image src={ingredient.imagePath} width={40} height={40} alt={ingredient.name} />
                        </div>

                        <div className={styles.ingrTitle}>
                            <button onClick={() => handleIngredientClick(ingredient)} className={styles.buttonWithOverlay}>{ingredient.name}</button>
                            <div className={styles.ingrTypeAndRarity}>
                                <p>Type: {ingredient.type}</p>
                                <p>Rarity: {ingredient.rarity}</p>
                            </div>
                        </div>

                        <div className={styles.ingrHandle}>
                            <div className={styles.price}>
                                <p>Price: {ingredient.price}</p>
                            </div>

                            <div className={styles.successRate}>
                                <p>Success rate: {ingredient.successRate}%</p>
                            </div>

                            <div className={styles.quantity}>
                                <p>Quantity: {ingredients[index].quantity}</p>
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
