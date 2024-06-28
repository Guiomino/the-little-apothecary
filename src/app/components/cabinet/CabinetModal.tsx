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
    const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<IngredientClass[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    const handleAddIngredient = (ingredient: IngredientClass) => {
        setCartItems(prevItems => {
            if (prevItems.length < 2) {
                setErrorMessage(null); // Réinitialise le message d'erreur
                return [...prevItems, ingredient];
            } else {
                setErrorMessage("Remove an ingredient before adding a new one");
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
                clearTimeout
                return prevItems;
            }
        });
    };

    const removeFromCart = (index: number) => {
        setCartItems(prevItems => {
            const newItems = [...prevItems];
            newItems.splice(index, 1);
            return newItems;
        });
    };

    const handleChoose = () => {
        // A FAIRE
    };

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
                    <IngredientsListCabinet ingredients={ingredients} onIngredientClick={handleIngredientClick} selectedType={selectedType} selectedRarity={selectedRarity} onAddIngredient={handleAddIngredient} />

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
                    {errorMessage && <p>{errorMessage}</p>}
                    <ListChoice cartItems={cartItems} removeFromCart={removeFromCart} />
                </div>

                <div className={styles.chanceOfProfit}>
                    <p><strong>Profit : </strong><span>0</span></p>
                    <p><strong>Success rate : </strong><span>0%</span></p>
                </div>

                <div className={styles.cartListBtn}>
                    <AppButton
                        label={"🍶 Choose"}
                        onClick={handleChoose}
                        disabled={cartItems.length !== 2}
                    />
                </div>
            </div>
        </section>
    );
};

export default CabinetModal;
