const THEMES = [
  { id: 'Abstrato', label: 'Abstrato', key: 'A' },
  { id: 'Vivo', label: 'Vivo', key: 'V' },
  { id: 'Consumo', label: 'Consumo', key: 'C' },
  { id: 'Objeto', label: 'Objeto', key: 'O' },
  { id: 'Lazer', label: 'Lazer', key: 'L' },
  { id: 'Especial', label: 'Especial', key: 'S' },
];

const COMMON_THEMES = THEMES.filter(t => t.key !== 'S');

const iterations = 10_000_000;

console.time('Baseline (filter)');
for (let i = 0; i < iterations; i++) {
  const commonThemes = THEMES.filter(t => t.key !== 'S');
  const finalTheme = commonThemes[Math.floor(Math.random() * commonThemes.length)];
}
console.timeEnd('Baseline (filter)');

console.time('Optimized (pre-filtered)');
for (let i = 0; i < iterations; i++) {
  const finalTheme = COMMON_THEMES[Math.floor(Math.random() * COMMON_THEMES.length)];
}
console.timeEnd('Optimized (pre-filtered)');
