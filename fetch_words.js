const fs = require('fs');

const url = 'https://untgdlcuyotohvlzqzni.supabase.co/rest/v1/words?select=word,categories(name)';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudGdkbGN1eW90b2h2bHpxem5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NTAxMDgsImV4cCI6MjEwMTQyNjEwOH0.VJyFIwmrL8U7rk68f9YhLjpyslvY111FiiOfDP9cftI';

fetch(url, {
  method: 'GET',
  headers: {
    'apikey': anonKey,
    'Authorization': `Bearer ${anonKey}`,
    'Content-Type': 'application/json'
  }
})
.then(res => {
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json();
})
.then(data => {
  if (!data || data.length === 0) {
    console.log('Nenhuma palavra encontrada no banco antigo.');
    return;
  }

  let sql = '-- Inserir Palavras Antigas\n';
  sql += 'DO $$\n';
  sql += 'DECLARE\n';
  sql += '  v_cat_id uuid;\n';
  sql += 'BEGIN\n';

  data.forEach(item => {
    const word = item.word.replace(/'/g, "''"); // escape single quotes
    const categoryName = item.categories.name;

    sql += `  SELECT id INTO v_cat_id FROM public.categories WHERE name = '${categoryName}' LIMIT 1;\n`;
    sql += `  IF v_cat_id IS NOT NULL THEN\n`;
    sql += `    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, '${word}');\n`;
    sql += `  END IF;\n`;
  });

  sql += 'END $$;\n';

  fs.writeFileSync('words_migration.sql', sql, 'utf8');
  console.log('words_migration.sql gerado com sucesso com ' + data.length + ' palavras.');
})
.catch(err => {
  console.error('Erro ao buscar as palavras:', err);
});
