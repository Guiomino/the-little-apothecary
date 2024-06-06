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
import styles from "@/app/components/market/market.module.scss"

const Market: React.FC = ( { onCloseClick }: { onCloseclick: () => void }) => {
    const [goldCoins, setGoldCoins] = useState(5000);

    return (
        <section className={styles.market}>
            <div className={styles.modal}>
                <div className={styles.top}>
                    <FilterIngredients />
                    <GoldCoins goldCoins={goldCoins} />
                    <h2>Market</h2>
                    <LevelUser />
                    <CloseModal onClick={onCloseClick}/>
                </div>
                <div className={`${styles.list} ${styles.filter} ${styles.details}`}>
                    <IngredientsList />
                </div>
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
        </section>
    );
};

export default Market;
