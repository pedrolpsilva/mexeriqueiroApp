import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Crypto from 'expo-crypto';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { CustomModal } from '../components/CustomModal';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Inventory } from '../components/Inventory';
import { LanguageModal } from '../components/LanguageModal';
import { SpecialCardModal } from '../components/SpecialCardModal';
import { COLORS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const secureRandom = () => {
  const array = new Uint32Array(1);
  Crypto.getRandomValues(array);
  return array[0] / 4294967296; // 2^32
};

const THEMES = [
  { id: 'Abstrato', label: 'Abstrato', key: 'A' },
  { id: 'Vivo', label: 'Vivo', key: 'V' },
  { id: 'Consumo', label: 'Consumo', key: 'C' },
  { id: 'Objeto', label: 'Objeto', key: 'O' },
  { id: 'Lazer', label: 'Lazer', key: 'L' },
  { id: 'Especial', label: 'Especial', key: 'S' },
];
const COMMON_THEMES = THEMES.filter(t => t.key !== 'S');

export default function GameScreen() {
  const router = useRouter();
  const {
    language, teamA, teamB, words, timer: defaultTimer, scoreToWin,
    canPause, stealTurn, specialCardsEnabled, selectedCards, specialCardsData,
    leaderIndexA, leaderIndexB, setLeaderIndices,
    currentRoundState, setRoundState, resetRoundState, setLanguage,
    matchStats, updateMatchStats
  } = useAppStore();

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const {
    specialCard, word, theme, isWordVisible,
    timerValue, isTimerRunning, roundStarted, isStealing,
    inventoryA = [], inventoryB = [], activeCard, onboardingShown
  } = currentRoundState;

  const { addToInventory, removeFromInventory } = useAppStore();

  // Local UI states (modals that don't need persistence as much)
  const [showExitModal, setShowExitModal] = useState(false);
  const [showWordModal, setShowWordModal] = useState(false);
  const [showSpecialModal, setShowSpecialModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showStealModal, setShowStealModal] = useState(false);
  const [showStealSuccessModal, setShowStealSuccessModal] = useState(false);
  const [stealSuccessPoints, setStealSuccessPoints] = useState('0');
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [showFullInventoryModal, setShowFullInventoryModal] = useState(false);
  const [pendingCard, setPendingCard] = useState<any>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [diceResult, setDiceResult] = useState('?');
  const [showTooltip, setShowTooltip] = useState(false);

  // Filter themes based on settings
  const availableThemes = specialCardsEnabled
    ? THEMES
    : COMMON_THEMES;

  // Filter special cards based on selection and dynamic data
  const baseCardsData = specialCardsData;
  const availableSpecialCards = baseCardsData.filter(card => selectedCards[card.id as keyof typeof selectedCards]);

  // Scores and round
  const [scoreA, setScoreA] = useState(0.0);
  const [scoreB, setScoreB] = useState(0.0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isTeamATurn, setIsTeamATurn] = useState(true);

  // Animation values
  const diceScale = useSharedValue(1);
  const shakeOffset = useSharedValue(0);

  // Timer Animation Logic
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const progressShared = useSharedValue(0);

  useEffect(() => {
    // Calculate elapsed time percentage: (defaultTimer - timerValue) / defaultTimer
    const progress = (defaultTimer - timerValue) / defaultTimer;
    progressShared.value = withTiming(progress, { duration: 500 });
  }, [timerValue, defaultTimer]);

  const animatedProps = useAnimatedProps(() => {
    const strokeColor = interpolateColor(
      progressShared.value,
      [0, 0.5, 0.51, 0.85, 0.86, 1],
      ['#2ecc71', '#2ecc71', '#f1c40f', '#f1c40f', '#e74c3c', '#e74c3c']
    );

    return {
      strokeDashoffset: circumference * (1 - progressShared.value),
      stroke: strokeColor,
    };
  });

  const timerShakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: shakeOffset.value },
        { translateY: shakeOffset.value * 0.5 }
      ],
    };
  });

  useEffect(() => {
    const progress = (defaultTimer - timerValue) / defaultTimer;
    if (progress >= 0.86 && isTimerRunning) {
      if (shakeOffset.value === 0) {
        shakeOffset.value = withRepeat(
          withSequence(
            withTiming(-2, { duration: 40 }),
            withTiming(2, { duration: 40 })
          ),
          -1,
          true
        );
      }
    } else {
      shakeOffset.value = withTiming(0);
    }
  }, [timerValue, isTimerRunning, defaultTimer]);

  const diceAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: diceScale.value }
      ],
    };
  });

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerValue > 0) {
      interval = setInterval(() => {
        setRoundState({ timerValue: timerValue - 1 });
      }, 1000);
    } else if (timerValue === 0 && isTimerRunning) {
      setRoundState({ isTimerRunning: false });
      setShowTimeUpModal(true);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerValue, isStealing]);

  const rollDice = () => {
    if (isRolling || roundStarted) return;

    setIsRolling(true);
    diceScale.value = withSequence(
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    // Visual shuffle shows all faces equally
    const shuffleThemes = availableThemes;
    let interval = setInterval(() => {
      const tempRes = shuffleThemes[Math.floor(secureRandom() * shuffleThemes.length)].key;
      setDiceResult(tempRes);
    }, 80);

    setTimeout(() => {
      clearInterval(interval);

      const rand = secureRandom() * 100;
      let finalTheme;

      if (specialCard || !specialCardsEnabled) {
        // Forced common theme if special card already active or special cards disabled
        const commonThemes = THEMES.filter(t => t.key !== 'S');
        finalTheme = commonThemes[Math.floor(secureRandom() * commonThemes.length)];
      } else {
        // Weighted logic: 18% each common (90% total), 10% Special
        // if (rand < 18) finalTheme = THEMES[0];      // Abstrato
        // else if (rand < 36) finalTheme = THEMES[1]; // Vivo
        // else if (rand < 54) finalTheme = THEMES[2]; // Consumo
        // else if (rand < 72) finalTheme = THEMES[3]; // Objeto
        // else if (rand < 90) finalTheme = THEMES[4]; // Lazer
        // else finalTheme = THEMES[5];                // Especial
        finalTheme = THEMES[5];                // Especial
      }

      setDiceResult(finalTheme.key);
      setIsRolling(false);

      // Pulsation animation (1 second total)
      diceScale.value = withSequence(
        withTiming(1.3, { duration: 300 }),
        withTiming(0.9, { duration: 300 }),
        withTiming(1.2, { duration: 200 }),
        withTiming(1, { duration: 200 })
      );

      // Wait for pulse to finish before showing modal
      setTimeout(() => {
        if (finalTheme.key === 'S') {
          const randomSpecial = availableSpecialCards.length > 0
            ? availableSpecialCards[Math.floor(secureRandom() * availableSpecialCards.length)]
            : null;

          if (randomSpecial) {
            // Track special card usage
            if (!matchStats.specialCardsUsed.includes(randomSpecial.id)) {
              updateMatchStats({
                specialCardsUsed: [...matchStats.specialCardsUsed, randomSpecial.id]
              });
            }
            if (randomSpecial.usage === 'Instantâneo') {
              setRoundState({ activeCard: randomSpecial, specialCard: randomSpecial });
              setShowSpecialModal(true);
            } else {
              // Storable card
              const currentInv = isTeamATurn ? inventoryA : inventoryB;
              if (currentInv.length < 2) {
                addToInventory(isTeamATurn ? 'A' : 'B', randomSpecial);
                setRoundState({ specialCard: randomSpecial });
                setShowSpecialModal(true);

                if (!onboardingShown) {
                  setShowTooltip(true);
                  setRoundState({ onboardingShown: true });
                  setTimeout(() => setShowTooltip(false), 2000);
                }
              } else {
                setPendingCard(randomSpecial);
                setShowFullInventoryModal(true);
              }
            }
            setDiceResult('?');
          }
        } else {
          // words is a Record<string, string[]> from store
          const themeWords = words[finalTheme.label] || [];
          const randomWord = themeWords.length > 0
            ? themeWords[Math.floor(secureRandom() * themeWords.length)]
            : 'Palavra não encontrada';

          setRoundState({
            theme: finalTheme,
            word: randomWord,
            timerValue: defaultTimer
          });
          setShowWordModal(true);
        }
      }, 1000);
    }, 1500);
  };

  const startRound = () => {
    setShowWordModal(false);
    setRoundState({ roundStarted: true });
  };

  const togglePause = () => {
    setRoundState({ isTimerRunning: !isTimerRunning });
  };

  const handleScore = () => {
    const points = timerValue >= 10 ? timerValue / 10 : 0.5;

    if (isTeamATurn) {
      setScoreA(prev => prev + points);
    } else {
      setScoreB(prev => prev + points);
    }

    // Track leader points and theme hits
    const leaderName = isTeamATurn ? teamA[leaderIndexA]?.name : teamB[leaderIndexB]?.name;
    const themeLabel = theme?.label || 'Desconhecido';

    const newLeaderPoints = { ...matchStats.leaderPoints };
    newLeaderPoints[leaderName] = (newLeaderPoints[leaderName] || 0) + points;

    const newThemeStats = { ...matchStats.themeStats };
    if (!newThemeStats[themeLabel]) newThemeStats[themeLabel] = { hits: 0, misses: 0 };
    newThemeStats[themeLabel].hits += 1;

    updateMatchStats({
      leaderPoints: newLeaderPoints,
      themeStats: newThemeStats
    });

    if (isStealing) {
      setStealSuccessPoints(formatScore(points));
      setShowStealSuccessModal(true);
      finishRound(); // Steal finishes, no rotation (it rotates after their normal round)
    } else {
      rotateLeader(isTeamATurn);
      finishRound(true);
    }
  };

  const handleCancel = () => {
    setRoundState({ isTimerRunning: false });
    setShowCancelModal(true);
  };

  const rotateLeader = (teamAActive: boolean) => {
    if (teamAActive) {
      const nextIdx = (leaderIndexA + 1) % (teamA.length || 1);
      setLeaderIndices(nextIdx, leaderIndexB);
    } else {
      const nextIdx = (leaderIndexB + 1) % (teamB.length || 1);
      setLeaderIndices(leaderIndexA, nextIdx);
    }
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    const wasNormalRound = !isStealing;

    if (wasNormalRound) {
      handleTransferCards(isTeamATurn ? 'A' : 'B');
      rotateLeader(isTeamATurn);

      // Track theme miss for the team who cancelled
      const themeLabel = theme?.label || 'Desconhecido';
      const newThemeStats = { ...matchStats.themeStats };
      if (!newThemeStats[themeLabel]) newThemeStats[themeLabel] = { hits: 0, misses: 0 };
      newThemeStats[themeLabel].misses += 1;
      updateMatchStats({ themeStats: newThemeStats });
    }

    if (stealTurn && timerValue > 0 && wasNormalRound) {
      setShowStealModal(true);
    } else {
      // If it was a steal, we finish it without rotating (as per previous rule)
      // If it was normal and no steal allowed, we finish it (rotation already happened above)
      finishRound(true); // Pass a flag to indicate rotation already happened or is not needed
    }
  };

  const handleStealAccept = () => {
    setShowStealModal(false);

    // Switch turn to rival for the steal attempt
    // In a steal, the team who was NOT playing takes over.
    // Rule: "Próximo Líder: No caso de um evento de Roubar a Vez, o app deve atualizar instantaneamente a interface para mostrar o nome do líder do time rival"
    // Since the rival hasn't played yet this turn, we use their current leader index.
    setIsTeamATurn(!isTeamATurn);

    setRoundState({ isStealing: true, isTimerRunning: true });
  };

  const handleStealDecline = () => {
    setShowStealModal(false);
    finishRound(); // Original team finishes turn, turn passes to rival
  };

  const handleTimeUpClose = () => {
    setShowTimeUpModal(false);

    if (!isStealing) {
      // Track theme miss for the team who ran out of time
      const themeLabel = theme?.label || 'Desconhecido';
      const newThemeStats = { ...matchStats.themeStats };
      if (!newThemeStats[themeLabel]) newThemeStats[themeLabel] = { hits: 0, misses: 0 };
      newThemeStats[themeLabel].misses += 1;
      updateMatchStats({ themeStats: newThemeStats });
    }

    if (isStealing) {
      // Steal finished, it's now their normal turn
      finishRound(true);
    } else {
      // Normal turn finished, rotate leader and pass turn
      handleTransferCards(isTeamATurn ? 'A' : 'B');
      rotateLeader(isTeamATurn);
      finishRound(true);
    }
  };

  const finishRound = (alreadyRotated = false) => {
    const wasStealing = isStealing;
    const currentTurnWasA = isTeamATurn;

    setRoundState({ isTimerRunning: false });
    resetRoundState();
    setDiceResult('?');

    // Rotate leader ONLY if it was a normal round and we haven't rotated yet.
    if (!wasStealing && !alreadyRotated) {
      rotateLeader(currentTurnWasA);
    }

    if (wasStealing) {
      // If it was a steal, the current team (stealer) stays as current turn
      // to start their own normal round. No turn switch here.
      setRoundState({ roundStarted: false });
    } else {
      // Normal turn switch
      const nextIsTeamA = !currentTurnWasA;
      setIsTeamATurn(nextIsTeamA);

      if (nextIsTeamA) {
        setCurrentRound(prev => prev + 1);
      }

      // Check for Volatile cards and transfer if round lost
      // If team lost (didn't score) and had volatile cards, pass to rival
      // In finishRound, we can check if points were awarded.
      // But finishRound is called in both success and fail.
      // Let's handle transfer in confirmCancel and handleTimeUpClose instead.

      // Victory Check
      if (scoreA >= scoreToWin || scoreB >= scoreToWin) {
        updateMatchStats({
          totalRounds: currentRound,
          finalScoreA: scoreA,
          finalScoreB: scoreB
        });
        router.replace('/victory');
      }
    }
  };

  const handleTransferCards = (fromTeam: 'A' | 'B') => {
    const fromInv = fromTeam === 'A' ? inventoryA : inventoryB;
    const toTeam = fromTeam === 'A' ? 'B' : 'A';
    const toInv = toTeam === 'A' ? inventoryA : inventoryB;

    fromInv.forEach(card => {
      if (card.volatile && toInv.length < 2) {
        addToInventory(toTeam, card);
        removeFromInventory(fromTeam, card.id);
        // Alert or animation could be here
      }
    });
  };

  const handleCardUse = (card: any) => {
    setRoundState({ activeCard: card });
    removeFromInventory(isTeamATurn ? 'A' : 'B', card.id);
    setShowSpecialModal(false);
  };

  const replaceCard = (oldCardId: string) => {
    removeFromInventory(isTeamATurn ? 'A' : 'B', oldCardId);
    addToInventory(isTeamATurn ? 'A' : 'B', pendingCard);
    setShowFullInventoryModal(false);
    setPendingCard(null);
  };

  const getLanguageFlag = () => {
    if (language === 'BR') return '🇧🇷';
    if (language === 'US') return '🇺🇸';
    return '🇪🇸';
  };

  const formatScore = (score: number) => {
    return score.toFixed(1).replace('.', ',');
  };

  const handleExit = () => {
    setShowExitModal(false);
    resetRoundState();
    router.replace('/');
  };

  const currentLeaderName = isTeamATurn
    ? teamA[leaderIndexA]?.name
    : teamB[leaderIndexB]?.name;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={`Vez de: ${currentLeaderName}`}
        onBackPress={() => setShowExitModal(true)}
        // onLanguagePress={() => setShowLanguageModal(true)}
        rightElement={
          <TouchableOpacity
            style={styles.endButton}
            onPress={() => setShowExitModal(true)}
          >
            <Text style={styles.endButtonText}>SAIR</Text>
          </TouchableOpacity>
        }
      />

      {/* Scoreboard Section */}
      <View style={styles.scoreboardContainer}>
        <View style={styles.roundIndicator}>
          <Text style={styles.roundText}>Rodada: {currentRound}</Text>
        </View>

        <View style={styles.scoreColumns}>
          <View style={styles.teamColumn}>
            <View style={[styles.scoreBox, isTeamATurn && styles.activeScoreBox]}>
              <Text style={styles.teamLabel}>TIME A</Text>
              <View style={styles.pointsDisplay}>
                <Text style={styles.pointsValue}>{formatScore(scoreA)}</Text>
                <Text style={styles.pointsUnit}>pts</Text>
              </View>
            </View>
            {isTeamATurn && (
              <View style={styles.leaderBadge}>
                <FontAwesome5 name="user-tie" size={12} color={COLORS.primary} />
                <Text style={styles.leaderBadgeText}>{teamA[leaderIndexA]?.name}</Text>
              </View>
            )}
          </View>

          <View style={styles.vsWrapper}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          <View style={styles.teamColumn}>
            <View style={[styles.scoreBox, !isTeamATurn && styles.activeScoreBox]}>
              <Text style={styles.teamLabel}>TIME B</Text>
              <View style={styles.pointsDisplay}>
                <Text style={styles.pointsValue}>{formatScore(scoreB)}</Text>
                <Text style={styles.pointsUnit}>pts</Text>
              </View>
            </View>
            {!isTeamATurn && (
              <View style={styles.leaderBadge}>
                <FontAwesome5 name="user-tie" size={12} color={COLORS.primary} />
                <Text style={styles.leaderBadgeText}>{teamB[leaderIndexB]?.name}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Game Content Area */}
      <View style={styles.gameContent}>
        {/* Dice Section */}
        {!roundStarted && (
          <View style={styles.diceSection}>
            {specialCard && !isRolling && (
              <View style={styles.actionGridColumn}>
                <View style={styles.actionGridRow}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: COLORS.dark }]}
                    onPress={() => setShowSpecialModal(true)}
                  >
                    <MaterialCommunityIcons name="cards-playing" size={24} color="#FFF" />
                    <Text style={styles.actionButtonText}>VER ESPECIAL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity
              style={[styles.diceButton, isRolling && styles.diceButtonDisabled]}
              onPress={rollDice}
              disabled={isRolling}
            >
              <Animated.View style={[styles.diceSquare, diceAnimatedStyle]}>
                <Text style={styles.diceResultText}>{diceResult}</Text>
              </Animated.View>
              <Text style={styles.diceButtonText}>
                {isRolling ? 'SORTEANDO...' : specialCard ? 'ROLE NOVAMENTE' : 'ROLAR DADO'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Round Active UI */}
        {roundStarted && (
          <View style={[styles.roundActiveArea, isStealing && styles.stealActiveArea]}>
            {isStealing && (
              <View style={styles.stealBadge}>
                <MaterialCommunityIcons name="alert-decagram" size={16} color="#FFF" />
                <Text style={styles.stealBadgeText}>ROUBO DE PALAVRA ATIVO!</Text>
              </View>
            )}

            {activeCard?.volatile && (
              <View style={[styles.stealBadge, { backgroundColor: COLORS.danger, borderColor: COLORS.dark }]}>
                <MaterialCommunityIcons name="alert-circle" size={16} color="#FFF" />
                <Text style={styles.stealBadgeText}>RISCO: CARTA VOLÁTIL EM USO!</Text>
              </View>
            )}

            <View style={styles.actionGridColumn}>
              <View style={styles.activeThemeBadge}>
                <Text style={styles.activeThemeValue}>
                  {activeCard ? `ESPECIAL: ${activeCard.title.toUpperCase()}` : theme?.label.toUpperCase()}
                </Text>
              </View>

              <View style={styles.actionGridRow}>
                {/* Word Button - Press & Hold */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.actionButton}
                  onPressIn={() => setRoundState({ isWordVisible: true })}
                  onPressOut={() => setRoundState({ isWordVisible: false })}
                >
                  <MaterialCommunityIcons name="eye" size={24} color="#FFF" />
                  <Text style={styles.actionButtonText}>VER PALAVRA</Text>
                  <Text style={styles.holdHint}>(Segure)</Text>
                </TouchableOpacity>

                {/* Special Card Button (If active) */}
                {specialCard && (
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: COLORS.dark }]}
                    onPress={() => setShowSpecialModal(true)}
                  >
                    <MaterialCommunityIcons name="cards-playing" size={24} color="#FFF" />
                    <Text style={styles.actionButtonText}>VER ESPECIAL</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <Animated.View style={[styles.timerCircle, timerShakeStyle]}>
              <Svg width={160} height={160} style={styles.svgAbsolute}>
                {/* Background Circle */}
                <Circle
                  cx={80}
                  cy={80}
                  r={radius}
                  stroke="#F0EBE5"
                  strokeWidth={10}
                  fill="none"
                />
                {/* Progress Circle */}
                <AnimatedCircle
                  cx={80}
                  cy={80}
                  r={radius}
                  strokeWidth={10}
                  fill="none"
                  strokeDasharray={circumference}
                  animatedProps={animatedProps}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                />
              </Svg>
              <Text style={styles.timerNumber}>{timerValue}</Text>
              <Text style={styles.timerSec}>segundos</Text>
            </Animated.View>
          </View>
        )}

        {/* Inventory Section */}
        <View style={styles.inventoryWrapper}>
          {showTooltip && (
            <View style={styles.tooltip}>
              <MaterialCommunityIcons name="gift-outline" size={14} color="#FFF" />
              <Text style={styles.tooltipText}>
                Ganhaste uma Carta Especial! Pode guardá-la ou usá-la para virar o jogo.
              </Text>
            </View>
          )}
          <Inventory
            team={isTeamATurn ? 'A' : 'B'}
            cards={isTeamATurn ? inventoryA : inventoryB}
            activeCard={activeCard}
            isCurrentTurn={!isRolling && roundStarted}
            hasVolatileCard={(isTeamATurn ? inventoryA : inventoryB).some(c => c.volatile)}
            onCardPress={(card) => {
              setRoundState({ specialCard: card });
              setShowSpecialModal(true);
            }}
          />
        </View>

        {/* Footer Controls (Fixed Bottom) */}
        {!showWordModal && !!word && (
          <Footer>
            <View style={styles.timerControls}>
              {!isTimerRunning && timerValue > 0 && (
                <TouchableOpacity
                  style={[styles.startRoundButton, timerValue < defaultTimer && { backgroundColor: '#FF9800', borderColor: '#E65100' }]}
                  onPress={() => setRoundState({ isTimerRunning: true })}
                >
                  <Ionicons name={timerValue < defaultTimer ? "play-forward" : "play"} size={24} color="#FFF" />
                  <Text style={styles.startRoundButtonText}>
                    {timerValue < defaultTimer ? 'RETOMAR TEMPO' : 'INICIAR TEMPO'}
                  </Text>
                </TouchableOpacity>
              )}

              {isTimerRunning && (
                <View style={styles.runningControls}>
                  <TouchableOpacity
                    style={styles.winButton}
                    onPress={handleScore}
                  >
                    <MaterialCommunityIcons name="check-bold" size={28} color="#FFF" />
                    <Text style={styles.winButtonText}>ACERTOU!</Text>
                  </TouchableOpacity>

                  <View style={styles.secondaryControls}>
                    {canPause && (
                      <TouchableOpacity
                        style={styles.pauseButton}
                        onPress={togglePause}
                      >
                        <Ionicons name="pause" size={20} color="#FFF" />
                        <Text style={styles.secondaryButtonText}>PAUSAR</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleCancel}
                    >
                      <Ionicons name="close-circle" size={20} color="#FFF" />
                      <Text style={styles.secondaryButtonText}>CANCELAR</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {!isTimerRunning && timerValue === 0 && (
                <TouchableOpacity
                  style={[styles.winButton, { backgroundColor: '#666', borderColor: '#444' }]}
                  onPress={finishRound}
                >
                  <Text style={styles.winButtonText}>PRÓXIMA RODADA</Text>
                </TouchableOpacity>
              )}
            </View>
          </Footer>
        )}
      </View>

      {/* Common Round Card Modal (Initial View) */}
      <CustomModal
        visible={showWordModal}
        onClose={startRound}
        title={specialCard && "ESPECIAL" || ''}
        buttonText="ESTOU PRONTO"
        icon={<MaterialCommunityIcons name="comment-text-multiple-outline" size={40} color={COLORS.dark} />}
      >
        <View style={styles.wordCard}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={styles.themeLabelSmall}>Tema:</Text>
            <Text style={styles.themeLabel}>{theme?.label}</Text>
          </View>
          <Text style={styles.wordText}>{word}</Text>

          <View style={styles.cardFooter}>
            <Ionicons name="warning-outline" size={14} color={COLORS.dark} />
            <Text style={styles.instructionText}>
              Não fale a Palavra da Rodada nem palavras com o mesmo radical; use apenas palavras relacionadas.
            </Text>
          </View>
        </View>
      </CustomModal>

      {/* Persistent Word View Overlay (When holding button during round) */}
      {isWordVisible && word && (
        <View style={styles.wordOverlay}>
          <View style={styles.wordCard}>
            <MaterialCommunityIcons name="message-text" size={24} color={COLORS.primary} style={styles.cardCornerIcon} />

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={styles.themeLabelSmall}>Tema:</Text>
              <Text style={styles.themeLabel}>{theme?.label}</Text>
            </View>
            <Text style={styles.wordText}>{word}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.instructionText}>Solte o botão para ocultar</Text>
            </View>
          </View>
        </View>
      )}

      <SpecialCardModal
        visible={showSpecialModal}
        onClose={() => {
          setShowSpecialModal(false);
          if (!roundStarted) setRoundState({ specialCard: null });
        }}
        specialCard={specialCard}
        onConfirm={(!roundStarted && specialCard?.usage !== 'Instantâneo') ? () => handleCardUse(specialCard) : undefined}
        confirmText="USAR NESTA RODADA"
      />

      {/* Inventory Full Modal */}
      <CustomModal
        visible={showFullInventoryModal}
        onClose={() => setShowFullInventoryModal(false)}
        title="INVENTÁRIO CHEIO!"
        description={`Escolha uma carta para substituir pela nova: ${pendingCard?.title}`}
        buttonText="DESCARTAR NOVA"
      >
        <View style={styles.fullInvOptions}>
          {(isTeamATurn ? (inventoryA || []) : (inventoryB || [])).map(card => (
            <TouchableOpacity
              key={card.id}
              style={styles.replaceCardButton}
              onPress={() => replaceCard(card.id)}
            >
              <MaterialCommunityIcons name={card.icon as any} size={24} color="#FFF" />
              <Text style={styles.replaceCardText}>Substituir {card.title}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.replaceCardButton, { backgroundColor: COLORS.dark }]}
            onPress={() => handleCardUse(pendingCard)}
          >
            <MaterialCommunityIcons name="play-circle" size={24} color="#FFF" />
            <Text style={styles.replaceCardText}>Usar Imediatamente</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>

      {/* Steal Word Confirmation Modal */}
      <CustomModal
        visible={showStealModal}
        onClose={handleStealDecline}
        title={`Time ${!isTeamATurn ? 'A' : 'B'} Deseja Roubar a Palavra?`}
        description={`O time ${isTeamATurn ? 'A' : 'B'} desistiu!
        O Time ${!isTeamATurn ? 'A' : 'B'} tem ${timerValue}s para tentar adivinhar a mesma palavra e ganhar pontos bônus.`}
        buttonText="Ignorar e Jogar minha vez"
        icon={<MaterialCommunityIcons name="swap-horizontal" size={48} color={COLORS.primary} />}
      >
        <TouchableOpacity
          style={[styles.startRoundButton, { marginTop: 12, width: '100%' }]}
          onPress={handleStealAccept}
        >
          <Text style={styles.startRoundButtonText}>Roubar Palavra</Text>
        </TouchableOpacity>
      </CustomModal>

      {/* Cancel Confirmation Modal */}
      <CustomModal
        visible={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancelar Rodada?"
        description="O seu time passará a vez sem marcar pontos e o outro time poderá roubar a palavra. Deseja continuar?"
        buttonText="VOLTAR AO JOGO"
        icon={<MaterialCommunityIcons name="close-circle" size={48} color={COLORS.dark} />}
      >
        <TouchableOpacity style={styles.modalExitButton} onPress={confirmCancel}>
          <Text style={styles.modalExitText}>SIM, CANCELAR</Text>
        </TouchableOpacity>
      </CustomModal>

      {/* Exit Modal */}
      <CustomModal
        visible={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Encerrar Partida?"
        description="Deseja mesmo sair?"
        buttonText="CONTINUAR JOGANDO"
        icon={<Ionicons name="warning" size={48} color={COLORS.primary} />}
      >
        <TouchableOpacity style={styles.modalExitButton} onPress={handleExit}>
          <Text style={styles.modalExitText}>SIM, ENCERRAR</Text>
        </TouchableOpacity>
      </CustomModal>

      {/* Time Up Modal */}
      <CustomModal
        visible={showTimeUpModal}
        onClose={handleTimeUpClose}
        title="TEMPO ESGOTADO!"
        description={
          isStealing
            ? "O tempo de roubo acabou! Agora começa sua rodada normal."
            : `A vez passou para o ${isTeamATurn ? 'TIME B' : 'TIME A'}.`
        }
        buttonText="ENTENDIDO"
        icon={<MaterialCommunityIcons name="timer-off" size={48} color={COLORS.primary} />}
      />

      {/* Steal Success Modal */}
      <CustomModal
        visible={showStealSuccessModal}
        onClose={() => setShowStealSuccessModal(false)}
        title="ROUBO COM SUCESSO!"
        description={`Parabéns! O Time ${isTeamATurn ? 'A' : 'B'} roubou a palavra e ganhou ${stealSuccessPoints} pontos bônus!
        
Agora é a vez normal do seu time.`}
        buttonText="VAMOS JOGAR!"
        icon={<MaterialCommunityIcons name="trophy" size={48} color="#FFD700" />}
      />
      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        currentLanguage={language}
        onSelect={setLanguage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  endButton: {
    backgroundColor: COLORS.dark,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderBottomWidth: 2,
    borderColor: '#b94b30',
  },
  endButtonText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
  },
  scoreboardContainer: {
    padding: 16,
    alignItems: 'center',
  },
  roundIndicator: {
    backgroundColor: COLORS.textDark,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: -12,
    zIndex: 10,
  },
  roundText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  scoreColumns: {
    flexDirection: 'row',
    backgroundColor: COLORS.support,
    borderRadius: 20,
    padding: 12,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    borderColor: '#D4B89C',
    borderBottomWidth: 4,
  },
  scoreBox: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#E0D8D0',
    borderBottomWidth: 4,
  },
  activeScoreBox: {
    borderColor: COLORS.primary,
    borderBottomWidth: 8,
    transform: [{ scale: 1.05 }],
  },
  teamColumn: {
    flex: 1,
    alignItems: 'center',
  },
  leaderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: -8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  leaderBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 4,
  },
  teamLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 4,
  },
  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textDark,
  },
  pointsUnit: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.light,
    marginLeft: 2,
  },
  vsWrapper: {
    width: 40,
    alignItems: 'center',
  },
  vsText: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.dark,
    opacity: 0.5,
  },
  gameContent: {
    flex: 1,
    alignItems: 'center',
  },
  roundActiveArea: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
  },
  stealActiveArea: {
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 24,
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
    paddingBottom: 20,
  },
  stealBadge: {
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#B8860B',
  },
  stealBadgeText: {
    color: '#3A2015',
    fontWeight: '900',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  activeThemeBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  activeThemeLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.cardBg,
    opacity: 0.6,
  },
  activeThemeValue: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  timerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  svgAbsolute: {
    position: 'absolute',
  },
  timerNumber: {
    fontSize: 56,
    fontWeight: '900',
    color: COLORS.textDark,
  },
  timerSec: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  actionGridRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionGridColumn: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderColor: COLORS.dark,
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 14,
    marginTop: 4,
  },
  holdHint: {
    color: '#FFF',
    fontSize: 10,
    opacity: 0.8,
  },
  timerControls: {
    width: '100%',
  },
  startRoundButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderBottomWidth: 4,
    borderColor: '#388E3C',
  },
  startRoundButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
  },
  winButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderBottomWidth: 4,
    borderColor: '#1976D2',
  },
  winButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
  },
  runningControls: {
    width: '100%',
    gap: 12,
  },
  secondaryControls: {
    flexDirection: 'row',
    gap: 12,
  },
  pauseButton: {
    flex: 1,
    backgroundColor: '#607D8B',
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderBottomWidth: 4,
    borderColor: '#455A64',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F44336',
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderBottomWidth: 4,
    borderColor: '#D32F2F',
  },
  secondaryButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
  },
  diceSection: {
    alignItems: 'center',
  },
  diceButton: {
    alignItems: 'center',
  },
  diceSquare: {
    width: 140,
    height: 140,
    backgroundColor: '#FFF',
    borderRadius: 24,
    borderWidth: 4,
    borderColor: COLORS.primary,
    borderBottomWidth: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  diceResultText: {
    fontSize: 72,
    fontWeight: '900',
    color: COLORS.primary,
  },
  diceButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
  },
  wordOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    zIndex: 1000,
  },
  wordCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  cardCornerIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  themeLabel: {
    fontSize: 15,
    color: '#999',
    fontWeight: '600',
    marginBottom: 10,
  },
  themeLabelSmall: {
    fontSize: 15,
    color: '#999',
    marginBottom: 10,
  },
  wordText: {
    fontSize: 40,
    fontWeight: '900',
    color: COLORS.primary,
    textAlign: 'center',
  },
  cardFooter: {
    marginTop: 20,
  },
  instructionText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  inventoryWrapper: {
    width: '100%',
  },
  tooltip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.dark,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  tooltipText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  fullInvOptions: {
    width: '100%',
    gap: 12,
    marginTop: 10,
  },
  replaceCardButton: {
    backgroundColor: COLORS.primaryLight,
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 4,
    borderColor: COLORS.primaryDark,
  },
  replaceCardText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
