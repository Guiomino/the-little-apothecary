// CartList.tsx

"use client"

import React from 'react';
import { useCartItems } from '@/app/context/IngredientContext';
import Image from 'next/image';

const CartList: React.FC = () => {
  const [cartItems, setCartItems] = useCartItems();

  const removeFromCart = (index: number) => {
    setCartItems(prevCartItems => {
      const newCartItems = [...prevCartItems];
      newCartItems.splice(index, 1);
      return newCartItems;
    });
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <Image src={item.ingredient.imagePath} alt={item.ingredient.name} width={50} height={50} />
              <div>
                <p>{item.ingredient.name}</p>
                <p>Rarity : {item.ingredient.rarity}</p>

                <p>Quantity : {item.quantity}</p>
                <p>Total price : {(item.quantity * item.ingredient.priceRange[0])}</p>
                {/* MODIFIER TOTAL PRICE QUI PREND SEULEMENT LE 1ER CHIFFRE DE [] */}

                <button onClick={() => removeFromCart(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartList;
