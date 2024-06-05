// GoldCoins.tsx

"use client"

import React from 'react';
import styles from "@/app/miscellaneous/miscellaneous.module.scss"

interface GoldCoinsProps {
  goldCoins: number;
}

const GoldCoins: React.FC<GoldCoinsProps> = ({ goldCoins }) => {
  return (
    <>
      <p className={styles.goldSection}><strong>🪙 </strong>{goldCoins}</p>
    </>
  );
};

export default GoldCoins;
