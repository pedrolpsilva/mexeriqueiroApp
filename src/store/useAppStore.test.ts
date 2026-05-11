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
      usage: 'Livre (Inventário)',
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
});
