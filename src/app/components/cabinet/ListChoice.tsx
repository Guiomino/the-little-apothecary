// ListChoice.tsx

"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import styles from "./cabinetModal.module.scss"
import IngredientClass from '@/app/OOP/IngredientClass';

interface ListChoiceProps {
    cartItems: IngredientClass[];
    removeFromCart: (index: number) => void;
};

const ListChoice: React.FC<ListChoiceProps> = ({ cartItems, removeFromCart }) => {
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
            <p>{getMessage()}</p>
            {cartItems.length > 0 && (
                <ul>
                    {cartItems.map((item, index) => {
                        const rarityImg = getRarityImg(item.rarity);
                        const typeImg = getTypeImg(item.type);

                        return (
                            <li className={styles.cartItem} key={index}>
                                <div className={styles.cartItemImg}>
                                    <Image src={item.imagePath} alt={item.name} width={30} height={30} />
                                    <div>{typeImg}</div>
                                </div>

                                <div className={styles.cartItemTitle}>
                                    <h4>{item.name}</h4>
                                    <p>{rarityImg} {item.rarity}</p>
                                </div>

                                <div className={styles.cartItemDetails}>
                                    <p>Price : {item.price}</p>
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
