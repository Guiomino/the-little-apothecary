// IngredientContext.tsx

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

export const loadFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

interface IngredientContextType {
    ingredients: Ingredient[];
    totalQuantity: number;
    setTotalQuantity: React.Dispatch<React.SetStateAction<number>>;
    totalPrice: number;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};

const IngredientContext = createContext<IngredientContextType | undefined>(undefined);

export const useIngredients = () => {
    const context = useContext(IngredientContext);
    if (!context) {
        throw new Error('useIngredients must be used within an IngredientProvider');
    }
    return context.ingredients;
};

export const useTotalQuantity = () => {
    const context = useContext(IngredientContext);
    if (!context) {
        throw new Error('useTotalQuantity must be used within an IngredientProvider');
    }
    return [context.totalQuantity, context.setTotalQuantity] as const;
};

export const useTotalPrice = (() => {
    const context = useContext(IngredientContext)
    if (!context) {
        throw new Error('useTotalPrice must be used within an IngredientProvider');
    }
    return [context.totalPrice, context.setTotalPrice] as const;
});

const IngredientProvider: React.FC<IngredientProviderProps> = ({ children }) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

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
        <IngredientContext.Provider value={{ ingredients, totalQuantity, setTotalQuantity, totalPrice, setTotalPrice }}>
            {children}
        </IngredientContext.Provider>
    );
};

export default IngredientProvider;
