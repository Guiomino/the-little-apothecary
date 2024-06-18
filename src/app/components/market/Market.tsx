// Market.tsx

"use client"

import React, { useState } from 'react';
import FilterIngredients from '@/app/components/miscellaneous/FilterIngredients';
import GoldCoins from '@/app/components/miscellaneous/GoldCoins';
import LevelUser from '@/app/components/miscellaneous/LevelUser';
import CloseModal from '@/app/components/miscellaneous/CloseModal';
import IngredientsListMarket from '@/app/components/market/IngredientsListMarket';
import CartQuantity from '@/app/components/market/CartQuantity';
import CartPrice from '@/app/components/market/CartPrice';
import CartList from '@/app/components/market/CartList';
import AppButton from '@/app/components/miscellaneous/AppButton';
import styles from "@/app/components/market/market.module.scss"
import Details from '../details/Details';
import IngredientClass from "@/app/OOP/IngredientClass";
import Filter from '../filter/Filter';

interface onCloseClickProps {
    onCloseClick: () => void
};

const Market: React.FC<onCloseClickProps> = ({ onCloseClick }) => {
    const [goldCoins, setGoldCoins] = useState(5000);

    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [showFilter, setShowFilter] = useState<boolean>(false);

    const handleIngredientClick = (ingredient: IngredientClass) => {
        setSelectedIngredient(ingredient.name);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
    };

    const handleFilterClick = (() => {
        setShowFilter(true)
    });

    const handleCloseFilter = (() => {
        setShowFilter(false)
    })

    return (
        <section className={styles.market}>
            <div className={styles.modal}>

                <div className={styles.top}>
                    <FilterIngredients onFilterClick={handleFilterClick} />
                    <GoldCoins goldCoins={goldCoins} />
                    <h2>Market</h2>
                    <LevelUser />
                    <CloseModal onClick={onCloseClick} />
                </div>

                <div className={`${styles.list} ${styles.filter} ${styles.details}`}>
                    <IngredientsListMarket onIngredientClick={handleIngredientClick} />

                    {showDetails && selectedIngredient && (
                        <Details ingredientName={selectedIngredient} onClose={handleCloseDetails} />
                    )}

                    {showFilter && (
                        <Filter onClose={handleCloseFilter} />
                    )}
                </div>

                <div className={styles.summary}>
                    <CartQuantity />
                    <h2>Cart</h2>
                    <CartPrice />
                </div>

                <div className={styles.cartList}>
                    <CartList />
                </div>

                <div className={styles.cartListBtn}>
                    <AppButton
                        label="💰 Buy"
                        onClick={() => {
                            // Logique d'achat ou autre
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Market;
