// CartQuantity.tsx

"use client"

import React from 'react';
import styles from "@/app/components/market/market.module.scss"

const CartQuantity: React.FC = () => {
  return (
    <>
      <div className={styles.cart}>
        <p><strong>Quantity : </strong>0</p>
      </div>
    </>
  );
};

export default CartQuantity;
