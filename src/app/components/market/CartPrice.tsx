// CartPrice.tsx

"use client"

import React, { useEffect } from 'react';
import styles from "@/app/components/market/market.module.scss"
import Image from 'next/image';
import { useTotalPrice } from '@/app/context/IngredientContext';

const CartPrice: React.FC = () => {
  const [totalPrice] = useTotalPrice();

  return (
    <div className={styles.cart}>
      <p>
        <Image src={"/images/Miscellaneous/Gold.png"} width={15} height={15} alt='Number of Ingredients' />
        <strong>Price : </strong>{totalPrice}
      </p>
    </div>
  );
};

export default CartPrice;
