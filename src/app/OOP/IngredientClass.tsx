// IngredientClass.tsx

class Ingredient {
    name: string;
    type: string;
    description: string;
    rarity: string;
    imagePath: string;
    successRate: number;
    price: number;
    priceRange: number[];

    constructor(
        name: string,
        type: string,
        description: string,
        rarity: string,
        imagePath: string,
        successRate: number,
        priceRange: number[],
        price?: number // price peut être optionnel lors de la construction
    ) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.rarity = rarity;
        this.imagePath = imagePath;
        this.successRate = successRate;
        this.priceRange = priceRange;
        this.price = price ?? Ingredient.generateRandomPrice(priceRange[0], priceRange[1]); // définir price lors de la création
    }

    // Générer une valeur aléatoire dans une plage donnée
    static generateRandomPrice(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Calcul des prix aléatoires pour tous les ingrédients et les stocker dans localStorage
    static calculateAndStorePrices(ingredients: Ingredient[]): { [name: string]: number } {
        const storedPrices = localStorage.getItem('ingredientPrices');
        let prices: { [name: string]: number };

        if (storedPrices && Object.keys(JSON.parse(storedPrices)).length > 0) {
            prices = JSON.parse(storedPrices);
        } else {
            prices = {};
            ingredients.forEach(ingredient => {
                prices[ingredient.name] = Ingredient.generateRandomPrice(ingredient.priceRange[0], ingredient.priceRange[1]);
            });
            localStorage.setItem('ingredientPrices', JSON.stringify(prices));
        }

        return prices;
    }

    // Initialiser les prix depuis le localStorage
    static initializePrices(ingredients: Ingredient[]): Ingredient[] {
        const prices = this.calculateAndStorePrices(ingredients);
        return ingredients.map(ingredient => {
            ingredient.price = prices[ingredient.name];
            return ingredient;
        });
    }

    // Vider le localStorage
    static clearStoredPrices(): void {
        localStorage.removeItem('ingredientPrices');
    }
}

export default Ingredient;
