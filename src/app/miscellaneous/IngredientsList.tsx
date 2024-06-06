// IngredientsList.tsx

"use client"

import React, { useState, useEffect } from 'react';
import { useIngredients } from '../context/IngredientContext';
import IngredientClass from "@/app/OOP/IngredientClass"

import styles from "./miscellaneous.module.scss"
import Image from 'next/image';

const loadFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key) as string | null;
  return value && JSON.parse(value).length > 0 ? JSON.parse(value) : null;
};

const IngredientsList: React.FC = () => {
  const [quantity, setQuantity] = useState(0);
  const ingredients = useIngredients();
  const [prices, setPrices] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const increment = (amount: number) => {
    setQuantity(prev => prev + amount);
  };

  const decrement = () => {
    setQuantity(prev => (prev > 0 ? prev - 1 : 0));
  };

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
    
    <>
      <h2>Ingredients List</h2>
      {/* Liste ici */}
      <div id={styles.ingredientsContainer}>
      {
        ingredients.map((ingredient, index) => {
          const price = prices[index] !== undefined ? prices[index] : 'N/A';
          const isPriority = index < 5;
          return (
          <div key={ingredient.name} className={styles.ingredient}>
            <div>
            <h2>{ingredient.name}</h2>
                        <p><strong>Type : </strong>{ingredient.type}</p>
                        <p><strong>Description : </strong>{ingredient.description}</p>
                        <p><strong>Rarity : </strong>{ingredient.rarity}</p>
                        <p><strong>Success rate : </strong>{ingredient.successRate}%</p>
                        <p><strong>Price : </strong>{price}</p>
                        <Image src={ingredient.imagePath} width={40} height={40} alt={ingredient.name} priority={isPriority} />

            </div>
            <div>
              <p><strong>Quantity : </strong>{quantity}</p>
              <button onClick={() => decrement()}>-</button>
              <button onClick={() => increment(1)}>+</button>
              <button onClick={() => increment(1)}>x1</button>
              <button onClick={() => increment(10)}>x10</button>
              <button onClick={() => increment(100)}>x100</button>
            </div>
          </div>
        )})
      }
      </div>
    </>
  );
};

export default IngredientsList;
