import { v4 as uuidv4 } from 'uuid';

class UserClass {
    id: string;
    avatars: string[];
    username: string;
    gold: number;
    medals: number;
    level: number;
    experience: number;
    gameOptions: {
        musicEnabled: boolean;
        soundEffectsEnabled: boolean;
    };

    constructor(avatars: string[], username: string) {
        this.id = uuidv4();
        this.avatars = avatars;
        this.username = username;
        this.gold = 0;
        this.medals = 0;
        this.level = 1;
        this.experience = 0;

        // Options de jeu par défaut
        this.gameOptions = {
            musicEnabled: true,
            soundEffectsEnabled: true,
        };
    }

    // Méthode pour choisir un avatar par son index dans le tableau
    chooseAvatar(index: number): void {
        if (index >= 0 && index < this.avatars.length) {
            // + Vérif de l'index pour éviter les erreurs
            this.avatars[index] = this.avatars[index];
        }
    }

    // Ajouter des pièces d'or au porte-monnaie du user
    addGold(amount: number): void {
        this.gold += amount;
    }

    // Ajouter des médailles à l'utilisateur
    addMedals(count: number): void {
        this.medals += count;
    }

    // Augmenter l'expérience de l'utilisateur et gérer la progression de niveau
    gainExperience(amount: number): void {
        this.experience += amount;
        // Logique pour gérer la progression de level
        // -> si l'utilisateur atteint un certain seuil d'xp, son niveau peut augmenter avec de l'or
    }

    // Sauvegarder les informations de l'utilisateur dans le localStorage
    saveToLocalStorage(): void {
        localStorage.setItem('userData', JSON.stringify(this));
    }

    // Charger les informations de l'utilisateur à partir du localStorage
    static loadFromLocalStorage(): UserClass | null {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            return new UserClass(parsedUserData.avatars, parsedUserData.username);
        }
        return null;
    }

    // Effacer les données de l'utilisateur du localStorage
    static clearLocalStorage(): void {
        localStorage.removeItem('userData');
    }
}

export default UserClass;
