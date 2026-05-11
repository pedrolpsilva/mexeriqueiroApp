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

const ICON_MAPPING: Record<string, { icon: string, type: string }> = {
  coringa: { icon: 'cards-playing-outline', type: 'MaterialCommunityIcons' },
  gemeos: { icon: 'user-friends', type: 'FontAwesome5' },
  bomb: { icon: 'bomb', type: 'MaterialCommunityIcons' },
  fratura: { icon: 'bone', type: 'MaterialCommunityIcons' },
  riqueza: { icon: 'coins', type: 'FontAwesome5' },
  dose: { icon: 'cards-playing', type: 'MaterialCommunityIcons' },
  oportuno: { icon: 'lightbulb-on', type: 'MaterialCommunityIcons' },
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
    const specialRes = await fetch(SPECIAL_SHEET_URL);
    if (!specialRes.ok) throw new Error('Falha ao baixar deck especial');
    const specialCsv = await specialRes.text();
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

      const id = values[hIdx.id]?.toLowerCase() || '';
      const iconInfo = ICON_MAPPING[id] || { icon: 'help-circle', type: 'Ionicons' };

      specialCards.push({
        id,
        title: values[hIdx.title],
        desc: values[hIdx.desc],
        status: values[hIdx.status],
        points: parseInt(values[hIdx.points]),
        progression: values[hIdx.prog],
        usage: values[hIdx.usage],
        rarity: parseInt(values[hIdx.rarity]),
        icon: values[hIdx.icon],
        type: iconInfo.type,
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
