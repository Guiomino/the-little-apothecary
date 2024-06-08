// CartQuantity.tsx

"use client"

import React from 'react';
import { useTotalQuantity } from '@/app/context/IngredientContext';
import styles from "@/app/components/market/market.module.scss"
import Image from 'next/image';

const CartQuantity: React.FC = () => {
  const [totalQuantity] = useTotalQuantity();

  return (
    <>
      <div className={styles.cart}>
        <p><Image src={"/images/Miscellaneous/Nbr_Of_Ingr.png"} width={15} height={15} alt='Number of Ingredients' /><strong> Quantity : </strong>{totalQuantity}</p>
      </div>
    </>
  );
};

export default CartQuantity;
