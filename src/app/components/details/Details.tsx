// Details.tsx

"use client"

import React, { useEffect, useState } from 'react';
import { useIngredients } from '@/app/context/IngredientContext';
import Image from 'next/image';
import styles from "./details.module.scss"
import IngredientClass from "@/app/OOP/IngredientClass";

interface DetailsProps {
  ingredientName: string;
  onClose: () => void;
};

const loadFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const Details: React.FC<DetailsProps> = ({ ingredientName, onClose }) => {
  const ingredients = useIngredients();
  const ingredient = ingredients.find(ingredient => ingredient.name === ingredientName);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const storedPrices = loadFromLocalStorage('ingredientPrices');
    if (storedPrices && ingredient) {
      setPrice(storedPrices[ingredient.name] || null);
    }
  }, [ingredient]);


  if (!ingredient) {
    return <div>Ingredient not found!</div>;
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

  const getImprovementValues = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return { successRates: [95, 98], priceIncreases: [7.5, 15] };
      case 'Uncommon':
        return { successRates: [90, 95], priceIncreases: [10, 20] };
      case 'Rare':
        return { successRates: [80, 90], priceIncreases: [20, 40] };
      case 'Epic':
        return { successRates: [75, 85], priceIncreases: [35, 55] };
      default:
        return { successRates: [], priceIncreases: [] };
    }
  };

  const goldImage = <Image src={"/images/Miscellaneous/Gold.png"} width={10} height={10} alt="Gold" />

  const rarityClass = getRarityClass(ingredient.rarity);
  const typeImg = getTypeImg(ingredient.type);
  const rarityImg = getRarityImg(ingredient.rarity);
  const { priceIncreases, successRates } = getImprovementValues(ingredient.rarity);

  return (
    <>
      <section className={`${styles.details} ${rarityClass}`}>

        <div className={styles.title}>
          <div className={styles.titleImg}>
            <Image src={ingredient.imagePath} width={80} height={80} alt={ingredient.name} />
          </div>
          <div className={styles.titleName}>
            <h4>{ingredient.name}</h4>
          </div>
          <div className={styles.titleClose}>
            <button onClick={onClose}>X</button>
          </div>
        </div>

        <div className={styles.type}>
          <p>{rarityImg}<strong>Rarity : </strong>{ingredient.rarity}</p>
          <p>{typeImg}<strong>Type : </strong>{ingredient.type}</p>
        </div>

        <div className={styles.description}>
          <div className={styles.PriceAndStock}>
            <p><strong>Price : </strong>{goldImage}<span>{price !== null ? price : 'N/A'}</span></p>
            <p><strong>Stock : </strong>0</p>
          </div>
          <p><strong>Description : </strong>{ingredient.description}</p>
          <p><strong>Success Rate : </strong><span>{ingredient.successRate}%</span></p>
        </div>

        <div className={styles.improvement}>
          <p><strong>Improvement : </strong></p>

          <div>
            <div className={styles.lockedMedal}>1</div>
            <p className={styles.locked}>Use {ingredient.name} <strong>3</strong> more times to reveal</p>
            <p className={styles.unlocked}><strong>+{successRates[0]}%</strong> success rate when creating your potions containing {ingredient.name}</p>
          </div>

          <div>
            <div className={styles.lockedMedal}>2</div>
            <p className={styles.locked}>Use {ingredient.name} <strong>10</strong> more times to reveal</p>
            <p className={styles.unlocked}><strong>+{successRates[1]}%</strong> success rate when creating your potions containing {ingredient.name}</p>
          </div>

          <div>
            <div className={styles.lockedMedal}>3</div>
            <p className={styles.locked}>Earn <strong>50 gold coins</strong> from {ingredient.name} to reveal</p>
            <p className={styles.unlocked}><strong>+{priceIncreases[0]}%</strong> of the price when creating your potions containing {ingredient.name}</p>
          </div>

          <div>
            <div className={styles.lockedMedal}>4</div>
            <p className={styles.locked}>Earn <strong>100 gold coins</strong> from {ingredient.name} to reveal</p>
            <p className={styles.unlocked}><strong>+{priceIncreases[1]}%</strong> of the price when creating your potions containing {ingredient.name}</p>
          </div>

        </div>

      </section>
    </>
  );
};

export default Details;
