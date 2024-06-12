// IngredientsListMarket.tsx

"use client"

import React, { useState, useEffect } from 'react';
import { useCartItems, useIngredients, useTotalPrice, useTotalQuantity } from '@/app/context/IngredientContext';
import IngredientClass from "@/app/OOP/IngredientClass";
import styles from "./ingredient.module.scss";
import Image from 'next/image';

const loadFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const IngredientsListMarket: React.FC = () => {
  const ingredients = useIngredients();
  const [quantities, setQuantities] = useState<{ [name: string]: number }>({});
  const [totalQuantity, setTotalQuantity] = useTotalQuantity();
  const [totalPrice, setTotalPrice] = useTotalPrice();
  const [cartItems, setCartItems] = useCartItems();
  const [prices, setPrices] = useState<{ [name: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPrices = loadFromLocalStorage('ingredientPrices');
    if (storedPrices) {
      setPrices(storedPrices);
    } else {
      const newPrices: { [name: string]: number } = {};
      ingredients.forEach(ingredient => {
        newPrices[ingredient.name] = IngredientClass.generateRandomPrice(ingredient.priceRange[0], ingredient.priceRange[1]);
      });
      localStorage.setItem('ingredientPrices', JSON.stringify(newPrices));
      setPrices(newPrices);
    }

    const initialQuantities: { [name: string]: number } = {};
    ingredients.forEach(ingredient => {
      initialQuantities[ingredient.name] = 0;
    });
    setQuantities(initialQuantities);
    setLoading(false);
  }, [ingredients]);

  useEffect(() => {
    const total = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
    setTotalQuantity(total);

    const totalPrice = ingredients.reduce((sum, ingredient) => 
      sum + (quantities[ingredient.name] * (prices[ingredient.name] || 0)), 0);
    setTotalPrice(totalPrice);

    const updatedCartItems = ingredients.map(ingredient => ({
      ingredient,
      quantity: quantities[ingredient.name],
    })).filter(item => item.quantity > 0);
    setCartItems(updatedCartItems);
  }, [quantities, prices, setTotalQuantity, setTotalPrice, ingredients, setCartItems]);

  const increment = (name: string, amount: number) => {
    setQuantities(prev => ({
      ...prev,
      [name]: Math.max((prev[name] || 0) + amount, 0),
    }));
  };

  const resetCounter = (name: string) => {
    setQuantities(prev => ({
      ...prev,
      [name]: 0,
    }));
  };

  const getTotalPrice = (name: string) => {
    return quantities[name] * (prices[name] || 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
    <div className={styles.ingredientsContainer}>
      {ingredients.map((ingredient) => {
        const price = prices[ingredient.name] !== undefined ? prices[ingredient.name] : 'N/A';
        const isPriority = ingredients.indexOf(ingredient) < 5;
        const rarityClass  = getRarityClass(ingredient.rarity);
        const typeImg = getTypeImg(ingredient.type);
        const rarityImg = getRarityImg(ingredient.rarity);
        const totalPrice = getTotalPrice(ingredient.name);

        return (
          <div key={ingredient.name} className={`${styles.ingredient} ${rarityClass}`}>
            <div className={styles.ingrImage}>
              <Image src={ingredient.imagePath} width={50} height={50} alt={ingredient.name} priority={isPriority} />
            </div>

            <div className={styles.ingrTitle}>
              <button className={styles.buttonWithOverlay}>{ingredient.name}</button>
              <div className={styles.ingrTypeAndRarity}>
                <p>{typeImg} {ingredient.type}</p>
                <p>{rarityImg} {ingredient.rarity}</p>
              </div>
            </div>

            <div className={styles.ingrHandle}>
              <div className={styles.counter}>
                <button onClick={() => increment(ingredient.name, -10)}>-10</button>
                <button onClick={() => increment(ingredient.name, -1)}>-1</button>
                <button onClick={() => increment(ingredient.name, 1)}><strong>+1</strong></button>
                <button onClick={() => increment(ingredient.name, 10)}><strong>+10</strong></button>
                <button onClick={() => resetCounter(ingredient.name)}>Reset</button>
              </div>

              <div className={styles.quantity}>
                <p><strong>Quantity : </strong><span>{quantities[ingredient.name]}</span></p>
              </div>

              <div className={styles.price}>
                <p><strong>Starting price : </strong><span>{price}</span></p>
              </div>

              <div className={styles.totalPrice}>
                <p><strong>Total price : </strong><span>{totalPrice}</span></p>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IngredientsListMarket;
