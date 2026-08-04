import { supabase } from './supabase';
import { SpecialCard, useAppStore } from '../store/useAppStore';

/**
 * Syncs the game database from Supabase.
 * Fetches words grouped by category and special cards.
 */
export const syncDatabase = async () => {
  const store = useAppStore.getState();
  store.setSyncStatus('syncing');

  try {
    // 1. Fetch words with their category names via join
    const { data: wordsData, error: wordsError } = await supabase
      .from('words')
      .select('word, categories!inner(name)')
      .order('word');

    if (wordsError) throw wordsError;

    // Group words by category name
    const wordsByCategory: Record<string, string[]> = {
      Abstrato: [],
      Vivo: [],
      Consumo: [],
      Objeto: [],
      Lazer: [],
    };

    for (const row of wordsData ?? []) {
      const categoryName = (row.categories as any).name as string;
      if (wordsByCategory[categoryName]) {
        wordsByCategory[categoryName].push(row.word);
      }
    }

    // 2. Fetch active special cards
    const { data: cardsData, error: cardsError } = await supabase
      .from('special_cards')
      .select('*')
      .eq('status', 'active');

    if (cardsError) throw cardsError;

    const specialCards: SpecialCard[] = (cardsData ?? []).map((c) => ({
      id: c.id,
      title: c.title,
      desc: c.description,
      status: c.status,
      points: c.points,
      progression: c.progression ?? '',
      usage: c.usage as 'Livre' | 'Instantâneo',
      rarity: c.rarity,
      icon: c.icon,
      type: c.icon_type,
      volatile: c.volatile,
    }));

    // 3. Save to Zustand store (persisted via AsyncStorage)
    store.setWords(wordsByCategory);
    store.setSpecialCardsData(specialCards);

    return {
      success: true,
      wordCount: Object.values(wordsByCategory).flat().length,
      specialCount: specialCards.length,
    };
  } catch (error) {
    console.error('Erro na sincronização:', error);
    store.setSyncStatus('error');
    return { success: false, error };
  }
};
