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

    const getTypeImg = (type: string) => {
        switch (type) {
            case 'Mineral':
                return <Image src={"/images/Type/Type_Mineral.png"} width={15} height={15} alt="Mineral" />;
            case 'Vegetal':
                return <Image src={"/images/Type/Type_Vegetal.png"} width={15} height={15} alt="Vegetal" />;
            case 'Animal':
                return <Image src={"/images/Type/Type_Animal.png"} width={15} height={15} alt="Animal" />;
            case 'Mushroom':
                return <Image src={"/images/Type/Type_Mushroom.png"} width={15} height={15} alt="Mushroom" />;
            default:
                return '';
        }
    };

    const getRarityImg = (type: string) => {
        switch (type) {
            case 'Common':
                return <Image src={"/images/Rarity/Star_Common.png"} width={20} height={20} alt="Common" />;
            case 'Uncommon':
                return <Image src={"/images/Rarity/Star_Uncommon.png"} width={20} height={20} alt="Uncommon" />;
            case 'Rare':
                return <Image src={"/images/Rarity/Star_Rare.png"} width={20} height={20} alt="Rare" />;
            case 'Epic':
                return <Image src={"/images/Rarity/Star_Epic.png"} width={20} height={20} alt="Epic" />;
            default:
                return '';
        }
    };

    return (
        <ul className={styles.ingredientsContainer}>
            {currentIngredients.map((ingredient, index) => {
                const typeImg = getTypeImg(ingredient.type);
                const rarityImg = getRarityImg(ingredient.rarity);
                const rarityClass = getRarityClass(ingredient.rarity);

                return (
                    <li key={index} className={`${styles.ingredient} ${rarityClass}`}>

                        <div className={styles.ingrImage}>
                            <Image src={ingredient.imagePath} width={40} height={40} alt={ingredient.name} />
                        </div>

                        <div className={styles.ingrTitle}>
                            <button onClick={() => handleIngredientClick(ingredient)} className={styles.buttonWithOverlay}>{ingredient.name}</button>
                            <div className={styles.ingrTypeAndRarity}>
                                <p>{typeImg}{ingredient.type}</p>
                                <p>{rarityImg}{ingredient.rarity}</p>
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


// BUTTON ADD :
// Récupère et affiche l'ingrédient avec composant "listChoice"
// Possibilité de cliquer 2 fois sur Add du même ingrédient
// ListChoice ne peux afficher que 2 ingrédients

// Obligation d'avoir 2 ingredients pour cliquer sur "CHOOSE"
// Lors de Add d'un ingredient, si déjà 2 séléctionnés alors Message : "Remove an ingredient"