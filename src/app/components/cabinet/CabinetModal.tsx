// CabinetModal.tsx

"use client"

import React, { useEffect, useRef, useState } from "react";
import CloseModal from '@/app/components/miscellaneous/CloseModal';
import IngredientsListCabinet from "./IngredientsListCabinet";
import styles from "./cabinetModal.module.scss";
import LevelUser from "../miscellaneous/LevelUser";
import GoldCoins from "../miscellaneous/GoldCoins";
import FilterIngredients from "../miscellaneous/FilterIngredients";
import UserClass from '@/app/OOP/UserClass';
import AppButton from "../miscellaneous/AppButton";
import Image from "next/image";


export interface Ingredient {
    ingredient: {
        name: string;
        type: string;
        rarity: string;
        description: string;
        imagePath: string;
        successRate: number;
        price: number;
    };
    quantity: number;
}

interface CabinetModalProps {
    ingredients: Ingredient[];
    onCloseClick: () => void;
}

const CabinetModal: React.FC<CabinetModalProps> = ({ ingredients, onCloseClick }) => {

    const userRef = useRef(UserClass.loadFromLocalStorage() || new UserClass([], "Guest"));
    const user = userRef.current;

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [goldCoins, setGoldCoins] = useState(user.gold);
    const [isBuying, setIsBuying] = useState(false);

    useEffect(() => {
        user.gold = goldCoins;
        user.saveToLocalStorage();
    }, [goldCoins, user]);

    const handleFilterClick = () => {
        setShowFilter(true);
    };

    const handleBuy = () => {
        return <p></p>
    }

    return (
        <section className={styles.cabinetOverlay}>
            <div className={styles.cabinetModal}>

                <div className={styles.top}>
                    <FilterIngredients onFilterClick={handleFilterClick} />
                    <GoldCoins initialGoldCoins={goldCoins} />
                    <h2>Cabinet</h2>
                    <LevelUser />
                    <CloseModal onClick={onCloseClick} />
                </div>


                <div className={`${styles.list} ${styles.filter} ${styles.details}`}>
                    <IngredientsListCabinet ingredients={ingredients} />
                </div>


                <div className={styles.summary}>
                    <p><strong>Starting price : </strong><span>95</span></p>
                    <h2>Selection</h2>
                    <p><strong>Selling price : </strong><span>115</span></p>
                </div>

                <div className={styles.cartList}>
                    List of 2 ingredients
                </div>


                <div className={styles.chanceOfProfit}>
                    <p><strong>Profit : </strong><span>20</span></p>
                    <p><strong>Success rate : </strong><span>72%</span></p>
                </div>


                <div className={styles.cartListBtn}>
                    <AppButton
                        label={"🍶 Choose"}
                        onClick={handleBuy}
                        disabled={isBuying}
                    />
                </div>


            </div>
        </section>
    );
};

export default CabinetModal;
