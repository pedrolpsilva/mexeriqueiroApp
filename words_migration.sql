-- Inserir Palavras Antigas
DO $$
DECLARE
  v_cat_id uuid;
BEGIN
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Abandono');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Acreditar');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Alegria');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Amizade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Angústia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ansiedade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Arte');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Atração');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Autoridade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Aventura');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Beleza');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bondade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Calma');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Calor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Caráter');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Carinho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Carisma');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Certeza');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Chance');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ciúme');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Clareza');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Compaixão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Confiança');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Consciência');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Coragem');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Criatividade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Crise');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cultura');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Curiosidade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Decisão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dedicação');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Defeito');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Depressão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Desafio');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Descanso');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Desconfiança');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Desespero');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Destino');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dignidade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Divindade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dúvida');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Emoção');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Energia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Enigma');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Equilíbrio');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Erro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Esperança');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Espírito');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Esquecer');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Estresse');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Fama');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Fantasia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Fé');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Frio');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Frustração');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Futuro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Glória');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Gratidão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Honra');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Horror');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Humildade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Humor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ideia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ignorância');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ilusão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Imaginação');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Impaciência');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Incerteza');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Indecisão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Influência');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ingratidão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Injustiça');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Inocência');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Inspiração');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Instinto');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Inteligência');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Inveja');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Justiça');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lembrança');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Liberdade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lógica');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Loucura');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Luxúria');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Luz');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Magia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Maldade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Medo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Memória');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mentira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Milagre');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Motivação');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Música');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Nervoso');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Nostalgia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Objetivo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Opinião');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Oração');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Orgulho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Paixão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Palavra');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Paz');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pecado');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Perdão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Perfeição');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Perigo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Persistência');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Poder');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Preconceito');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Preocupação');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Prevenção');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Prioridade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Privacidade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Problema');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Promessa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Proteção');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Qualidade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Razão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Reação');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Realidade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Reflexão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Respeito');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Responsabilidade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Revelação');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Risco');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Romance');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sabedoria');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sacrifício');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Saudade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Segredo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sensação');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sentido');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Símbolo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sofrimento');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sonho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sorte');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Surpresa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Talento');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Teoria');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Timidez');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tristeza');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Urgência');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Vaidade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Valor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Vazio');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Verdade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Vida');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Abstrato' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Vontade');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Abelha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Acrobata');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Advogado');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Águia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Alfaiate');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Alpinista');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Anahí');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Anta');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Aranha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Arara');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Árbitro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Arquiteto');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Astronauta');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Astrônomo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ator');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Atum');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Avestruz');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Balconista');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Baleia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Barata');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Beyoncé');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Biólogo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Boi');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bombeiro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Borboleta');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bulldog');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Burro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cabeleireiro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Camaleão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Camarão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Camelo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Canguru');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cantor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Capivara');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Caranguejo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Carateca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Carpinteiro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Castor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cavalo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Chimpanzé');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cientista');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cirurgião');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cisne');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cobra');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Coelho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Corretor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Coruja');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Costureiro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cozinheiro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Crocodilo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dalmata');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dançarino');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dentista');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Detetive');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'DJ');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Égua');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Elefante');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Eletricista');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Enfermeiro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Engenheiro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Escorpião');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Escritor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Esquilo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Falcão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Faustão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Fisioterapeuta');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Foca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Formiga');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Fotógrafo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Gafanhoto');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Galinha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Galo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Gambá');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Garçom');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Gato');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Girafa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Golfinho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Gorila');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Grilo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Guaxinim');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Hamster');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Hiena');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Hipopótamo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Jacaré');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Joaninha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Judoca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Juiz');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Jumento');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lagartixa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Leão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lobo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Locutor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Macaco');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Manicure');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Maquiador');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mecânico');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Médico');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Messi');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Minhoca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Modelo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mosca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Músico');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Neymar');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Nutricionista');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Onça');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ornitorrinco');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ovelha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Panda');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Papagaio');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pato');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pavão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pedreiro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Peru');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pincher');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pintor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pizzaiolo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Policial');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Polvo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pombo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pônei');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Porco');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Professor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Programador');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Psicólogo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ratazana');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Repórter');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Rihanna');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Rinoceronte');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sapo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Segurança');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Shakira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Soldado');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tamanduá');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tartaruga');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tatu');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tigre');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Touro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tubarão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tucano');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Urso');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Urubu');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Vaca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Veado');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Veterinário');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Xuxa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Zebra');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Vivo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Zoólogo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Abacate');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Abacaxi');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Abóbora');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Açaí');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Acarajé');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Achocolatado');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Água');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Alface');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Alfajor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Alho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Almôndegas');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ameixa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Amendoim');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Amora');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Arroz');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Aveia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Avelã');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Azeite');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bacon');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Banana');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Barbecue');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Batata');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Beijinho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Beringela');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Beterraba');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Biscoito');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bisteca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bolo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Brigadeiro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Brócolis');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Brownie');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Buchada');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Café');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Caipirinha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Caju');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Calzone');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Camarão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Canela');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Canjica');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Capuccino');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Caqui');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Caramelo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Caranguejo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Carne');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Casadinho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Castanha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Catupiry');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cebola');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cenoura');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cereja');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cerveja');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Chá');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Chimarrão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Chocolate');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Churros');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cocada');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Couve');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Crepe');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cupuaçu');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cuscuz');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Empada');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Empanado');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Energético');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ervilha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Escargot');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Escondidinho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Esfirra');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Espaguete');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Estrogonofe');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Farinha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Feijoada');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Frango');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Fricassê');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Galinhada');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Geleia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Goiaba');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Granola');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Guaraná');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Hambúrguer');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Iogurte');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Jabuticaba');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Jaca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Jujuba');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Kibe');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Kiwi');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Laranja');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lasanha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Leite');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Linguiça');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Macarrão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Maionese');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mamão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Manga');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Maracujá');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Marshmallow');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mel');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Melancia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mexerica');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Milho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Milkshake');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Miojo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Misto');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Morango');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mousse');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mussarela');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Omelete');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ovo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Palmito');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pamonha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Panetone');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Panqueca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pastel');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pavê');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pepino');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pessego');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Picolé');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pimentão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pinha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pipoca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pizza');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Presunto');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pudim');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Purê');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Queijo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Quibe');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Rabanada');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Rapadura');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Refrigerante');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Requeijão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Romã');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Salame');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Salpicão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Salsicha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sanduíche');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sardinha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Seriguela');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sopa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sorvete');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Suco');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sushi');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Taco');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tamarindo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tomate');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Torta');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Uva');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Vinho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Consumo' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Yakisoba');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Abajur');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Agulha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Algema');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Alicate');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ampulheta');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Anzol');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Apito');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Apontador');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Aspirador');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bandeira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Barbeador');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Batedeira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bateria');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bengala');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bíblia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bicicleta');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Boia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bolsa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Borracha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Botão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bracelete');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Brinco');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bumerangue');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bússola');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cadeado');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cadeira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Caderno');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Calculadora');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cama');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Caneca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Caneta');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Capacete');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Carteira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Celular');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Chave');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Chinelo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Colar');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Colchão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Colher');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Copo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Corda');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dado');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dentadura');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Desentupidor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Drone');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Escada');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Escova');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Esmalte');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Espada');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Espelho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Esponja');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Esteira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Etiqueta');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Faca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Fogão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Frigideira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Furadeira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Gaiola');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Garfo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Garrafa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Geladeira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Grampiador');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Granada');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Gravata');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Guitarra');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Impressora');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Interfone');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Interruptor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ioiô');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Isopor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Isqueiro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Janela');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lâmpada');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lança');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lanterna');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lapis');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Leque');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Liquidificador');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Livro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lixeira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Louça');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lupa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Luva');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Maiô');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mala');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mangueira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Martelo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Medalha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mesa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Microfone');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Microondas');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mochila');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Motor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Motoserra');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Oculos');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pá');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Paneira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Panela');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Papel');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Paraquedas');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Patins');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pente');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Perfume');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Piano');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Piercing');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pilha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pinça');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pincel');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Prancha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Prato');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Quadro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ralador');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ratoeira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Rede');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Régua');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Relógio');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Remédio');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Revolver');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Rímel');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Rodo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sacola');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Saia');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sapato');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Secador');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Seringa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sino');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sirene');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sofá');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tábua');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Taça');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tapete');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Telefone');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tenis');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tesoura');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tijolo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Toalha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Torneira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Travesseiro');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Troféu');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ukulele');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Vara');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Vassoura');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ventilador');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Vestido');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Violão');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Violino');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Volante');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Xícara');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Objeto' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Zíper');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Adedonha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Adoleta');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Akira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Aladdin');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Amarelinha');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Asteroids');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Avatar');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bambolê');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Basquete');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Batman');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Beisebol');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bingo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Boliche');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Boxe');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Bridgerton');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Canoagem');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Capoeira');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Castlevania');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Chaves');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Chiquititas');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Chuck');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ciclismo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cinema');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Coringa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Corrida');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Cosmos');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Crash');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dama');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dança');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dark');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Deadpool');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Demolidor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Detetive');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Diablo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Digimon');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Dominó');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Drácula');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Drax');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Elástico');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Elite');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Elsa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Enrolados');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Esgrima');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Esqui');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Estátua');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Euphoria');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Festa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'FIFA');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Forca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Fortnite');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Friends');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Frodo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Frozen');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Futebol');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Futurama');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Gladiator');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Godzilla');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Goku');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Golfe');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Grimm');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Gru');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Handebol');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Hipismo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Hulk');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Interestelar');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Judo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lego');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Logan');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Loki');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lost');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Lucifer');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Luffy');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Magneto');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Malabarismo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mangá');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mario');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'MasterChef');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Matrix');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Meditação');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mergulho');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mímica');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Minecraft');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Moana');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Mulan');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Narcos');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Naruto');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Natação');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Nemo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Novela');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Paintball');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pânico');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Parasita');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pescaria');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Peteca');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pinóquio');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pintura');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pipa');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pokémon');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Popeye');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Pôquer');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Queimada');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Rally');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Rapunzel');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Ratatouille');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Riverdale');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Rocky');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'RPG');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sense8');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Seven');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sherlock');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Shrek');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Sonic');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Stop');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Suits');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Superman');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Supernatural');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Surf');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tarzan');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tênis');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Terraria');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Tetris');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Thanos');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Thor');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Titanic');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Transformers');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Triatlo');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Twister');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Uncharted');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Valente');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Vikings');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Vingadores');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Voldemort');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Voleibol');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'WandaVision');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Wolverine');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Xadrez');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Yoda');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Yoga');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Zelda');
  END IF;
  SELECT id INTO v_cat_id FROM public.categories WHERE name = 'Lazer' LIMIT 1;
  IF v_cat_id IS NOT NULL THEN
    INSERT INTO public.words (category_id, word) VALUES (v_cat_id, 'Zootopia');
  END IF;
END $$;
