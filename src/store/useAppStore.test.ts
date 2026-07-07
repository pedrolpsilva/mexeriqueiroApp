import { useAppStore, SpecialCard } from './useAppStore';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset to initial state completely
    useAppStore.setState({
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
      }
    });
  });

  describe('addToInventory', () => {
    const mockCard: SpecialCard = {
      id: 'test-card',
      title: 'Test Card',
      desc: 'Test Description',
      status: 'active',
      points: 10,
      progression: '1',
      usage: 'Livre',
      rarity: 1,
      icon: 'test-icon',
      type: 'test-type'
    };

    it('should add a card to team A inventory', () => {
      useAppStore.getState().addToInventory('A', mockCard);
      const state = useAppStore.getState();
      expect(state.currentRoundState.inventoryA).toHaveLength(1);
      expect(state.currentRoundState.inventoryA[0]).toEqual(mockCard);
    });

    it('should not allow more than 2 items in inventory', () => {
      useAppStore.getState().addToInventory('A', { ...mockCard, id: '1' });
      useAppStore.getState().addToInventory('A', { ...mockCard, id: '2' });
      useAppStore.getState().addToInventory('A', { ...mockCard, id: '3' });

      const state = useAppStore.getState();
      expect(state.currentRoundState.inventoryA).toHaveLength(2);
      expect(state.currentRoundState.inventoryA[0].id).toBe('1');
      expect(state.currentRoundState.inventoryA[1].id).toBe('2');
    });

    it('should handle team B inventory separately', () => {
      useAppStore.getState().addToInventory('B', mockCard);
      const state = useAppStore.getState();
      expect(state.currentRoundState.inventoryA).toHaveLength(0);
      expect(state.currentRoundState.inventoryB).toHaveLength(1);
      expect(state.currentRoundState.inventoryB[0]).toEqual(mockCard);
    });
  });

  describe('resetMatch', () => {
    it('should reset all match stats, round state and leader pointers', () => {
      useAppStore.setState({
        leaderIndexA: 2,
        leaderIndexB: 1,
        matchStats: {
          startTime: 123456789,
          totalRounds: 5,
          finalScoreA: 15,
          finalScoreB: 12,
          leaderPoints: { 'Player A': 10 },
          themeStats: { 'Abstrato': { hits: 3, misses: 1 } },
          specialCardsUsed: ['coringa'],
        },
        currentRoundState: {
          specialCard: { id: 'coringa' } as any,
          word: 'Test',
          theme: { id: 'Abstrato' } as any,
          isWordVisible: true,
          timerValue: 15,
          isTimerRunning: true,
          roundStarted: true,
          isStealing: true,
          inventoryA: [{ id: 'coringa' } as any],
          inventoryB: [{ id: 'gemeos' } as any],
          activeCard: { id: 'coringa' } as any,
          onboardingShown: true,
        }
      });

      useAppStore.getState().resetMatch();

      const state = useAppStore.getState();
      expect(state.leaderIndexA).toBe(0);
      expect(state.leaderIndexB).toBe(0);
      expect(state.matchStats.startTime).toBeNull();
      expect(state.matchStats.totalRounds).toBe(0);
      expect(state.matchStats.finalScoreA).toBe(0);
      expect(state.matchStats.finalScoreB).toBe(0);
      expect(state.matchStats.leaderPoints).toEqual({});
      expect(state.matchStats.themeStats).toEqual({});
      expect(state.matchStats.specialCardsUsed).toEqual([]);

      expect(state.currentRoundState.specialCard).toBeNull();
      expect(state.currentRoundState.word).toBeNull();
      expect(state.currentRoundState.theme).toBeNull();
      expect(state.currentRoundState.isWordVisible).toBe(false);
      expect(state.currentRoundState.timerValue).toBe(30);
      expect(state.currentRoundState.isTimerRunning).toBe(false);
      expect(state.currentRoundState.roundStarted).toBe(false);
      expect(state.currentRoundState.isStealing).toBe(false);
      expect(state.currentRoundState.inventoryA).toEqual([]);
      expect(state.currentRoundState.inventoryB).toEqual([]);
      expect(state.currentRoundState.activeCard).toBeNull();
    });
  });
});
