// IngredientProvider.tsx

"use client"

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import Ingredient from '../OOP/IngredientClass';
import ingredientsData from '../data/ingredients.json';

// Définition du type pour les données d'ingrédients
type IngredientsData = {
    name: string;
    type: string;
    description: string;
    rarity: string;
    imagePath: string;
    successRate: number;
    priceRange: number[];
}[];

interface IngredientProviderProps {
    children: ReactNode;
}

const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

const IngredientContext = createContext<Ingredient[]>([]);

export const useIngredients = () => useContext(IngredientContext);

const IngredientProvider: React.FC<IngredientProviderProps> = ({ children }) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        // Chargement des données d'ingrédients à partir du fichier JSON importé
        const ingredientsList: IngredientsData = ingredientsData.ingredients.map(item =>
            new Ingredient(
                item.name,
                item.type,
                item.description,
                item.rarity,
                item.imagePath,
                item.successRate,
                item.priceRange,
            )
        );
        setIngredients(ingredientsList);
    }, []);

    useEffect(() => {
        if (ingredients.length > 0) {
            const prices = Ingredient.calculateAndStorePrices(ingredients);
            saveToLocalStorage('ingredientPrices', prices);
        }
    }, [ingredients]);

    return (
        <IngredientContext.Provider value={ingredients}>
            {children}
        </IngredientContext.Provider>
    );
};

export default IngredientProvider;
