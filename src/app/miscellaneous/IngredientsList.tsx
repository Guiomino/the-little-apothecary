// IngredientsList.tsx

"use client"

import React, { useState } from 'react';

const IngredientsList: React.FC = () => {
  const [quantity, setQuantity] = useState(0);

  const increment = (amount: number) => {
    setQuantity(prev => prev + amount);
  };

  const decrement = () => {
    setQuantity(prev => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div>
      <div>Ingredients List</div>
      <div>
        Quantity: {quantity}
        <button onClick={() => decrement()}>-</button>
        <button onClick={() => increment(1)}>+</button>
        <button onClick={() => increment(1)}>x1</button>
        <button onClick={() => increment(10)}>x10</button>
        <button onClick={() => increment(100)}>x100</button>
      </div>
    </div>
  );
};

export default IngredientsList;
