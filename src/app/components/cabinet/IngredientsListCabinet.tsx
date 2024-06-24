// IngredientsListCabinet.tsx

import React from "react";
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
    return (
        <ul>
            {ingredients.map((ingredient, index) => (
                <li key={index}>
                    <Image src={ingredient.ingredient.imagePath} width={40} height={40} alt={ingredient.ingredient.name} />
                    <h3>{ingredient.ingredient.name}</h3>
                    <p>Type: {ingredient.ingredient.type}</p>
                    <p>Rarity: {ingredient.ingredient.rarity}</p>
                    <p>{ingredient.ingredient.description}</p>
                    <p>Price: {ingredient.ingredient.price}</p>
                    <p>Success rate: {ingredient.ingredient.successRate}%</p>
                    <p>Quantity: {ingredient.quantity}</p>
                </li>
            ))}
        </ul>
    );
};

export default IngredientsListCabinet;
