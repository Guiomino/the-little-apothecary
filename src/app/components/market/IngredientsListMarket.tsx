// IngredientsListMarket.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { useCartItems, useIngredients, useTotalPrice, useTotalQuantity } from '@/app/context/IngredientContext';
import IngredientClass from "@/app/OOP/IngredientClass";
import styles from "./ingredient.module.scss";
import Image from 'next/image';

const loadFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key) as string | null;
  return value && JSON.parse(value).length > 0 ? JSON.parse(value) : null;
};

const IngredientsListMarket: React.FC = () => {
  const ingredients = useIngredients();
  const [quantities, setQuantities] = useState<number[]>([]);
  const [totalQuantity, setTotalQuantity] = useTotalQuantity();
  const [totalPrice, setTotalPrice] = useTotalPrice();
  const [cartItems, setCartItems] = useCartItems();
  const [prices, setPrices] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPrices = loadFromLocalStorage('ingredientPrices');
    if (storedPrices) {
      setPrices(storedPrices);
    } else {
      const newPrices = ingredients.map(ingredient =>
        IngredientClass.generateRandomPrice(ingredient.priceRange[0], ingredient.priceRange[1])
      );
      localStorage.setItem('ingredientPrices', JSON.stringify(newPrices));
      setPrices(newPrices);
    }

    const initialQuantities = new Array(ingredients.length).fill(0);
    setQuantities(initialQuantities);
    setLoading(false);
  }, [ingredients]);

  useEffect(() => {
    const total = quantities.reduce((sum, quantity) => sum + quantity, 0);
    setTotalQuantity(total);

    const totalPrice = quantities.reduce((sum, quantity, index) => sum + (quantity * prices[index]), 0);
    setTotalPrice(totalPrice);

    const updatedCartItems = ingredients.map((ingredient, index) => ({
      ingredient,
      quantity: quantities[index],
    })).filter(item => item.quantity > 0);
    setCartItems(updatedCartItems);
  }, [quantities, prices, setTotalQuantity, setTotalPrice, ingredients, setCartItems]);

  const increment = (index: number, amount: number) => {
    setQuantities(prev => {
      const newQuantities = [...prev];
      newQuantities[index] = Math.max(newQuantities[index] + amount, 0);
      return newQuantities;
    });
  };

  const resetCounter = (index: number) => {
    setQuantities(prev => {
      const newQuantities = [...prev];
      newQuantities[index] = 0;
      return newQuantities;
    });
  };

  const getTotalPrice = ((index: number) => {
    return quantities[index] * prices[index]
  });

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
      {ingredients.map((ingredient, index) => {
        const price = prices[index] !== undefined ? prices[index] : 'N/A';
        const isPriority = index < 5;
        const rarityClass  = getRarityClass(ingredient.rarity);
        const typeImg = getTypeImg(ingredient.type);
        const rarityImg = getRarityImg(ingredient.rarity);
        const totalPrice = getTotalPrice(index);

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
                <button onClick={() => increment(index, -10)}>-10</button>
                <button onClick={() => increment(index, -1)}>-1</button>
                <button onClick={() => increment(index, 1)}><strong>+1</strong></button>
                <button onClick={() => increment(index, 10)}><strong>+10</strong></button>
                <button onClick={() => resetCounter(index)}>Reset</button>
              </div>

              <div className={styles.quantity}>
                <p><strong>Quantity : </strong><span>{quantities[index]}</span></p>
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

