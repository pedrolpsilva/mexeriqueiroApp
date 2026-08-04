import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  cancelAnimation,
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

const ID_MAPPING_LOCAL: Record<string, string> = {
  '1': 'coringa',
  '2': 'gemeos',
  '3': 'bomb',
  '4': 'fratura',
  '5': 'riqueza',
  '6': 'dose',
  '7': 'oportuno',
};

export default function GameScreen() {
  const router = useRouter();
  const {
    language, teamA, teamB, words, timer: defaultTimer, scoreToWin,
    canPause, stealTurn, specialCardsEnabled, selectedCards, specialCardsData,
    leaderIndexA, leaderIndexB, setLeaderIndices,
    currentRoundState, setRoundState, resetRoundState, setLanguage,
    matchStats, updateMatchStats, resetMatch
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

  // Local state for special cards actions
  const [wasTimerRunningBeforeModal, setWasTimerRunningBeforeModal] = useState(false);
  const [showCoringaModal, setShowCoringaModal] = useState(false);
  const [showCoringaThemeModal, setShowCoringaThemeModal] = useState(false);
  const [showCoringaSwapSuccess, setShowCoringaSwapSuccess] = useState(false);
  const [coringaNewCardTitle, setCoringaNewCardTitle] = useState('');
  const [showDoseDuplaModal, setShowDoseDuplaModal] = useState(false);
  const [doseDuplaTeamName, setDoseDuplaTeamName] = useState('');
  const [showBombModal, setShowBombModal] = useState(false);
  const [showOportunoModal, setShowOportunoModal] = useState(false);
  const [oportunoPlayerName, setOportunoPlayerName] = useState<string | null>(null);

  // Filter themes based on settings
  const availableThemes = specialCardsEnabled
    ? THEMES
    : COMMON_THEMES;

  // Filter special cards based on selection and dynamic data
  const baseCardsData = specialCardsData;
  const availableSpecialCards = baseCardsData.filter(card => {
    const stringId = ID_MAPPING_LOCAL[card.id] || card.id;
    return selectedCards[card.id] || selectedCards[stringId];
  });

  // Scores and round
  const [scoreA, setScoreA] = useState(0.0);
  const [scoreB, setScoreB] = useState(0.0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isTeamATurn, setIsTeamATurn] = useState(true);

  // Animation values
  const diceScale = useSharedValue(1);
  const shakeOffset = useSharedValue(0);

  // Timer circle calculations (static, non-animated-props to prevent unmount crashes)
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const progress = (defaultTimer - timerValue) / defaultTimer;
  const strokeDashoffset = circumference * (1 - progress);

  const getTimerColor = (p: number) => {
    if (p < 0.35) return '#2ecc71';
    if (p < 0.70) return '#f1c40f';
    if (p < 0.86) return '#e66b1aff';
    return '#f00';
  };
  const strokeColor = getTimerColor(progress);

  // Cleanup animations on unmount to prevent leaks/crashes
  useEffect(() => {
    return () => {
      cancelAnimation(diceScale);
      cancelAnimation(shakeOffset);
    };
  }, []);

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
    let interval: any;
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
    const shuffleThemes = specialCardsEnabled ? THEMES : COMMON_THEMES;
    let interval: any = setInterval(() => {
      const tempRes = availableThemes[Math.floor(Math.random() * availableThemes.length)].key;
      setDiceResult(tempRes);
    }, 80);

    setTimeout(() => {
      clearInterval(interval);

      const rand = secureRandom() * 100;
      let finalTheme;

      if (specialCard || !specialCardsEnabled) {
        finalTheme = COMMON_THEMES[Math.floor(Math.random() * COMMON_THEMES.length)];
      } else {
        if (rand < 18) finalTheme = THEMES[0];      // Abstrato
        else if (rand < 36) finalTheme = THEMES[1]; // Vivo
        else if (rand < 54) finalTheme = THEMES[2]; // Consumo
        else if (rand < 72) finalTheme = THEMES[3]; // Objeto
        else if (rand < 90) finalTheme = THEMES[4]; // Lazer
        else finalTheme = THEMES[5];                // Especial
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
            : (baseCardsData.length > 0 ? baseCardsData[Math.floor(secureRandom() * baseCardsData.length)] : null);

          if (randomSpecial) {
            // Track special card usage
            if (!matchStats.specialCardsUsed.includes(randomSpecial.id)) {
              updateMatchStats({
                specialCardsUsed: [...matchStats.specialCardsUsed, randomSpecial.id]
              });
            }
            if (randomSpecial.usage === 'Instantâneo') {
              if (randomSpecial.id === 'bomb') {
                setRoundState({ activeCard: randomSpecial, specialCard: randomSpecial });
                setShowBombModal(true);
              } else {
                // Pick random common theme and word immediately
                const randomCommonTheme = COMMON_THEMES[Math.floor(secureRandom() * COMMON_THEMES.length)];
                const themeWords = words[randomCommonTheme.label] || [];
                const randomWord = themeWords.length > 0
                  ? themeWords[Math.floor(secureRandom() * themeWords.length)]
                  : 'Palavra não encontrada';

                setRoundState({
                  specialCard: randomSpecial,
                  activeCard: randomSpecial,
                  theme: randomCommonTheme,
                  word: randomWord,
                  timerValue: defaultTimer
                });
                setShowSpecialModal(true);
              }
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
          } else {
            // Fallback to a common theme if no special cards could be selected or loaded
            const fallbackTheme = COMMON_THEMES[Math.floor(secureRandom() * COMMON_THEMES.length)];
            const themeWords = words[fallbackTheme.label] || [];
            const randomWord = themeWords.length > 0
              ? themeWords[Math.floor(secureRandom() * themeWords.length)]
              : 'Palavra não encontrada';

            setRoundState({
              theme: fallbackTheme,
              word: randomWord,
              timerValue: defaultTimer
            });
            setShowWordModal(true);
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
    let points = timerValue >= 10 ? timerValue / 10 : 0.5;

    // CARD EFFECT: Riqueza (Livre)
    if (activeCard?.id === 'riqueza') {
      points = defaultTimer / 10;
    }

    // CARD EFFECT: Coringa (Livre)
    if (activeCard?.id === 'coringa') {
      points = 0.3 * scoreToWin;
    }

    let nextScoreA = scoreA;
    let nextScoreB = scoreB;

    if (isTeamATurn) {
      nextScoreA = scoreA + points;
      setScoreA(nextScoreA);
    } else {
      nextScoreB = scoreB + points;
      setScoreB(nextScoreB);
    }

    // CARD EFFECT: Gêmeo do Mau (Instantâneo)
    if (activeCard?.id === 'gemeos') {
      if (isTeamATurn) {
        nextScoreB = scoreB + points;
        setScoreB(nextScoreB);
      } else {
        nextScoreA = scoreA + points;
        setScoreA(nextScoreA);
      }
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
      finishRound(false, nextScoreA, nextScoreB); // Steal finishes, no rotation
    } else {
      rotateLeader(isTeamATurn);
      finishRound(true, nextScoreA, nextScoreB);
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

  const getFraturaPenalty = () => {
    return 3;
  };

  const handleLossEffects = () => {
    // 1. Fratura Penalty
    if (activeCard?.id === 'fratura') {
      const penalty = getFraturaPenalty();
      if (isTeamATurn) {
        setScoreA(prev => Math.max(0, prev - penalty));
      } else {
        setScoreB(prev => Math.max(0, prev - penalty));
      }
    }

    // 2. Transfer active card if volatile (Riqueza / Gêmeo do Mau)
    // Exclude 'gemeos' because it progresses on active steal and shouldn't go to rival's inventory
    // Exclude 'riqueza' because it only transfers if the rival chooses to steal the word
    if (activeCard && activeCard.volatile && activeCard.id !== 'gemeos' && activeCard.id !== 'riqueza') {
      const rivalTeam = isTeamATurn ? 'B' : 'A';
      const rivalInv = rivalTeam === 'A' ? inventoryA : inventoryB;
      if (rivalInv.length < 2) {
        addToInventory(rivalTeam, activeCard);
      }
    }

    // 3. Transfer inventory volatile cards
    handleTransferCards(isTeamATurn ? 'A' : 'B');
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    const wasNormalRound = !isStealing;

    if (wasNormalRound) {
      handleLossEffects();
      rotateLeader(isTeamATurn);

      // Track theme miss for the team who cancelled
      const themeLabel = theme?.label || 'Desconhecido';
      const newThemeStats = { ...matchStats.themeStats };
      if (!newThemeStats[themeLabel]) newThemeStats[themeLabel] = { hits: 0, misses: 0 };
      newThemeStats[themeLabel].misses += 1;
      updateMatchStats({ themeStats: newThemeStats });
    }

    if (activeCard?.id === 'dose') {
      finishRound(true);
    } else if (stealTurn && timerValue > 0 && wasNormalRound) {
      setShowStealModal(true);
    } else {
      finishRound(true);
    }
  };

  const handleStealAccept = () => {
    setShowStealModal(false);

    const originalTeamWasA = isTeamATurn;
    const rivalTeam = originalTeamWasA ? 'B' : 'A';

    // Switch turn to rival for the steal attempt
    setIsTeamATurn(!isTeamATurn);

    // Progression of Riqueza: passes to the rival team if they steal the word
    if (activeCard?.id === 'riqueza') {
      const rivalInv = rivalTeam === 'A' ? inventoryA : inventoryB;
      if (rivalInv.length < 2) {
        addToInventory(rivalTeam, activeCard);
      }
      setRoundState({ activeCard: null });
    }

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

      handleLossEffects();
      rotateLeader(isTeamATurn);
      finishRound(true);
    } else {
      finishRound(true);
    }
  };

  const handleBombExplosion = () => {
    setShowBombModal(false);

    // Track bomb as a special theme miss
    const themeLabel = 'Especial';
    const newThemeStats = { ...matchStats.themeStats };
    if (!newThemeStats[themeLabel]) newThemeStats[themeLabel] = { hits: 0, misses: 0 };
    newThemeStats[themeLabel].misses += 1;
    updateMatchStats({ themeStats: newThemeStats });

    // Since bomb is instant defeat, transfer volatile inventory cards
    handleTransferCards(isTeamATurn ? 'A' : 'B');

    // Rotate active team leader
    rotateLeader(isTeamATurn);

    // End round and pass turn
    finishRound(true);
  };

  const finishRound = (alreadyRotated = false, nextScoreA = scoreA, nextScoreB = scoreB) => {
    const wasStealing = isStealing;
    const currentTurnWasA = isTeamATurn;
    const hadDoseDupla = activeCard?.id === 'dose';

    // Ensure Gêmeos card is completely removed from inventories when round ends
    if (activeCard?.id === 'gemeos') {
      removeFromInventory('A', 'gemeos');
      removeFromInventory('B', 'gemeos');
    }

    // Reset Oportuno states
    setOportunoPlayerName(null);

    setRoundState({ isTimerRunning: false });
    resetRoundState();
    setDiceResult('?');

    // Rotate leader ONLY if it was a normal round and we haven't rotated yet.
    if (!wasStealing && !alreadyRotated) {
      rotateLeader(currentTurnWasA);
    }

    if (wasStealing) {
      setRoundState({ roundStarted: false });
    } else {
      if (hadDoseDupla) {
        // EXTRA ROUND: Turn does not pass to the rival!
        setDoseDuplaTeamName(currentTurnWasA ? 'TIME A' : 'TIME B');
        setShowDoseDuplaModal(true);

        setRoundState({ roundStarted: false });
      } else {
        // Normal turn switch
        const nextIsTeamA = !currentTurnWasA;
        setIsTeamATurn(nextIsTeamA);

        if (nextIsTeamA) {
          setCurrentRound(prev => prev + 1);
        }

        setRoundState({ roundStarted: false });
      }

      // Victory Check
      if (nextScoreA >= scoreToWin || nextScoreB >= scoreToWin) {
        updateMatchStats({
          totalRounds: currentRound,
          finalScoreA: nextScoreA,
          finalScoreB: nextScoreB
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
      // Exclude 'gemeos' from automatic transfer
      if (card.volatile && card.id !== 'gemeos' && toInv.length < 2) {
        addToInventory(toTeam, card);
        removeFromInventory(fromTeam, card.id);
      }
    });
  };

  const openSpecialCardModal = (card: any) => {
    if (roundStarted) {
      setWasTimerRunningBeforeModal(isTimerRunning);
      setRoundState({ isTimerRunning: false, specialCard: card });
    } else {
      setRoundState({ specialCard: card });
    }
    setShowSpecialModal(true);
  };

  const closeSpecialCardModal = () => {
    setShowSpecialModal(false);
    if (roundStarted) {
      if (wasTimerRunningBeforeModal) {
        setRoundState({ isTimerRunning: true });
      }
      setWasTimerRunningBeforeModal(false);
    } else {
      // If NOT started, and it's an Instantâneo card, we proceed to start the round!
      if (specialCard?.usage === 'Instantâneo') {
        setShowWordModal(true);
      } else {
        // If it was a Livre card just drawn on the dice, they closed it, so it's safely stored in inventory
        // and we clear the active round's specialCard field so they can roll again.
        setRoundState({ specialCard: null });
      }
    }
  };

  const handleCardUse = (card: any) => {
    // Resume timer if it was running and we are during active round (except for Oportuno, which selects a player first)
    if (roundStarted && card.id !== 'oportuno') {
      if (wasTimerRunningBeforeModal) {
        setRoundState({ isTimerRunning: true });
      }
      setWasTimerRunningBeforeModal(false);
    }

    // Consume from inventory
    removeFromInventory(isTeamATurn ? 'A' : 'B', card.id);

    // Set active card
    setRoundState({ activeCard: card });
    setShowSpecialModal(false);

    // Handle specific card activations
    if (card.id === 'coringa') {
      if (!roundStarted) {
        // Before rolling: show choice modal
        setShowCoringaModal(true);
      }
    } else if (card.id === 'oportuno') {
      setShowOportunoModal(true);
    }
  };

  const handleCoringaThemeChoice = (chosenThemeLabel: string) => {
    setShowCoringaThemeModal(false);
    setShowCoringaModal(false);

    const chosenTheme = THEMES.find(t => t.label === chosenThemeLabel);
    if (chosenTheme) {
      const themeWords = words[chosenTheme.label] || [];
      const randomWord = themeWords.length > 0
        ? themeWords[Math.floor(secureRandom() * themeWords.length)]
        : 'Palavra não encontrada';

      setRoundState({
        theme: chosenTheme,
        word: randomWord,
        timerValue: defaultTimer,
        activeCard: activeCard || specialCard, // Keep Coringa active
      });
      setShowWordModal(true);
    }
  };

  const handleCoringaSwap = () => {
    setShowCoringaModal(false);

    // Filter available cards that are Livre and NOT Coringa
    const livreCards = availableSpecialCards.filter(c => c.usage === 'Livre' && c.id !== 'coringa');
    const fallbackLivre = availableSpecialCards.filter(c => c.usage === 'Livre');
    const candidates = livreCards.length > 0 ? livreCards : fallbackLivre;

    if (candidates.length > 0) {
      const newCard = candidates[Math.floor(secureRandom() * candidates.length)];
      addToInventory(isTeamATurn ? 'A' : 'B', newCard);
      setCoringaNewCardTitle(newCard.title);
      setShowCoringaSwapSuccess(true);
    }
  };

  const handleOportunoPlayerSelect = (playerName: string) => {
    setOportunoPlayerName(playerName);
    setShowOportunoModal(false);

    // Resume timer if it was running before the modal opened
    if (wasTimerRunningBeforeModal) {
      setRoundState({ isTimerRunning: true });
    }
    setWasTimerRunningBeforeModal(false);
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
    
    // Delay state resets and navigation to allow Modal to unmount cleanly on Android
    setTimeout(() => {
      resetMatch();
      setScoreA(0.0);
      setScoreB(0.0);
      setCurrentRound(1);
      setIsTeamATurn(true);
      setDiceResult('?');
      setIsRolling(false);
      setOportunoPlayerName(null);
      router.replace('/');
    }, 150);
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
              <View style={styles.leaderRowContainer}>
                <View style={styles.leaderBadge}>
                  <FontAwesome5 name="user-tie" size={12} color={COLORS.primary} />
                  <Text style={styles.leaderBadgeText}>{teamA[leaderIndexA]?.name}</Text>
                </View>
                <Inventory
                  team="A"
                  cards={inventoryA}
                  activeCard={activeCard}
                  isCurrentTurn={!isRolling && roundStarted}
                  onCardPress={(card) => openSpecialCardModal(card)}
                  compact
                />
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
              <View style={styles.leaderRowContainer}>
                <View style={styles.leaderBadge}>
                  <FontAwesome5 name="user-tie" size={12} color={COLORS.primary} />
                  <Text style={styles.leaderBadgeText}>{teamB[leaderIndexB]?.name}</Text>
                </View>
                <Inventory
                  team="B"
                  cards={inventoryB}
                  activeCard={activeCard}
                  isCurrentTurn={!isRolling && roundStarted}
                  onCardPress={(card) => openSpecialCardModal(card)}
                  compact
                />
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Game Content Area */}
      <View style={styles.gameContent}>
        {showTooltip && (
          <View style={styles.tooltip}>
            <MaterialCommunityIcons name="gift-outline" size={14} color="#FFF" />
            <Text style={styles.tooltipText}>
              Ganhaste uma Carta Especial! Pode guardá-la ou usá-la para virar o jogo.
            </Text>
          </View>
        )}
        {/* Dice Section */}
        {!roundStarted && (
          <View style={styles.diceSection}>
            {specialCard && !isRolling && (
              <View style={styles.actionGridColumn}>
                <View style={styles.actionGridRow}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: COLORS.dark }]}
                    onPress={() => openSpecialCardModal(specialCard)}
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

            {activeCard && (
              <View style={styles.badgeContainer}>
                {activeCard.id === 'coringa' && (
                  <View style={[styles.effectBadge, styles.coringaBadge]}>
                    <MaterialCommunityIcons name="cards-playing-outline" size={14} color="#FFF" />
                    <Text style={styles.effectBadgeText}>CORINGA: 30% dos pontos de vitória ao acertar!</Text>
                  </View>
                )}
                {activeCard.id === 'oportuno' && (
                  <View style={[styles.effectBadge, styles.oportunoBadge]}>
                    <MaterialCommunityIcons name="lightbulb-on" size={14} color="#FFF" />
                    <Text style={styles.effectBadgeText}>
                      {oportunoPlayerName 
                        ? `OPORTUNO: DICA EXTRA PARA ${oportunoPlayerName.toUpperCase()}!` 
                        : 'OPORTUNO: +1 DICA EXTRA!'}
                    </Text>
                  </View>
                )}
                {activeCard.id === 'gemeos' && (
                  <View style={[styles.effectBadge, styles.gemeosBadge]}>
                    <FontAwesome5 name="user-friends" size={12} color="#FFF" />
                    <Text style={styles.effectBadgeText}>GÊMEO DO MAU: Pontos Compartilhados!</Text>
                  </View>
                )}
                {activeCard.id === 'fratura' && (
                  <View style={[styles.effectBadge, styles.fraturaBadge]}>
                    <MaterialCommunityIcons name="bone" size={14} color="#FFF" />
                    <Text style={styles.effectBadgeText}>FRATURA: Penalidade se Errar!</Text>
                  </View>
                )}
                {activeCard.id === 'riqueza' && (
                  <View style={[styles.effectBadge, styles.riquezaBadge]}>
                    <FontAwesome5 name="coins" size={12} color="#FFF" />
                    <Text style={styles.effectBadgeText}>RIQUEZA: Prêmio Máximo Ativo!</Text>
                  </View>
                )}
                {activeCard.id === 'dose' && (
                  <View style={[styles.effectBadge, styles.doseBadge]}>
                    <MaterialCommunityIcons name="cards-playing" size={14} color="#FFF" />
                    <Text style={styles.effectBadgeText}>DOSE DUPLA: Rodada Extra Garantida!</Text>
                  </View>
                )}
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
                    onPress={() => openSpecialCardModal(specialCard)}
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
                <Circle
                  cx={80}
                  cy={80}
                  r={radius}
                  strokeWidth={10}
                  fill="none"
                  strokeDasharray={circumference}
                  stroke={strokeColor}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                />
              </Svg>
              <Text style={styles.timerNumber}>{timerValue}</Text>
              <Text style={styles.timerSec}>segundos</Text>
            </Animated.View>
          </View>
        )}



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
                  onPress={() => finishRound()}
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
        onClose={closeSpecialCardModal}
        specialCard={specialCard}
        onConfirm={(specialCard && specialCard.usage === 'Livre') ? () => handleCardUse(specialCard) : undefined}
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

      {/* Coringa Choice Modal */}
      <CustomModal
        visible={showCoringaModal}
        onClose={() => setShowCoringaModal(false)}
        title="ESCOLHA O EFEITO DO CORINGA"
        description="Como deseja usar seu Coringa antes de rolar o dado?"
        buttonText="CANCELAR"
        icon={<MaterialCommunityIcons name="cards-playing-outline" size={48} color={COLORS.primary} />}
      >
        <View style={styles.fullInvOptions}>
          <TouchableOpacity
            style={styles.replaceCardButton}
            onPress={() => setShowCoringaThemeModal(true)}
          >
            <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#FFF" />
            <Text style={styles.replaceCardText}>Escolher Tema</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.replaceCardButton, { backgroundColor: COLORS.dark, borderColor: '#555' }]}
            onPress={handleCoringaSwap}
          >
            <MaterialCommunityIcons name="swap-horizontal" size={24} color="#FFF" />
            <Text style={styles.replaceCardText}>Trocar Carta</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>

      {/* Coringa Theme Choice Modal */}
      <CustomModal
        visible={showCoringaThemeModal}
        onClose={() => setShowCoringaThemeModal(false)}
        title="ESCOLHA UM TEMA"
        description="Selecione o tema para jogar a rodada imediatamente:"
        buttonText="CANCELAR"
        icon={<MaterialCommunityIcons name="format-list-bulleted" size={48} color={COLORS.primary} />}
      >
        <View style={styles.fullInvOptions}>
          {COMMON_THEMES.map(t => (
            <TouchableOpacity
              key={t.id}
              style={styles.replaceCardButton}
              onPress={() => handleCoringaThemeChoice(t.label)}
            >
              <Text style={styles.replaceCardText}>{t.label.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </CustomModal>

      {/* Coringa Swap Success Modal */}
      <CustomModal
        visible={showCoringaSwapSuccess}
        onClose={() => setShowCoringaSwapSuccess(false)}
        title="CARTA TROCADA COM SUCESSO!"
        description={`Seu Coringa foi descartado e você recebeu a carta Livre: ${coringaNewCardTitle} no seu inventário!`}
        buttonText="FECHAR"
        icon={<MaterialCommunityIcons name="check-circle" size={48} color="#2ecc71" />}
      />

      {/* Dose Dupla Modal */}
      <CustomModal
        visible={showDoseDuplaModal}
        onClose={() => setShowDoseDuplaModal(false)}
        title="RODADA EXTRA!"
        description={`Efeito DOSE DUPLA ativado! O ${doseDuplaTeamName} joga novamente.`}
        buttonText="JOGAR NOVAMENTE!"
        icon={<MaterialCommunityIcons name="cards-playing" size={48} color="#FFD700" />}
      />

      {/* Autodestruição (Bomb) Modal */}
      <CustomModal
        visible={showBombModal}
        onClose={handleBombExplosion}
        title={`BUM! AUTODESTRUIÇÃO - ${isTeamATurn ? 'TIME A' : 'TIME B'}`}
        description={`O ${isTeamATurn ? 'Time A' : 'Time B'} sorteou a carta de Autodestruição!\n\nA rodada foi destruída e por isso vocês não jogarão nesta rodada. A vez passa diretamente para o time rival, sem a possibilidade de roubo de palavra.`}
        buttonText="ENTENDIDO"
        icon={<MaterialCommunityIcons name="bomb" size={48} color={COLORS.danger} />}
      />

      {/* Oportuno Player Selection Modal */}
      <CustomModal
        visible={showOportunoModal}
        onClose={() => {
          // Fallback selection if modal closed without explicitly selecting
          const currentTeamPlayers = isTeamATurn ? teamA : teamB;
          const currentLeaderIdx = isTeamATurn ? leaderIndexA : leaderIndexB;
          const oportunoPlayers = currentTeamPlayers.filter((_, idx) => idx !== currentLeaderIdx);
          const fallbackPlayer = oportunoPlayers[0] || currentTeamPlayers[0];
          if (fallbackPlayer) {
            handleOportunoPlayerSelect(fallbackPlayer.name);
          } else {
            setShowOportunoModal(false);
            if (wasTimerRunningBeforeModal) {
              setRoundState({ isTimerRunning: true });
            }
            setWasTimerRunningBeforeModal(false);
          }
        }}
        title="DICA EXTRA OPORTUNO!"
        description={`Escolha o jogador do seu time que receberá uma dica extra de ${currentLeaderName}:`}
        buttonText="CANCELAR"
        icon={<MaterialCommunityIcons name="lightbulb-on" size={48} color={COLORS.primary} />}
      >
        <View style={styles.fullInvOptions}>
          {(() => {
            const currentTeamPlayers = isTeamATurn ? teamA : teamB;
            const currentLeaderIdx = isTeamATurn ? leaderIndexA : leaderIndexB;
            const oportunoPlayers = currentTeamPlayers.filter((_, idx) => idx !== currentLeaderIdx);
            const list = oportunoPlayers.length > 0 ? oportunoPlayers : currentTeamPlayers;

            return list.map(player => (
              <TouchableOpacity
                key={player.id}
                style={[styles.replaceCardButton, { backgroundColor: '#1dd1a1', borderColor: '#10ac84' }]}
                onPress={() => handleOportunoPlayerSelect(player.name)}
              >
                <FontAwesome5 name="user" size={18} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.replaceCardText}>{player.name.toUpperCase()}</Text>
              </TouchableOpacity>
            ));
          })()}
        </View>
      </CustomModal>
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
  leaderRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: -8,
  },
  leaderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
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
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  effectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  effectBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  coringaBadge: {
    backgroundColor: '#00b894',
    borderColor: '#00dec3',
  },
  oportunoBadge: {
    backgroundColor: '#1dd1a1',
    borderColor: '#10ac84',
  },
  gemeosBadge: {
    backgroundColor: '#2d3436',
    borderColor: '#636e72',
  },
  fraturaBadge: {
    backgroundColor: '#d63031',
    borderColor: '#ff7675',
  },
  riquezaBadge: {
    backgroundColor: '#f1c40f',
    borderColor: '#f39c12',
  },
  doseBadge: {
    backgroundColor: '#0984e3',
    borderColor: '#74b9ff',
  },
  diceButtonDisabled: {
    opacity: 0.6,
  },
  modalExitButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    width: '100%',
    borderBottomWidth: 4,
    borderColor: '#D32F2F',
  },
  modalExitText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
