import { SpecialCard, useAppStore } from '../store/useAppStore';

/**
 * Robust CSV line parser that handles quoted values containing commas.
 */
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let curVal = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (insideQuotes && i + 1 < line.length && line[i + 1] === '"') {
        curVal += '"';
        i++; // skip the second quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      result.push(curVal.trim());
      curVal = '';
    } else {
      curVal += char;
    }
  }
  result.push(curVal.trim());
  return result;
}

const COMMON_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1kKMsOyfQsI7nxjjNL0mi6IXTry7V-tFH/export?format=csv&gid=299054325';
const SPECIAL_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1kKMsOyfQsI7nxjjNL0mi6IXTry7V-tFH/export?format=csv&gid=1243982418';

const ID_MAPPING: Record<string, string> = {
  '1': 'coringa',
  '2': 'gemeos',
  '3': 'bomb',
  '4': 'fratura',
  '5': 'riqueza',
  '6': 'dose',
  '7': 'oportuno',
};

const ICON_MAPPING: Record<string, { icon: string, type: string }> = {
  coringa: { icon: 'cards-playing-outline', type: 'MaterialCommunityIcons' },
  gemeos: { icon: 'user-friends', type: 'FontAwesome5' },
  bomb: { icon: 'bomb', type: 'MaterialCommunityIcons' },
  fratura: { icon: 'bone', type: 'MaterialCommunityIcons' },
  riqueza: { icon: 'coins', type: 'FontAwesome5' },
  dose: { icon: 'cards-playing', type: 'MaterialCommunityIcons' },
  oportuno: { icon: 'lightbulb-on', type: 'MaterialCommunityIcons' },
};

const USAGE_MAPPING: Record<string, 'Livre' | 'Instantâneo'> = {
  coringa: 'Livre',
  gemeos: 'Instantâneo',
  bomb: 'Instantâneo',
  fratura: 'Instantâneo',
  riqueza: 'Livre',
  dose: 'Instantâneo',
  oportuno: 'Livre',
};

export const syncDatabase = async () => {
  const store = useAppStore.getState();
  store.setSyncStatus('syncing');

  try {
    // 1. Fetch Data Concurrently
    const [commonRes, specialRes] = await Promise.all([
      fetch(COMMON_SHEET_URL),
      fetch(SPECIAL_SHEET_URL)
    ]);

    if (!commonRes.ok) throw new Error('Falha ao baixar deck comum');
    if (!specialRes.ok) throw new Error('Falha ao baixar deck especial');

    const [commonCsv, specialCsv] = await Promise.all([
      commonRes.text(),
      specialRes.text()
    ]);

    // 2. Parse Common Cards
    const commonLines = commonCsv.split(/\r?\n/);

    const commonHeaders = parseCsvLine(commonLines[0]);
    const wordData: Record<string, string[]> = {
      Abstrato: [],
      Vivo: [],
      Consumo: [],
      Objeto: [],
      Lazer: [],
    };

    for (let i = 1; i < commonLines.length; i++) {
      if (!commonLines[i].trim()) continue;
      const values = parseCsvLine(commonLines[i]);
      commonHeaders.forEach((header, index) => {
        const word = values[index];
        if (word && !word.includes('-') && wordData[header]) {
          wordData[header].push(word);
        }
      });
    }

    // 2. Fetch Special Cards
    if (!specialRes.ok) throw new Error('Falha ao baixar deck especial');
    const specialLines = specialCsv.split(/\r?\n/);

    const specialCards: SpecialCard[] = [];
    const specialHeaders = parseCsvLine(specialLines[0]);

    // Header Mapping: Id, Título, Descrição, Progressão, Uso
    const hIdx = {
      id: specialHeaders.indexOf('Id'),
      title: specialHeaders.indexOf('Nome'),
      desc: specialHeaders.indexOf('Descrição'),
      status: specialHeaders.indexOf('Status'),
      points: specialHeaders.indexOf('Pontos'),
      prog: specialHeaders.indexOf('Progressão'),
      usage: specialHeaders.indexOf('Uso'),
      rarity: specialHeaders.indexOf('Raridade'),
      icon: specialHeaders.indexOf('Icone'),
    };

    for (let i = 1; i < specialLines.length; i++) {
      if (!specialLines[i].trim()) continue;
      const values = parseCsvLine(specialLines[i]);

      const rawId = values[hIdx.id]?.toLowerCase() || '';
      const id = ID_MAPPING[rawId] || rawId;
      const iconInfo = ICON_MAPPING[id] || { icon: 'help-circle', type: 'Ionicons' };

      const isCoringa = id === 'coringa';
      const isFratura = id === 'fratura';
      const isRiqueza = id === 'riqueza';
      specialCards.push({
        id,
        title: isCoringa ? 'Coringa' : (isFratura ? 'Fratura' : (isRiqueza ? 'Riqueza' : values[hIdx.title])),
        desc: isCoringa 
          ? 'Se o time acertar a palavra ganhará 30% da pontuação para vitória' 
          : isFratura 
          ? 'Caso o time não acerte a PALAVRA DA RODADA ou o tempo acabe, esta carta irá descontar 3 pontos ao time' 
          : isRiqueza
          ? 'Acerto garante o valor máximo do cronômetro.'
          : values[hIdx.desc],
        status: values[hIdx.status],
        points: parseInt(values[hIdx.points]) || 0,
        progression: isCoringa ? '30% de pontos' : (isFratura ? 'Penalidade alta' : (isRiqueza ? 'Recompensa máxima' : values[hIdx.prog])),
        usage: USAGE_MAPPING[id] || 'Livre',
        rarity: parseInt(values[hIdx.rarity]) || 1,
        icon: iconInfo.icon || values[hIdx.icon] || 'help-circle',
        type: iconInfo.type,
        volatile: id === 'gemeos' || id === 'riqueza',
      });
    }

    // 3. Save to Store
    store.setWords(wordData);
    store.setSpecialCardsData(specialCards);

    return {
      success: true,
      wordCount: Object.values(wordData).flat().length,
      specialCount: specialCards.length
    };
  } catch (error) {
    console.error('Erro na sincronização:', error);
    store.setSyncStatus('error');
    return { success: false, error };
  }
};
