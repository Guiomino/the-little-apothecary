// CabinetModal.tsx

"use client"

import React, { useEffect, useState } from "react";
import CloseModal from '@/app/components/miscellaneous/CloseModal';
import IngredientsListCabinet from "./IngredientsListCabinet";
import styles from "./cabinetModal.module.scss";
import LevelUser from "../miscellaneous/LevelUser";
import GoldCoins from "../miscellaneous/GoldCoins";
import FilterIngredients from "../miscellaneous/FilterIngredients";
import UserClass from '@/app/OOP/UserClass';
import IngredientClass from '@/app/OOP/IngredientClass';
import AppButton from "../miscellaneous/AppButton";
import Details from "../details/Details";
import IngredientsFilter from "../ingredientsFilter/IngredientsFilter";
import ListChoice from "./ListChoice";

interface CabinetModalProps {
    onCloseClick: () => void;
    ingredients: any[];  // Define the correct type for ingredients
}

const CabinetModal: React.FC<CabinetModalProps> = ({ onCloseClick, ingredients }) => {
    const userRef = React.useRef(UserClass.loadFromLocalStorage() || new UserClass([], "Guest"));
    const user = userRef.current;
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [showFilter, setShowFilter] = React.useState<boolean>(false);
    const [goldCoins, setGoldCoins] = React.useState(user.gold);
    const [isBuying, setIsBuying] = React.useState(false);

    const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    useEffect(() => {
        user.gold = goldCoins;
        user.saveToLocalStorage();
    }, [goldCoins, user]);

    const handleIngredientClick = (ingredient: IngredientClass) => {
        setSelectedIngredient(ingredient.name);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
    };

    const handleFilterClick = () => {
        setShowFilter(true);
    };

    const handleCloseFilter = () => {
        setShowFilter(false);
    };

    const handleReset = (rarity: string | null, type: string | null) => {
        setSelectedRarity(rarity);
        setSelectedType(type);
    };

    const handleAdd = (() => {
        // AFFICHER ListChoice
    });

    const handleBuy = () => {
        return <p></p>
        // CHANGER
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
                    <IngredientsListCabinet ingredients={ingredients} onIngredientClick={handleIngredientClick} selectedType={selectedType} selectedRarity={selectedRarity} />

                    {showDetails && selectedIngredient && (
                        <Details ingredientName={selectedIngredient} onClose={handleCloseDetails} />
                    )}

                    {showFilter && (
                        <IngredientsFilter onClose={handleCloseFilter} onTypeChange={setSelectedType} onRarityChange={setSelectedRarity} onReset={() => handleReset(null, null)} />
                    )}
                </div>

                <div className={styles.summary}>
                    <p><strong>Starting price : </strong><span>0</span></p>
                    <h2>Selection</h2>
                    <p><strong>Selling price : </strong><span>0</span></p>
                </div>

                <div className={styles.cartList}>
                    <ListChoice onAdd={handleAdd} />
                </div>

                <div className={styles.chanceOfProfit}>
                    <p><strong>Profit : </strong><span>0</span></p>
                    <p><strong>Success rate : </strong><span>0%</span></p>
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
