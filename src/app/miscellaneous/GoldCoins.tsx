// GoldCoins.tsx

"use client"

import React from 'react';

interface GoldCoinsProps {
  goldCoins: number;
}

const GoldCoins: React.FC<GoldCoinsProps> = ({ goldCoins }) => {
  return (
    <div>
      Gold Coins: {goldCoins}
    </div>
  );
};

export default GoldCoins;
