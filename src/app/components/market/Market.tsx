// Market.tsx

"use client"

import React, { useState } from 'react';
import FilterIngredients from '@/app/miscellaneous/FilterIngredients';
import GoldCoins from '@/app/miscellaneous/GoldCoins';
import LevelUser from '@/app/miscellaneous/LevelUser';
import CloseModal from '@/app/miscellaneous/CloseModal';
import IngredientsList from '@/app/miscellaneous/IngredientsList';
import CartQuantity from '@/app/components/market/CartQuantity';
import CartPrice from '@/app/components/market/CartPrice';
import CartList from '@/app/components/market/CartList';
import AppButton from '@/app/miscellaneous/AppButton';

const Market: React.FC = () => {
    const [goldCoins, setGoldCoins] = useState(5000);

    return (
        <div>
            <CloseModal />
            <GoldCoins goldCoins={goldCoins} />
            <LevelUser />
            <FilterIngredients />
            <IngredientsList />
            <CartQuantity />
            <CartPrice />
            <CartList />
            <AppButton
                label="Buy"
                onClick={() => {
                    // Logique d'achat ou autre
                }}
            />
        </div>
    );
};

export default Market;
