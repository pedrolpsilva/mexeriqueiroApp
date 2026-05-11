import { syncDatabase } from './DatabaseService';
import { useAppStore } from '../store/useAppStore';

global.fetch = jest.fn();

describe('DatabaseService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAppStore.getState().setSyncStatus('idle'); // Reset state
  });

  it('should handle fetch errors and set syncStatus to error', async () => {
    // Mock the fetch to reject, simulating a network error or failure during sync
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    // Spy on console.error to avoid littering the test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await syncDatabase();

    // Verify it returns the correct error shape
    expect(result).toEqual({
      success: false,
      error: expect.any(Error)
    });

    // Verify the store's syncStatus was updated to 'error'
    const store = useAppStore.getState();
    expect(store.syncStatus).toBe('error');

    consoleSpy.mockRestore();
  });
});
