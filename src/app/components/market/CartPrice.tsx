// CartPrice.tsx

"use client"
import React from 'react';
import styles from "@/app/components/market/market.module.scss"

const CartPrice: React.FC = () => {
  return (
    <>
      <div className={styles.cart}>
        <p><strong>Price : </strong>0</p>
      </div>
    </>
  );
};

export default CartPrice;
