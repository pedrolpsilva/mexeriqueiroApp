import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { SpecialCard, useAppStore } from '../store/useAppStore';

/**
 * Syncs the game database from Firebase Firestore.
 * Fetches words grouped by category and special cards.
 */
export const syncDatabase = async () => {
  const store = useAppStore.getState();
  store.setSyncStatus('syncing');

  try {
    // 1. Fetch words from cards_normal
    const wordsRef = collection(db, 'cards_normal');
    const wordsSnapshot = await getDocs(wordsRef);

    // Group words by category name
    const wordsByCategory: Record<string, string[]> = {
      Abstrato: [],
      Vivo: [],
      Consumo: [],
      Objeto: [],
      Lazer: [],
    };

    wordsSnapshot.forEach((doc) => {
      const data = doc.data();
      // Firestore doc id is the lowercase category name (e.g., 'vivo').
      // We capitalize the first letter to match the app's state (e.g., 'Vivo')
      const docId = doc.id;
      const categoryName = docId.charAt(0).toUpperCase() + docId.slice(1);
      
      const wordsArray = data.words as string[];
      
      if (wordsArray && Array.isArray(wordsArray)) {
        if (!wordsByCategory[categoryName]) {
          wordsByCategory[categoryName] = [];
        }
        wordsByCategory[categoryName].push(...wordsArray);
      }
    });

    // 2. Fetch active special cards from cards_special_default
    const cardsRef = collection(db, 'cards_special_default');
    const qCards = query(cardsRef, where('status', '==', 'active'));
    const cardsSnapshot = await getDocs(qCards);

    const specialCards: SpecialCard[] = [];
    cardsSnapshot.forEach((doc) => {
      const c = doc.data();
      specialCards.push({
        id: doc.id,
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
      });
    });

    // 3. Save to Zustand store (persisted via AsyncStorage)
    store.setWords(wordsByCategory);
    store.setSpecialCardsData(specialCards);

    return {
      success: true,
      wordCount: Object.values(wordsByCategory).flat().length,
      specialCount: specialCards.length,
    };
  } catch (error) {
    console.error('Erro na sincronização com Firebase:', error);
    store.setSyncStatus('error');
    return { success: false, error };
  }
};
