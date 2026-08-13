"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
const app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(app);
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
        await (0, firestore_1.setDoc)((0, firestore_1.doc)(db, 'cards_special_default', card.id), card);
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
    const wordsByCategory = {};
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
        await (0, firestore_1.setDoc)((0, firestore_1.doc)(db, 'cards_normal', category), {
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
