import { syncDatabase } from './DatabaseService';
import { useAppStore } from '../store/useAppStore';

// Mock Firebase and Firestore
const mockGetDocs = jest.fn();
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: (...args: any[]) => mockGetDocs(...args),
  query: jest.fn(),
  where: jest.fn(),
  getFirestore: jest.fn(),
}));

jest.mock('./firebase', () => ({
  db: {},
}));

describe('DatabaseService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAppStore.getState().setSyncStatus('idle');
  });

  it('should handle Firebase errors and set syncStatus to error', async () => {
    // Make the first query (words) reject with an error
    mockGetDocs.mockRejectedValueOnce(new Error('Network error'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await syncDatabase();

    expect(result).toEqual({
      success: false,
      error: expect.any(Error),
    });
    expect((result.error as Error).message).toBe('Network error');

    const store = useAppStore.getState();
    expect(store.syncStatus).toBe('error');

    consoleSpy.mockRestore();
  });

  it('should sync words and special cards successfully', async () => {
    // Mock words snapshot (cards_normal)
    mockGetDocs.mockResolvedValueOnce([
      { id: 'abstrato', data: () => ({ words: ['Amor', 'Paz'] }) },
      { id: 'vivo', data: () => ({ words: ['Gato'] }) },
    ]);

    // Mock special_cards snapshot (cards_special_default)
    mockGetDocs.mockResolvedValueOnce([
      {
        id: 'coringa',
        data: () => ({
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
        }),
      }
    ]);

    const result = await syncDatabase();

    expect(result).toEqual({
      success: true,
      wordCount: 3,
      specialCount: 1,
    });

    const store = useAppStore.getState();
    expect(store.words['Abstrato']).toContain('Amor');
    expect(store.words['Abstrato']).toContain('Paz');
    expect(store.words['Vivo']).toContain('Gato');
    expect(store.specialCardsData).toHaveLength(1);
    expect(store.specialCardsData[0].id).toBe('coringa');
  });
});
