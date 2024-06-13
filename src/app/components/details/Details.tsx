// Details.tsx

"use client"

import React from 'react';
import { useIngredients } from '@/app/context/IngredientContext';
import Image from 'next/image';
import styles from "./details.module.scss"
import IngredientClass from "@/app/OOP/IngredientClass";

interface DetailsProps {
  ingredientName: string;
  onClose: () => void;
};

const Details: React.FC<DetailsProps> = ({ ingredientName, onClose }) => {
  const ingredients = useIngredients();
  const ingredient = ingredients.find(ingredient => ingredient.name === ingredientName);

  if (!ingredient) {
    return <div>Ingredient not found!</div>;
  };

  return (
    <>
      <section>
        <div className={styles.top}>
          <div>
            <Image src={ingredient.imagePath} width={80} height={80} alt={ingredient.name} />
          </div>
          <div>
            <h4>{ingredient.name}</h4>
          </div>
          <div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>


        <div>
          <p><strong>Rarity : </strong>{ingredient.rarity}</p>
          <p><strong>Type : </strong>{ingredient.type}</p>
        </div>

        <div>
          <p><strong>Price : </strong>200</p>
          <p><strong>Stock : </strong>2</p>
          <p><strong>Description : </strong>{ingredient.description}</p>
          <p><strong>Success Rate : </strong>{ingredient.successRate}%</p>
        </div>


        <div>
          <p><strong>Improvement : </strong></p>
          <p>Use {ingredient.name} <strong>3</strong> more times to reveal</p>
          <p>Use {ingredient.name} <strong>10</strong> more times to reveal</p>
          <p>Earn <strong>50 gold coins</strong> from {ingredient.name} to reveal</p>
          <p>Earn <strong>100 gold coins</strong> from {ingredient.name} to reveal</p>

          <p><strong>+ 7.5%</strong> of the price when creating your potions containing {ingredient.name}</p>
          <p><strong>+ 15%</strong> of the price when creating your potions containing {ingredient.name}</p>
          <p><strong>+5%</strong> success rate when creating your potions containing {ingredient.name}</p>
          <p><strong>+10%</strong> success rate when creating your potions containing {ingredient.name}</p>
        </div>
      </section>
    </>
  );
};

export default Details;
