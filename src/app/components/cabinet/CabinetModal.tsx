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
    const [startingPrice, setStartingPrice] = useState<number>(0);
    const [sellingPrice, setSellingPrice] = useState<number>(0);
    const [profit, setProfit] = useState<number>(0);
    const [successRate, setSuccessRate] = useState<number | undefined>(0)

    useEffect(() => {
        user.gold = goldCoins;
        user.saveToLocalStorage();
    }, [goldCoins, user]);

    useEffect(() => {
        const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
        setStartingPrice(totalPrice);
        const totalPriceTVA = cartItems.reduce((total, item) => {
            let rarityFactor = 1;
            switch (item.rarity) {
                case 'Common':
                    if (item.price < 10) {
                        rarityFactor = 2;
                    } else {
                        rarityFactor = 1.2;
                    }
                    break;
                case 'Uncommon':
                    rarityFactor = 1.3;
                    break;
                case 'Rare':
                    rarityFactor = 1.4;
                    break;
                case 'Epic':
                    rarityFactor = 1.5;
                    break;
                default:
                    rarityFactor = 1;
            }
            return total + (item.price * rarityFactor);
        }, 0);
        setSellingPrice(Math.floor(totalPriceTVA))
        const totalProfit = Math.floor(totalPriceTVA) - totalPrice
        setProfit(totalProfit)
    }, [cartItems]);

    useEffect(() => {
        if (cartItems.length > 0) {
            const totalSuccessRate = cartItems.reduce((total, item) => total + item.successRate, 0);
            const averageSuccessRate = totalSuccessRate / cartItems.length;
            setSuccessRate(averageSuccessRate);
        } else {
            setSuccessRate(0);
        }
    }, [cartItems]);


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
        const storedItems = JSON.parse(localStorage.getItem('UserIngredientStock') || '[]');
        const storedIngredient = storedItems.find((item: any) => item.ingredient.name === ingredient.name);

        if (storedIngredient) {
            const quantity = storedIngredient.quantity;

            setCartItems(prevItems => {
                const itemCount = prevItems.filter(item => item.name === ingredient.name).length;

                // Vérif si 2 ingredients
                if (prevItems.length >= 2) {
                    setErrorMessage("Remove an ingredient before adding a new one");
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3000);
                    return prevItems;
                }

                // Vérif les conditions de quantity
                if (quantity === 1 && itemCount < 1) {
                    return [...prevItems, ingredient];
                } else if (quantity === 1 && itemCount >= 1) {
                    setErrorMessage("You can only choose this ingredient once.");
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3000);
                    return prevItems;
                } else if (quantity >= 2 && itemCount < 2) {
                    return [...prevItems, ingredient];
                } else if (itemCount >= 2) {
                    setErrorMessage("You can only choose this ingredient twice.");
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3000);
                    return prevItems;
                } else {
                    setErrorMessage("Remove an ingredient before adding a new one");
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3000);
                    return prevItems;
                }
            });
        } else {
            setErrorMessage("Ingredient not found in stock");
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
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
                    <p><strong>Starting price : </strong><span>{startingPrice}</span></p>
                    <h2>Selection</h2>
                    <p><strong>Selling price : </strong><span>{sellingPrice}</span></p>
                </div>

                <div className={styles.cartList}>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                    <ListChoice cartItems={cartItems} removeFromCart={removeFromCart} />
                </div>

                <div className={styles.chanceOfProfit}>
                    <p><strong>Profit : </strong><span>{profit}</span></p>
                    <p><strong>Success rate : </strong><span>{successRate}%</span></p>
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
