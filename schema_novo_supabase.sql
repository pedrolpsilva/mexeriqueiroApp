-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE
);

-- Words
CREATE TABLE IF NOT EXISTS public.words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  word text NOT NULL
);

-- Special Cards
CREATE TABLE IF NOT EXISTS public.special_cards (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  points integer NOT NULL DEFAULT 10,
  progression text,
  usage text,
  rarity integer,
  icon text,
  icon_type text,
  volatile boolean DEFAULT false
);

-- RLS (Optional mas recomendado)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.special_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.words FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.special_cards FOR SELECT USING (true);

-- Inserir Dados Padrão de Categorias
INSERT INTO public.categories (name) VALUES 
('Abstrato'),
('Vivo'),
('Consumo'),
('Objeto'),
('Lazer')
ON CONFLICT (name) DO NOTHING;

-- Inserir Dados Padrão de Cartas Especiais
INSERT INTO public.special_cards (id, status, points, rarity, title, description, progression, usage, icon, icon_type, volatile) VALUES
('coringa', 'active', 10, 1, 'Coringa', 'Se o time acertar a palavra ganhará 30% da pontuação para vitória', '30% de pontos', 'Livre', 'cards-playing-outline', 'MaterialCommunityIcons', false),
('gemeos', 'active', 10, 1, 'Gêmeo do Mau', 'O time rival ganha os mesmos pontos que você nesta rodada.', 'Risco compartilhado', 'Instantâneo', 'user-friends', 'FontAwesome5', true),
('bomb', 'active', 10, 1, 'Autodestruição', 'O time perde a rodada instantaneamente, passando a vez ao rival sem a possibilidade de roubo de palavra.', 'Derrota imediata', 'Instantâneo', 'bomb', 'MaterialCommunityIcons', false),
('fratura', 'active', 10, 1, 'Fratura', 'Caso o time não acerte a PALAVRA DA RODADA ou o tempo acabe, esta carta irá descontar 3 pontos ao time', 'Penalidade alta', 'Instantâneo', 'bone', 'MaterialCommunityIcons', false),
('riqueza', 'active', 10, 1, 'Riqueza', 'Acerto garante o valor máximo do cronômetro.', 'Recompensa máxima', 'Livre', 'coins', 'FontAwesome5', true),
('dose', 'active', 10, 1, 'Dose Dupla', 'Garante uma rodada extra.', 'Mais tempo', 'Instantâneo', 'cards-playing', 'MaterialCommunityIcons', false),
('oportuno', 'active', 10, 1, 'Oportuno', 'Dá uma dica extra ao time.', 'Ajuda extra', 'Livre', 'lightbulb-on', 'MaterialCommunityIcons', false)
ON CONFLICT (id) DO NOTHING;
