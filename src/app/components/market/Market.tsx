// Market.tsx

"use client"

import React, { useState, useEffect, useRef } from 'react';
import FilterIngredients from '@/app/components/miscellaneous/FilterIngredients';
import GoldCoins from '@/app/components/miscellaneous/GoldCoins';
import LevelUser from '@/app/components/miscellaneous/LevelUser';
import CloseModal from '@/app/components/miscellaneous/CloseModal';
import IngredientsListMarket from '@/app/components/market/IngredientsListMarket';
import CartQuantity from '@/app/components/market/CartQuantity';
import CartPrice from '@/app/components/market/CartPrice';
import CartList from '@/app/components/market/CartList';
import AppButton from '@/app/components/miscellaneous/AppButton';
import styles from "@/app/components/market/market.module.scss";
import Details from '../details/Details';
import IngredientClass from "@/app/OOP/IngredientClass";
import IngredientsFilter from '../ingredientsFilter/IngredientsFilter';
import { useCartItems, useTotalPrice, useTotalQuantity } from '@/app/context/IngredientContext';
import UserClass from '@/app/OOP/UserClass';

interface onCloseClickProps {
    onCloseClick: () => void;
}

const Market: React.FC<onCloseClickProps> = ({ onCloseClick }) => {
    const userRef = useRef(UserClass.loadFromLocalStorage() || new UserClass([], "Guest"));
    const user = userRef.current;

    const [goldCoins, setGoldCoins] = useState(user.gold);
    const [cartItems, setCartItems] = useCartItems();
    const [totalPrice, setTotalPrice] = useTotalPrice();
    const [totalQuantity, setTotalQuantity] = useTotalQuantity();
    const [isBuying, setIsBuying] = useState(false);
    const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [showFilter, setShowFilter] = useState<boolean>(false);
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

    const saveToLocalStorage = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const loadFromLocalStorage = (key: string) => {
        const value = localStorage.getItem(key) as string | null;
        return value ? JSON.parse(value) : [];
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const ingredientPrice = item.ingredient.price !== undefined ? item.ingredient.price : 0;
            return total + item.quantity * ingredientPrice;
        }, 0);
    };

    const handleBuy = () => {
        if (cartItems.length === 0) {
            return; // Do nothing if the cart is empty
        }

        const totalPrice = calculateTotalPrice();

        if (totalPrice > goldCoins) {
            setPurchaseMessage("You don't have enough gold");
            setTimeout(() => {
                setPurchaseMessage(null);
            }, 1500);
            return;
        }

        setIsBuying(true);
        setPurchaseMessage("Success!");

        const existingInventory = loadFromLocalStorage('UserIngredientStock') as any[];
        const updatedInventory = [...existingInventory];

        cartItems.forEach((cartItem) => {
            const index = updatedInventory.findIndex(item => item.ingredient.name === cartItem.ingredient.name);
            if (index > -1) {
                updatedInventory[index].quantity += cartItem.quantity;
            } else {
                updatedInventory.push(cartItem);
            }
        });

        saveToLocalStorage('UserIngredientStock', updatedInventory);
        setCartItems([]);
        setGoldCoins(prevGoldCoins => {
            const newGold = prevGoldCoins - totalPrice;
            user.gold = newGold;
            user.saveToLocalStorage();
            return newGold;
        });
        setTotalQuantity(0);
        setTotalPrice(0);

        setTimeout(() => {
            setIsBuying(false);
            setPurchaseMessage(null);
            onCloseClick();
        }, 1000);
    };

    return (
        <section className={styles.market}>
            <div className={styles.modal}>

                <div className={styles.top}>
                    <FilterIngredients onFilterClick={handleFilterClick} />
                    <GoldCoins initialGoldCoins={goldCoins} />
                    <h2>Market</h2>
                    <LevelUser />
                    <CloseModal onClick={onCloseClick} />
                </div>

                <div className={`${styles.list} ${styles.filter} ${styles.details}`}>
                    <IngredientsListMarket onIngredientClick={handleIngredientClick} selectedType={selectedType} selectedRarity={selectedRarity} />

                    {showDetails && selectedIngredient && (
                        <Details ingredientName={selectedIngredient} onClose={handleCloseDetails} />
                    )}

                    {showFilter && (
                        <IngredientsFilter onClose={handleCloseFilter} onTypeChange={setSelectedType} onRarityChange={setSelectedRarity} onReset={() => handleReset(null, null)} />
                    )}
                </div>

                <div className={styles.summary}>
                    <CartQuantity />
                    <h2>Cart</h2>
                    <CartPrice />
                </div>

                <div className={styles.cartList}>
                    <CartList onBuy={handleBuy} />
                </div>

                <div className={styles.cartListBtn}>
                    <AppButton
                        label={purchaseMessage || "💰 Buy"}
                        onClick={handleBuy}
                        disabled={isBuying} // Disable the button while buying
                    />
                </div>
            </div>
        </section>
    );
};

export default Market;
