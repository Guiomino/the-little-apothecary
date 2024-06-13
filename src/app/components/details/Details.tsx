// Details.tsx

"use client"


import React from 'react';
import { useIngredients } from '@/app/context/IngredientContext';
import Image from 'next/image';

interface DetailsProps {
  ingredientName: string;
  onClose: () => void;
}

const Details: React.FC<DetailsProps> = ({ ingredientName, onClose }) => {
  const ingredients = useIngredients();
  const ingredient = ingredients.find(ingredient => ingredient.name === ingredientName);

  if (!ingredient) {
    return <div>Ingredient not found!</div>;
  };

  return (
    <>
      <h4>{ingredient.name}</h4>
      <p><strong>Description : </strong>{ingredient.description}</p>
      <p><strong>Rarity : </strong>{ingredient.rarity}</p>
      <p><strong>Success Rate : </strong>{ingredient.successRate}%</p>
      <p><strong>Type : </strong>{ingredient.type}</p>
      <Image src={ingredient.imagePath} width={80} height={80} alt={ingredient.name} />
      <button onClick={onClose}>Close</button>
    </>
  );
};

export default Details;
