"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useIngredients } from '@/app/context/IngredientContext';
import IngredientClass from "@/app/OOP/IngredientClass";

const loadFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key) as string | null;
    return value && JSON.parse(value).length > 0 ? JSON.parse(value) : null;
};

const IngredientList: React.FC = () => {
    const ingredients = useIngredients();
    const [prices, setPrices] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedPrices = loadFromLocalStorage('ingredientPrices');
        if (storedPrices) {
            setPrices(storedPrices);
            setLoading(false);
        } else {
            const newPrices = ingredients.map(ingredient =>
                IngredientClass.generateRandomPrice(ingredient.priceRange[0], ingredient.priceRange[1])
            );
            localStorage.setItem('ingredientPrices', JSON.stringify(newPrices));
            setPrices(newPrices);
            setLoading(false);
        }
    }, [ingredients]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ul>
            {ingredients.map((ingredient, index) => {
                const price = prices[index] !== undefined ? prices[index] : 'N/A';
                const isPriority = index < 5;

                return (
                    <li key={ingredient.name}>
                        <h2>{ingredient.name}</h2>
                        <p><strong>Type : </strong>{ingredient.type}</p>
                        <p><strong>Description : </strong>{ingredient.description}</p>
                        <p><strong>Rarity : </strong>{ingredient.rarity}</p>
                        <p><strong>Success rate : </strong>{ingredient.successRate}%</p>
                        <p><strong>Prix : </strong>{price}</p>
                        <Image src={ingredient.imagePath} width={40} height={40} alt={ingredient.name} priority={isPriority} />
                    </li>
                );
            })}
        </ul>
    );
};

export default IngredientList;
