// GoldCoins.tsx

"use client"

import React from 'react';
import styles from "./miscellaneous.module.scss"
import Image from 'next/image';

interface GoldCoinsProps {
  goldCoins: number;
}

const GoldCoins: React.FC<GoldCoinsProps> = ({ goldCoins }) => {
  return (
    <>
      <p className={styles.goldSection}><Image src={"/images/Miscellaneous/Gold.png"} width={15} height={15} alt='Gold coin' />{goldCoins}</p>
    </>
  );
};

export default GoldCoins;
