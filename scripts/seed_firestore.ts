import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Helper to load .env if not loaded
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.substring(0, eqIdx).trim();
        const val = trimmed.substring(eqIdx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  });
}

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const specialCards = [
  { id: 'coringa', title: 'Coringa', description: 'Se o time acertar a palavra ganhará 30% da pontuação para vitória', status: 'active', points: 10, progression: '30% de pontos', usage: 'Livre', rarity: 1, icon: 'cards-playing-outline', icon_type: 'MaterialCommunityIcons', volatile: false },
  { id: 'gemeos', title: 'Gêmeo do Mau', description: 'O time rival ganha os mesmos pontos que você nesta rodada.', status: 'active', points: 10, progression: 'Risco compartilhado', usage: 'Instantâneo', rarity: 1, icon: 'user-friends', icon_type: 'FontAwesome5', volatile: true },
  { id: 'bomb', title: 'Autodestruição', description: 'O time perde a rodada instantaneamente, passando a vez ao rival sem a possibilidade de roubo de palavra.', status: 'active', points: 10, progression: 'Derrota imediata', usage: 'Instantâneo', rarity: 1, icon: 'bomb', icon_type: 'MaterialCommunityIcons', volatile: false },
  { id: 'fratura', title: 'Fratura', description: 'Caso o time não acerte a PALAVRA DA RODADA ou o tempo acabe, esta carta irá descontar 3 pontos ao time', status: 'active', points: 10, progression: 'Penalidade alta', usage: 'Instantâneo', rarity: 1, icon: 'bone', icon_type: 'MaterialCommunityIcons', volatile: false },
  { id: 'riqueza', title: 'Riqueza', description: 'Acerto garante o valor máximo do cronômetro.', status: 'active', points: 10, progression: 'Recompensa máxima', usage: 'Livre', rarity: 1, icon: 'coins', icon_type: 'FontAwesome5', volatile: true },
  { id: 'dose', title: 'Dose Dupla', description: 'Garante uma rodada extra.', status: 'active', points: 10, progression: 'Mais tempo', usage: 'Instantâneo', rarity: 1, icon: 'cards-playing', icon_type: 'MaterialCommunityIcons', volatile: false },
  { id: 'oportuno', title: 'Oportuno', description: 'Dá uma dica extra ao time.', status: 'active', points: 10, progression: 'Ajuda extra', usage: 'Livre', rarity: 1, icon: 'lightbulb-on', icon_type: 'MaterialCommunityIcons', volatile: false }
];

async function seed() {
  console.log('Enviando cartas especiais (cards_special_default) para o Firestore...');
  for (const card of specialCards) {
    await setDoc(doc(db, 'cards_special_default', card.id), card);
  }
  console.log('Cartas especiais cadastradas com sucesso!');

  console.log('Lendo palavras do arquivo words_migration.sql...');

  const sqlPath = path.join(__dirname, '..', 'words_migration.sql');
  const sqlContent = fs.readFileSync(sqlPath, 'utf8');

  // Regex para achar 'Categoria' e 'Palavra' em pares
  const categoryRegex = /name = '([^']+)'/g;
  const wordRegex = /VALUES \(v_cat_id, '([^']+)'\)/g;

  let categories = [...sqlContent.matchAll(categoryRegex)].map(m => m[1]);
  let words = [...sqlContent.matchAll(wordRegex)].map(m => m[1]);

  console.log(`Encontradas ${words.length} palavras no arquivo. Agrupando por categoria...`);

  // Agrupar palavras por categoria
  const wordsByCategory: Record<string, string[]> = {};
  
  for (let i = 0; i < words.length; i++) {
    const categoryName = categories[i].toLowerCase();
    const word = words[i].replace(/''/g, "'");
    
    if (!wordsByCategory[categoryName]) {
      wordsByCategory[categoryName] = [];
    }
    wordsByCategory[categoryName].push(word);
  }

  console.log('Começando envio para a coleção cards_normal no Firestore...');

  let categoriesCount = 0;
  for (const [category, wordsArray] of Object.entries(wordsByCategory)) {
    // Usar o nome da categoria como ID do documento
    await setDoc(doc(db, 'cards_normal', category), {
      words: wordsArray
    });
    categoriesCount++;
    console.log(`Categoria '${category}' enviada com ${wordsArray.length} palavras.`);
  }
  
  console.log(`Envio finalizado! Total: ${categoriesCount} categorias.`);
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

