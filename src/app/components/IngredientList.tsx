// IngredientList.tsx

"use client"

import React from 'react';
import Image from 'next/image';
import { useIngredients } from '@/app/context/IngredientContext';

// Fonction pour récupérer une valeur depuis localStorage
const loadFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

const IngredientList: React.FC = () => {
    const ingredients = useIngredients();

    return (
        <ul>
            {ingredients.map((ingredient) => {
                const successRate = loadFromLocalStorage(`${ingredient.name}-successRate`) || ingredient.successRate;
                const priceRange = loadFromLocalStorage(`${ingredient.name}-priceRange`) || ingredient.priceRange;

                return (
                    <li key={ingredient.name}>
                        <h2>{ingredient.name}</h2>
                        <p><strong>Type : </strong>{ingredient.type}</p>
                        <p><strong>Description : </strong>{ingredient.description}</p>
                        <p><strong>Rarity : </strong>{ingredient.rarity}</p>
                        <p><strong>Success rate : </strong>{successRate}%</p>
                        <p><strong>Price range : </strong>{priceRange[0]} - {priceRange[1]}</p>
                        <p><strong>Prix : </strong></p>
                        <Image src={ingredient.imagePath} width={100} height={100} alt={ingredient.name} />
                    </li>
                );
            })}
        </ul>
    );
};

export default IngredientList;
