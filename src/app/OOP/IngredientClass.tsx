// IngredientClass.tsx

class Ingredient {
    name: string;
    type: string;
    description: string;
    rarity: string;
    imagePath: string;
    successRate: number;
    priceRange: number[];

    constructor(
        name: string,
        type: string,
        description: string,
        rarity: string,
        imagePath: string,
        successRate: number,
        priceRange: number[]
    ) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.rarity = rarity;
        this.imagePath = imagePath;
        this.successRate = successRate;
        this.priceRange = priceRange;
    }

    // Générer une valeur aléatoire dans une plage donnée
    static generateRandomPrice(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Calculer les prix aléatoires pour tous les ingrédients et les stocker dans le localStorage
    static calculateAndStorePrices(ingredients: Ingredient[]): number[] {
        const storedPrices = localStorage.getItem('ingredientPrices');
        let prices: number[];

        if (storedPrices) {
            // Si les prix existent dans le localStorage, les utiliser
            prices = JSON.parse(storedPrices);
        } else {
            // Sinon, générer de nouveaux prix et les stocker
            prices = ingredients.map(ingredient =>
                Ingredient.generateRandomPrice(ingredient.priceRange[0], ingredient.priceRange[1])
            );
            localStorage.setItem('ingredientPrices', JSON.stringify(prices));
        }

        return prices;
    }

    // Méthode pour vider le localStorage
    static clearStoredPrices(): void {
        localStorage.removeItem('ingredientPrices');
    }
}

export default Ingredient;
