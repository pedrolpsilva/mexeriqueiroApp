import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { LayoutChangeEvent, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { CustomModal } from '../components/CustomModal';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { LanguageModal } from '../components/LanguageModal';
import { useAppStore } from '../store/useAppStore';
import { COLORS } from '../constants/theme';



interface PlayerTagProps {
  name: string;
  index: number;
  team: 'A' | 'B';
  onRemove: () => void;
  onDragStart: (player: { team: 'A' | 'B'; index: number; name: string }) => void;
  onDragEnd: (x: number, y: number) => void;
  onLayout: (layout: { x: number; y: number; width: number; height: number }) => void;
}

export default function MatchSettings() {
  const router = useRouter();
  const { language, teamA: storedA, teamB: storedB, setTeams, setLeaderIndices, setLanguage } = useAppStore();

  const [teamA, setTeamA] = useState<string[]>([]);
  const [teamB, setTeamB] = useState<string[]>([]);
  const [newPlayerA, setNewPlayerA] = useState('');
  const [newPlayerB, setNewPlayerB] = useState('');

  // Load stored players on mount
  React.useEffect(() => {
    if (storedA.length > 0) setTeamA(storedA.map(p => p.name));
    if (storedB.length > 0) setTeamB(storedB.map(p => p.name));
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', description: '' });

  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Drag and Drop State
  const [draggingPlayer, setDraggingPlayer] = useState<{ team: 'A' | 'B'; index: number; name: string } | null>(null);
  const teamALayout = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const teamBLayout = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const playerLayouts = useRef<Record<string, { x: number; y: number; width: number; height: number }>>({});

  const onLayoutTeam = (team: 'A' | 'B') => (event: LayoutChangeEvent) => {
    event.target.measure((x, y, width, height, pageX, pageY) => {
      const layout = { x: pageX, y: pageY, width, height };
      if (team === 'A') teamALayout.current = layout;
      else teamBLayout.current = layout;
    });
  };

  const addPlayer = (team: 'A' | 'B') => {
    if (team === 'A' && newPlayerA.trim()) {
      setTeamA([...teamA, newPlayerA.trim()]);
      setNewPlayerA('');
    } else if (team === 'B' && newPlayerB.trim()) {
      setTeamB([...teamB, newPlayerB.trim()]);
      setNewPlayerB('');
    }
  };

  const removePlayer = (team: 'A' | 'B', index: number) => {
    if (team === 'A') {
      setTeamA(teamA.filter((_, i) => i !== index));
    } else {
      setTeamB(teamB.filter((_, i) => i !== index));
    }
  };

  const movePlayer = useCallback((fromTeam: 'A' | 'B', fromIndex: number, absoluteX: number, absoluteY: number) => {
    const player = fromTeam === 'A' ? teamA[fromIndex] : teamB[fromIndex];
    if (!player) return;

    let targetTeam: 'A' | 'B' | null = null;

    if (teamALayout.current &&
      absoluteX >= teamALayout.current.x &&
      absoluteX <= teamALayout.current.x + teamALayout.current.width &&
      absoluteY >= teamALayout.current.y &&
      absoluteY <= teamALayout.current.y + teamALayout.current.height) {
      targetTeam = 'A';
    } else if (teamBLayout.current &&
      absoluteX >= teamBLayout.current.x &&
      absoluteX <= teamBLayout.current.x + teamBLayout.current.width &&
      absoluteY >= teamBLayout.current.y &&
      absoluteY <= teamBLayout.current.y + teamBLayout.current.height) {
      targetTeam = 'B';
    }

    if (!targetTeam) {
      setDraggingPlayer(null);
      return;
    }

    // Find the closest index in the target team
    let targetIndex = -1;
    let minDistance = Infinity;

    const targetPlayers = targetTeam === 'A' ? teamA : teamB;
    targetPlayers.forEach((p, i) => {
      const layout = playerLayouts.current[`${targetTeam}-${p}-${i}`];
      if (layout) {
        const centerX = layout.x + layout.width / 2;
        const centerY = layout.y + layout.height / 2;
        const dist = Math.sqrt(Math.pow(absoluteX - centerX, 2) + Math.pow(absoluteY - centerY, 2));
        if (dist < minDistance) {
          minDistance = dist;
          targetIndex = i;
        }
      }
    });

    // If drop is closer to the end of the list than any item
    if (targetIndex === -1) targetIndex = targetPlayers.length;

    let newA = [...teamA];
    let newB = [...teamB];

    // Case 1: Reordering in same team
    if (fromTeam === targetTeam) {
      const list = fromTeam === 'A' ? newA : newB;
      list.splice(fromIndex, 1);
      list.splice(targetIndex, 0, player);
      if (fromTeam === 'A') newA = list; else newB = list;
    }
    // Case 2: Moving to other team
    else {
      if (fromTeam === 'A') newA.splice(fromIndex, 1);
      else newB.splice(fromIndex, 1);

      if (targetTeam === 'A') newA.splice(targetIndex, 0, player);
      else newB.splice(targetIndex, 0, player);
    }

    setTeamA(newA);
    setTeamB(newB);
    setDraggingPlayer(null);
  }, [teamA, teamB]);

  const handleNext = () => {
    if (teamA.length < 3 || teamB.length < 3) {
      setModalConfig({ title: 'Atenção', description: 'Cada time precisa ter no mínimo 3 jogadores!' });
      setModalVisible(true);
      return;
    }
    if (teamA.length !== teamB.length) {
      setModalConfig({ title: 'Atenção', description: 'Os times precisam ter a mesma quantidade de jogadores!' });
      setModalVisible(true);
      return;
    }

    // Persist players to store
    const playersA = teamA.map((name, index) => ({ id: `a-${index}-${Date.now()}`, name }));
    const playersB = teamB.map((name, index) => ({ id: `b-${index}-${Date.now()}`, name }));

    setTeams(playersA, playersB);
    setLeaderIndices(0, 0); // Reset pointers for the new match

    router.push('/match-rules');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header
          title="Configurar Times"
          onLanguagePress={() => setShowLanguageModal(true)}
        />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={styles.headerSection}>
            <Text style={styles.tooltipText}>
              <MaterialCommunityIcons name="information-outline" size={14} color={COLORS.dark} /> Segure e arraste jogadores para mudar de time ou reordenar.
            </Text>
          </View>

          {/* Team A Block */}
          <View style={styles.teamBlock} onLayout={onLayoutTeam('A')}>
            <Text style={styles.teamName}>Time A ({teamA.length})</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={newPlayerA}
                onChangeText={setNewPlayerA}
                onSubmitEditing={() => addPlayer('A')}
              />
              <TouchableOpacity style={styles.addButton} onPress={() => addPlayer('A')}>
                <FontAwesome5 name="plus" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.playerList}>
              {teamA.map((player, index) => (
                <PlayerTag
                  key={`A-${player}-${index}`}
                  name={player}
                  index={index}
                  team="A"
                  onRemove={() => removePlayer('A', index)}
                  onDragStart={setDraggingPlayer}
                  onDragEnd={(x: number, y: number) => movePlayer('A', index, x, y)}
                  onLayout={(layout: { x: number; y: number; width: number; height: number }) => {
                    playerLayouts.current[`A-${player}-${index}`] = layout;
                  }}
                />
              ))}
            </View>
          </View>

          {/* Team B Block */}
          <View style={styles.teamBlock} onLayout={onLayoutTeam('B')}>
            <Text style={styles.teamName}>Time B ({teamB.length})</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={newPlayerB}
                onChangeText={setNewPlayerB}
                onSubmitEditing={() => addPlayer('B')}
              />
              <TouchableOpacity style={styles.addButton} onPress={() => addPlayer('B')}>
                <FontAwesome5 name="plus" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.playerList}>
              {teamB.map((player, index) => (
                <PlayerTag
                  key={`B-${player}-${index}`}
                  name={player}
                  index={index}
                  team="B"
                  onRemove={() => removePlayer('B', index)}
                  onDragStart={setDraggingPlayer}
                  onDragEnd={(x: number, y: number) => movePlayer('B', index, x, y)}
                  onLayout={(layout: { x: number; y: number; width: number; height: number }) => {
                    playerLayouts.current[`B-${player}-${index}`] = layout;
                  }}
                />
              ))}
            </View>
          </View>

        </ScrollView>

        <Footer 
          buttonText="AVANÇAR" 
          onPress={handleNext}
          icon={<Ionicons name="arrow-forward" size={24} color="#fff" />}
        />

        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={modalConfig.title}
          description={modalConfig.description}
          icon={<Ionicons name="warning" size={32} color={COLORS.primary} />}
        />

        <LanguageModal
          visible={showLanguageModal}
          onClose={() => setShowLanguageModal(false)}
          currentLanguage={language}
          onSelect={setLanguage}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const PlayerTag = ({ name, index, team, onRemove, onDragStart, onDragEnd, onLayout }: PlayerTagProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const onLayoutInternal = (event: LayoutChangeEvent) => {
    event.target.measure((x, y, width, height, pageX, pageY) => {
      onLayout({ x: pageX, y: pageY, width, height });
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: isDragging.value ? 1.05 : 1 },
      ],
      zIndex: isDragging.value ? 1000 : 1,
      opacity: isDragging.value ? 0.9 : 1,
      backgroundColor: isDragging.value ? COLORS.background : '#fff',
    };
  });

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    translateX.value = event.nativeEvent.translationX;
    translateY.value = event.nativeEvent.translationY;
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.BEGAN) {
      isDragging.value = true;
      runOnJS(onDragStart)({ team, index, name });
    } else if (event.nativeEvent.state === State.END || event.nativeEvent.state === State.CANCELLED) {
      const absoluteX = event.nativeEvent.absoluteX;
      const absoluteY = event.nativeEvent.absoluteY;

      isDragging.value = false;
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);

      runOnJS(onDragEnd)(absoluteX, absoluteY);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      minPointers={1}
      activeOffsetX={[-10, 10]}
      activeOffsetY={[-10, 10]}
    >
      <Animated.View
        style={[styles.playerRow, animatedStyle]}
        onLayout={onLayoutInternal}
        entering={FadeIn}
        exiting={FadeOut}
        layout={Layout.springify().duration(300)}
      >
        <Text style={styles.playerName} numberOfLines={1}>{name}</Text>
        <TouchableOpacity onPress={onRemove} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <FontAwesome5 name="trash" size={14} color={COLORS.dark} />
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  headerSection: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  tooltipText: {
    fontSize: 13,
    color: COLORS.dark,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  teamBlock: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E0D8D0',
    borderBottomWidth: 4,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: COLORS.textDark,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  playerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLORS.support,
    borderRadius: 12,
    padding: 12,
    minHeight: 120,
    gap: 8,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  playerName: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: '600',
    marginRight: 6,
  },
});

