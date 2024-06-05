// GoldCoins.tsx

"use client"

import React from 'react';

interface GoldCoinsProps {
  goldCoins: number;
}

const GoldCoins: React.FC<GoldCoinsProps> = ({ goldCoins }) => {
  return (
    <>
      <p><strong>Gold Coins : </strong>{goldCoins}</p>
    </>
  );
};

export default GoldCoins;
