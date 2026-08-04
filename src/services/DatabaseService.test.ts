import { syncDatabase } from './DatabaseService';
import { useAppStore } from '../store/useAppStore';

// Mock the supabase client module
const mockSelect = jest.fn();
const mockOrder = jest.fn();
const mockEq = jest.fn();
const mockFrom = jest.fn();

jest.mock('./supabase', () => ({
  supabase: {
    from: (...args: any[]) => mockFrom(...args),
  },
}));

describe('DatabaseService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAppStore.getState().setSyncStatus('idle');

    // Default chain: from() -> select() -> order() / eq()
    mockFrom.mockReturnValue({
      select: mockSelect,
    });
    mockSelect.mockReturnValue({
      order: mockOrder,
      eq: mockEq,
    });
  });

  it('should handle Supabase errors and set syncStatus to error', async () => {
    // Make the first query (words) reject with an error
    mockOrder.mockResolvedValueOnce({
      data: null,
      error: { message: 'Network error', code: 'PGRST000' },
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await syncDatabase();

    expect(result).toEqual({
      success: false,
      error: expect.objectContaining({ message: 'Network error' }),
    });

    const store = useAppStore.getState();
    expect(store.syncStatus).toBe('error');

    consoleSpy.mockRestore();
  });

  it('should sync words and special cards successfully', async () => {
    // Mock words query: from('words').select(...).order(...)
    mockOrder.mockResolvedValueOnce({
      data: [
        { word: 'Amor', categories: { name: 'Abstrato' } },
        { word: 'Gato', categories: { name: 'Vivo' } },
      ],
      error: null,
    });

    // Mock special_cards query: from('special_cards').select(...).eq(...)
    mockEq.mockResolvedValueOnce({
      data: [
        {
          id: 'coringa',
          title: 'Coringa',
          description: 'Carta especial',
          status: 'active',
          points: 0,
          progression: '30% de pontos',
          usage: 'Livre',
          rarity: 3,
          icon: 'cards-playing-outline',
          icon_type: 'MaterialCommunityIcons',
          volatile: false,
        },
      ],
      error: null,
    });

    const result = await syncDatabase();

    expect(result).toEqual({
      success: true,
      wordCount: 2,
      specialCount: 1,
    });

    const store = useAppStore.getState();
    expect(store.syncStatus).toBe('synced');
    expect(store.words['Abstrato']).toContain('Amor');
    expect(store.words['Vivo']).toContain('Gato');
    expect(store.specialCardsData).toHaveLength(1);
    expect(store.specialCardsData[0].id).toBe('coringa');
  });
});
