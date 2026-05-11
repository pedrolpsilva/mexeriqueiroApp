import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Language = 'BR' | 'US' | 'ES';

interface TeamPlayer {
  id: string;
  name: string;
}

export interface SpecialCard {
  id: string;
  title: string;
  desc: string;
  status: string;
  points: number;
  progression: string;
  usage: string; // 'Instantâneo' | 'Livre (Inventário)'
  rarity: number;
  icon: string;
  type: string;
  volatile?: boolean; // Passa para o rival se perder
}

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;

  // Match Settings
  teamA: TeamPlayer[];
  teamB: TeamPlayer[];
  leaderIndexA: number;
  leaderIndexB: number;
  setTeams: (teamA: TeamPlayer[], teamB: TeamPlayer[]) => void;
  setLeaderIndices: (indexA: number, indexB: number) => void;

  // Match Rules
  scoreToWin: number;
  timer: number;
  canPause: boolean;
  useSound: boolean;
  useAlarm: boolean;
  stealTurn: boolean;
  setMatchRules: (rules: Partial<AppState>) => void;

  // Special Cards
  specialCardsEnabled: boolean;
  selectedCards: Record<string, boolean>;
  setSpecialCardsEnabled: (enabled: boolean) => void;
  toggleSpecialCard: (cardId: string) => void;

  // Database / Words
  words: Record<string, string[]>;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  lastSync: number | null;
  setWords: (words: Record<string, string[]>) => void;
  setSyncStatus: (status: 'idle' | 'syncing' | 'synced' | 'error') => void;

  specialCardsData: SpecialCard[];
  setSpecialCardsData: (cards: SpecialCard[]) => void;

  // Match Statistics
  matchStats: {
    startTime: number | null;
    totalRounds: number;
    finalScoreA: number;
    finalScoreB: number;
    leaderPoints: Record<string, number>; // player name -> total points earned
    themeStats: Record<string, { hits: number; misses: number }>; // theme label -> hits/misses
    specialCardsUsed: string[]; // list of special card IDs used
  };
  updateMatchStats: (stats: Partial<AppState['matchStats']>) => void;
  resetMatchStats: () => void;
  resetMatch: () => void; // alias for resetMatchStats, also clears inventories

  // Game Loop State
  currentRoundState: {
    specialCard: any | null;
    word: string | null;
    theme: any | null;
    isWordVisible: boolean;
    timerValue: number;
    isTimerRunning: boolean;
    roundStarted: boolean;
    isStealing: boolean;
    inventoryA: SpecialCard[];
    inventoryB: SpecialCard[];
    activeCard: SpecialCard | null; // Card currently being used in the round
    onboardingShown: boolean;
  };
  setRoundState: (state: Partial<AppState['currentRoundState']>) => void;
  resetRoundState: () => void;
  addToInventory: (team: 'A' | 'B', card: SpecialCard) => void;
  removeFromInventory: (team: 'A' | 'B', cardId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'BR',
      setLanguage: (lang) => set({ language: lang }),

      teamA: [],
      teamB: [],
      leaderIndexA: 0,
      leaderIndexB: 0,
      setTeams: (teamA, teamB) => set({ teamA, teamB }),
      setLeaderIndices: (leaderIndexA, leaderIndexB) => set({ leaderIndexA, leaderIndexB }),

      scoreToWin: 20,
      timer: 30,
      canPause: true,
      useSound: true,
      useAlarm: true,
      stealTurn: false,
      setMatchRules: (rules) => set((state) => ({ ...state, ...rules })),

      specialCardsEnabled: false,
      selectedCards: {
        coringa: true,
        gemeos: true,
        bomb: true,
        fratura: true,
        riqueza: true,
        dose: true,
        oportuno: true,
      },
      setSpecialCardsEnabled: (enabled) => set({ specialCardsEnabled: enabled }),
      toggleSpecialCard: (cardId) => set((state) => ({
        selectedCards: {
          ...state.selectedCards,
          [cardId]: !state.selectedCards[cardId],
        }
      })),

      // Database / Words
      words: {
        Abstrato: [],
        Vivo: [],
        Consumo: [],
        Objeto: [],
        Lazer: [],
      },
      syncStatus: 'idle',
      lastSync: null,
      setWords: (words) => set({ words, syncStatus: 'synced', lastSync: Date.now() }),
      setSyncStatus: (status) => set({ syncStatus: status }),

      specialCardsData: [
        {
          id: 'coringa', status: 'active', points: 10, rarity: 1,
          title: 'Coringa',
          desc: 'Escolhe o tema, ganha 2 dicas extras ou troca a carta.',
          progression: 'Flexibilidade total',
          usage: 'Livre (Inventário)',
          icon: 'cards-playing-outline',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 'gemeos', status: 'active', points: 10, rarity: 1,
          title: 'Gêmeo do Mau',
          desc: 'O time rival ganha os mesmos pontos que você nesta rodada.',
          progression: 'Risco compartilhado',
          usage: 'Durante a rodada',
          icon: 'user-friends',
          type: 'FontAwesome5',
          volatile: true,
        },
        {
          id: 'bomb', status: 'active', points: 10, rarity: 1,
          title: 'Autodestruição',
          desc: 'O time perde a rodada instantaneamente.',
          progression: 'Derrota imediata',
          usage: 'Instantâneo',
          icon: 'bomb',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 'fratura', status: 'active', points: 10, rarity: 1,
          title: 'Fratura',
          desc: 'Se errar, perde pontos conforme o tema.',
          progression: 'Penalidade alta',
          usage: 'Fim da rodada',
          icon: 'bone',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 'riqueza', status: 'active', points: 10, rarity: 1,
          title: 'Riqueza',
          desc: 'Acerto garante o valor máximo do cronômetro.',
          progression: 'Recompensa máxima',
          usage: 'Livre (Inventário)',
          icon: 'coins',
          type: 'FontAwesome5',
          volatile: true,
        },
        {
          id: 'dose', status: 'active', points: 10, rarity: 1,
          title: 'Dose Dupla',
          desc: 'Garante uma rodada extra.',
          progression: 'Mais tempo',
          usage: 'Imediato',
          icon: 'cards-playing',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 'oportuno', status: 'active', points: 10, rarity: 1,
          title: 'Oportuno',
          desc: 'Dá uma dica extra ao time.',
          progression: 'Ajuda extra',
          usage: 'Imediato',
          icon: 'lightbulb-on',
          type: 'MaterialCommunityIcons',
        },
      ],
      setSpecialCardsData: (cards) => set({ specialCardsData: cards }),

      matchStats: {
        startTime: null,
        totalRounds: 0,
        finalScoreA: 0,
        finalScoreB: 0,
        leaderPoints: {},
        themeStats: {},
        specialCardsUsed: [],
      },
      updateMatchStats: (newStats) => set((state) => ({
        matchStats: { ...state.matchStats, ...newStats }
      })),
      resetMatchStats: () => set({
        matchStats: {
          startTime: Date.now(),
          totalRounds: 0,
          finalScoreA: 0,
          finalScoreB: 0,
          leaderPoints: {},
          themeStats: {},
          specialCardsUsed: [],
        }
      }),
      resetMatch: () => set((state) => ({
        matchStats: {
          startTime: null,
          totalRounds: 0,
          finalScoreA: 0,
          finalScoreB: 0,
          leaderPoints: {},
          themeStats: {},
          specialCardsUsed: [],
        },
        currentRoundState: {
          ...state.currentRoundState,
          specialCard: null,
          word: null,
          theme: null,
          isWordVisible: false,
          timerValue: state.timer || 30,
          isTimerRunning: false,
          roundStarted: false,
          isStealing: false,
          inventoryA: [],
          inventoryB: [],
          activeCard: null,
        }
      })),

      // Game Loop State
      currentRoundState: {
        specialCard: null,
        word: null,
        theme: null,
        isWordVisible: false,
        timerValue: 30,
        isTimerRunning: false,
        roundStarted: false,
        isStealing: false,
        inventoryA: [],
        inventoryB: [],
        activeCard: null,
        onboardingShown: false,
      },
      setRoundState: (newState) => set((state) => ({
        currentRoundState: { ...state.currentRoundState, ...newState }
      })),
      resetRoundState: () => set((state) => ({
        currentRoundState: {
          ...state.currentRoundState,
          specialCard: null,
          word: null,
          theme: null,
          isWordVisible: false,
          timerValue: state.timer || 30,
          isTimerRunning: false,
          roundStarted: false,
          isStealing: false,
          activeCard: null,
        }
      })),
      addToInventory: (team, card) => set((state) => {
        const inventoryKey = team === 'A' ? 'inventoryA' : 'inventoryB';
        const currentInv: SpecialCard[] = state.currentRoundState[inventoryKey] ?? [];
        if (currentInv.length < 2) {
          return {
            currentRoundState: {
              ...state.currentRoundState,
              [inventoryKey]: [...currentInv, card]
            }
          };
        }
        return state; // Handle overflow in UI (replacement logic)
      }),
      removeFromInventory: (team, cardId) => set((state) => {
        const inventoryKey = team === 'A' ? 'inventoryA' : 'inventoryB';
        const currentInv: SpecialCard[] = state.currentRoundState[inventoryKey] ?? [];
        return {
          currentRoundState: {
            ...state.currentRoundState,
            [inventoryKey]: currentInv.filter(c => c.id !== cardId)
          }
        };
      }),
    }),
    {
      name: 'mexeriqueiro-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Deep-merge persisted state so new fields get their defaults
      merge: (persistedState: any, currentState: AppState): AppState => ({
        ...currentState,
        ...persistedState,
        matchStats: {
          ...currentState.matchStats,
          ...(persistedState?.matchStats ?? {}),
          // Ensure arrays are never undefined
          specialCardsUsed: persistedState?.matchStats?.specialCardsUsed ?? [],
          leaderPoints: persistedState?.matchStats?.leaderPoints ?? {},
          themeStats: persistedState?.matchStats?.themeStats ?? {},
        },
        currentRoundState: {
          ...currentState.currentRoundState,
          ...(persistedState?.currentRoundState ?? {}),
          inventoryA: persistedState?.currentRoundState?.inventoryA ?? [],
          inventoryB: persistedState?.currentRoundState?.inventoryB ?? [],
          activeCard: persistedState?.currentRoundState?.activeCard ?? null,
          onboardingShown: persistedState?.currentRoundState?.onboardingShown ?? false,
        },
      }),
    }
  )
);
