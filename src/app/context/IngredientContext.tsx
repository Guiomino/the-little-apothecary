// IngredientContext.tsx

"use client"

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import Ingredient from '../OOP/IngredientClass';
import ingredientsData from '../data/ingredients.json';

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
    cartItem: { ingredient: Ingredient; quantity: number }[];
    setCartItem: React.Dispatch<React.SetStateAction<{ ingredient: Ingredient; quantity: number }[]>>;
    quantities: { [name: string]: number };
    setQuantities: React.Dispatch<React.SetStateAction<{ [name: string]: number }>>;
    resetCounter: (name: string) => void;
}

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

export const useTotalPrice = () => {
    const context = useContext(IngredientContext);
    if (!context) {
        throw new Error('useTotalPrice must be used within an IngredientProvider');
    }
    return [context.totalPrice, context.setTotalPrice] as const;
};

export const useCartItems = () => {
    const context = useContext(IngredientContext);
    if (!context) {
        throw new Error('useCartItems must be used within an IngredientProvider');
    }
    return [context.cartItem, context.setCartItem] as const;
};

export const useQuantities = () => {
    const context = useContext(IngredientContext);
    if (!context) {
        throw new Error('useQuantities must be used within an IngredientProvider');
    }
    return [context.quantities, context.setQuantities] as const;
};

export const useResetCounter = () => {
    const context = useContext(IngredientContext);
    if (!context) {
        throw new Error('useResetCounter must be used within an IngredientProvider');
    }
    return context.resetCounter;
};

const IngredientProvider: React.FC<IngredientProviderProps> = ({ children }) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItem, setCartItem] = useState<{ ingredient: Ingredient; quantity: number }[]>([]);
    const [quantities, setQuantities] = useState<{ [name: string]: number }>({});

    useEffect(() => {
        const ingredientsList: Ingredient[] = ingredientsData.ingredients.map(item =>
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

        const initialQuantities: { [name: string]: number } = {};
        ingredientsData.ingredients.forEach((ingredient: { name: string }) => {
            initialQuantities[ingredient.name] = 0;
        });
        setQuantities(initialQuantities);
    }, []);

    useEffect(() => {
        if (ingredients.length > 0) {
            const prices = Ingredient.calculateAndStorePrices(ingredients);
            saveToLocalStorage('ingredientPrices', prices);
        }
    }, [ingredients]);

    const resetCounter = (name: string) => {
        setQuantities(prev => ({
            ...prev,
            [name]: 0,
        }));
    };

    return (
        <IngredientContext.Provider value={{ ingredients, totalQuantity, setTotalQuantity, totalPrice, setTotalPrice, cartItem, setCartItem, quantities, setQuantities, resetCounter }}>
            {children}
        </IngredientContext.Provider>
    );
};

export default IngredientProvider;
