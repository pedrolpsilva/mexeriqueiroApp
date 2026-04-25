
interface GameState {
    teams: { name: string; score: number }[];
    currentTeamIndex: number;
    currentTheme: 'Abstrato' | 'Vivo' | 'Consumo' | 'Objeto' | 'Lazer' | 'Especial' | null;
    gameDeck: Card[];
    specialCards: SpecialCard[];
    status: 'lobby' | 'rolling' | 'playing' | 'scoring';

    // Ações
    rollDice: () => void;
    nextTurn: () => void;
}