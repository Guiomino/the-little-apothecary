// ListChoice.tsx

"use client"

import React, { useEffect, useState } from 'react';
import { useCartItems, useResetCounter } from '@/app/context/IngredientContext';
import Image from 'next/image';
import styles from "../market/market.module.scss";
import IngredientClass from '@/app/OOP/IngredientClass';

interface ListChoiceProps {
    onAdd: () => void;
};

const ListChoice: React.FC<ListChoiceProps> = ({ onAdd }) => {
    const [cartItems, setCartItems] = useCartItems();
    const resetCounter = useResetCounter();
    const [prices, setPrices] = useState<{ [key: string]: number }>({});

    const removeFromCart = (index: number) => {
        setCartItems(prevCartItems => {
            const newCartItems = [...prevCartItems];
            const removedItem = newCartItems.splice(index, 1)[0];
            resetCounter(removedItem.ingredient.name);
            return newCartItems;
        });
    };

    const getTypeImg = (type: string) => {
        switch (type) {
            case 'Mineral':
                return <Image src={"/images/Type/Type_Mineral.png"} width={10} height={10} alt="Mineral" />;
            case 'Vegetal':
                return <Image src={"/images/Type/Type_Vegetal.png"} width={10} height={10} alt="Vegetal" />;
            case 'Animal':
                return <Image src={"/images/Type/Type_Animal.png"} width={10} height={10} alt="Animal" />;
            case 'Mushroom':
                return <Image src={"/images/Type/Type_Mushroom.png"} width={10} height={10} alt="Mushroom" />;
            default:
                return '';
        }
    };

    const getRarityImg = (type: string) => {
        switch (type) {
            case 'Common':
                return <Image src={"/images/Rarity/Star_Common.png"} width={20} height={20} alt="Common" />;
            case 'Uncommon':
                return <Image src={"/images/Rarity/Star_Uncommon.png"} width={20} height={20} alt="Uncommon" />;
            case 'Rare':
                return <Image src={"/images/Rarity/Star_Rare.png"} width={20} height={20} alt="Rare" />;
            case 'Epic':
                return <Image src={"/images/Rarity/Star_Epic.png"} width={20} height={20} alt="Epic" />;
            default:
                return '';
        }
    };

    const getMessage = () => {
        if (cartItems.length === 0) {
            return 'Choose 2 ingredients for potion creation';
        } else if (cartItems.length === 1) {
            return 'Choose 1 more ingredient for potion creation';
        }
        return '';
    };

    return (
        <div className={styles.cart}>
            <p style={{ textAlign: "center", marginTop: "10%" }}>{getMessage()}</p>
            {cartItems.length > 0 && (
                <ul>
                    {cartItems.map((item, index) => {
                        const rarityImg = getRarityImg(item.ingredient.rarity);
                        const typeImg = getTypeImg(item.ingredient.type);
                        const ingredientPrice = item.ingredient.price !== undefined ? item.ingredient.price : prices[item.ingredient.name] || 0;
                        const totalPrice = item.quantity * ingredientPrice;

                        return (
                            <li className={styles.cartItem} key={index}>
                                <div className={styles.cartItemImg}>
                                    <Image src={item.ingredient.imagePath} alt={item.ingredient.name} width={30} height={30} />
                                    <div>{typeImg}</div>
                                </div>

                                <div className={styles.cartItemTitle}>
                                    <h4>{item.ingredient.name}</h4>
                                    <p>{rarityImg} {item.ingredient.rarity}</p>
                                </div>

                                <div className={styles.cartItemDetails}>
                                    <p>Quantity : {item.quantity}</p>
                                    <p>Price : {totalPrice}</p>
                                </div>

                                <div className={styles.cartItemRemove}>
                                    <button onClick={() => removeFromCart(index)}>X</button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default ListChoice;
