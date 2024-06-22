// GoldCoins.tsx

"use client"

import React, { useEffect, useState } from 'react';
import styles from "./miscellaneous.module.scss";
import Image from 'next/image';
import UserClass from '@/app/OOP/UserClass';

interface GoldCoinsProps {
  initialGoldCoins: number;
}

const GoldCoins: React.FC<GoldCoinsProps> = ({ initialGoldCoins }) => {
  const [currentGold, setCurrentGold] = useState(initialGoldCoins);

  useEffect(() => {
    setCurrentGold(initialGoldCoins);
  }, [initialGoldCoins]);

  useEffect(() => {
    const user = UserClass.loadFromLocalStorage();
    if (user) {
      setCurrentGold(user.gold);
    }
  }, []);

  return (
    <p className={styles.goldSection}>
      <Image src={"/images/Miscellaneous/Gold.png"} width={15} height={15} alt='Gold coin' />
      {currentGold}
    </p>
  );
};

export default GoldCoins;
