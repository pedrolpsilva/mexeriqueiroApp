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
  usage: string;
  rarity: number;
  icon: string;
  type: string;
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
  };
  setRoundState: (state: Partial<AppState['currentRoundState']>) => void;
  resetRoundState: () => void;
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
          id: 'coringa',
          title: 'Coringa',
          desc: 'Escolhe o tema, ganha 2 dicas extras ou troca a carta.',
          progression: 'Flexibilidade total',
          usage: 'Imediato',
          icon: 'cards-playing-outline',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 'gemeos',
          title: 'Gêmeo do Mau',
          desc: 'O time rival ganha os mesmos pontos que você nesta rodada.',
          progression: 'Risco compartilhado',
          usage: 'Durante a rodada',
          icon: 'user-friends',
          type: 'FontAwesome5',
        },
        {
          id: 'bomb',
          title: 'Autodestruição',
          desc: 'O time perde a rodada instantaneamente.',
          progression: 'Derrota imediata',
          usage: 'Durante a rodada',
          icon: 'bomb',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 'fratura',
          title: 'Fratura',
          desc: 'Se errar, perde pontos conforme o tema.',
          progression: 'Penalidade alta',
          usage: 'Fim da rodada',
          icon: 'bone',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 'riqueza',
          title: 'Riqueza',
          desc: 'Acerto garante o valor máximo do cronômetro.',
          progression: 'Recompensa máxima',
          usage: 'Fim da rodada',
          icon: 'coins',
          type: 'FontAwesome5',
        },
        {
          id: 'dose',
          title: 'Dose Dupla',
          desc: 'Garante uma rodada extra.',
          progression: 'Mais tempo',
          usage: 'Imediato',
          icon: 'cards-playing',
          type: 'MaterialCommunityIcons',
        },
        {
          id: 'oportuno',
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
      },
      setRoundState: (newState) => set((state) => ({
        currentRoundState: { ...state.currentRoundState, ...newState }
      })),
      resetRoundState: () => set((state) => ({
        currentRoundState: {
          specialCard: null,
          word: null,
          theme: null,
          isWordVisible: false,
          timerValue: state.timer || 30,
          isTimerRunning: false,
          roundStarted: false,
          isStealing: false,
        }
      })),
    }),
    {
      name: 'mexeriqueiro-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
