import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LanguageModal } from '../components/LanguageModal';
import { SquareSwitch } from '../components/SquareSwitch';
import { useAppStore } from '../store/useAppStore';
import { COLORS } from '../constants/theme';



export default function MatchRules() {
  const router = useRouter();
  const {
    language, scoreToWin: storedScore, timer: storedTimer,
    canPause: storedPause, useSound: storedSound, useAlarm: storedAlarm,
    stealTurn: storedSteal, specialCardsEnabled,
    setMatchRules, setSpecialCardsEnabled, setLanguage, resetMatchStats
  } = useAppStore();

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [scoreToWin, setScoreToWin] = useState(storedScore);
  const [timer, setTimer] = useState(storedTimer);
  const [canPause, setCanPause] = useState(storedPause);
  const [useSound, setUseSound] = useState(storedSound);
  const [useAlarm, setUseAlarm] = useState(storedAlarm);
  const [stealTurn, setStealTurn] = useState(storedSteal);
  const [specialCards, setSpecialCards] = useState(specialCardsEnabled);

  const changeScore = (amount: number) => {
    setScoreToWin(prev => {
      const next = prev + amount;
      if (next < 10) return 10;
      if (next > 60) return 60;
      return next;
    });
  };

  const handleStart = () => {
    // Persist all settings to store
    setMatchRules({
      scoreToWin,
      timer,
      canPause,
      useSound,
      useAlarm,
      stealTurn
    });
    setSpecialCardsEnabled(specialCards);
    resetMatchStats();

    router.push('/game');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Configurar Partida"
        onLanguagePress={() => setShowLanguageModal(true)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        <View style={styles.headerSection}>
          <Text style={styles.tooltipText}>
            Defina como seu jogo vai funcionar e se os times poderão roubar a vez!
          </Text>
        </View>

        {/* Bloco "Condições de vitória" */}
        <View style={styles.rulesBlock}>
          <Text style={styles.blockTitle}>Condições de Vitória</Text>

          <View style={styles.ruleRow}>
            <Text style={styles.ruleLabel}>Pontuação para vitória</Text>
            <View style={styles.stepper}>
              <TouchableOpacity style={styles.stepBtn} onPress={() => changeScore(-10)}>
                <FontAwesome5 name="minus" size={16} color={COLORS.textDark} />
              </TouchableOpacity>
              <Text style={styles.scoreText}>{scoreToWin}</Text>
              <TouchableOpacity style={styles.stepBtn} onPress={() => changeScore(10)}>
                <FontAwesome5 name="plus" size={16} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bloco "Cronômetro" */}
        <View style={styles.rulesBlock}>
          <Text style={styles.blockTitle}>Cronômetro</Text>

          <View style={styles.ruleBlockInner}>
            <Text style={styles.ruleLabel}>Tempo por rodada</Text>
            <View style={styles.timerOptions}>
              {[30, 60, 90].map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.timerBtn, timer === t && styles.timerBtnActive]}
                  onPress={() => setTimer(t)}
                >
                  <Text style={[styles.timerBtnText, timer === t && styles.timerBtnTextActive]}>{t}s</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.ruleHint}>
              Recomendado 30s para até 3 jogadores, 60s para até 6, e 90s para mais.
            </Text>
            <View style={styles.switchGrid}>
              <SquareSwitch label="Pausar" value={canPause} onValueChange={setCanPause} />
              <SquareSwitch label="Som" value={useSound} onValueChange={setUseSound} />
              <SquareSwitch label="Alarme" value={useAlarm} onValueChange={setUseAlarm} />
            </View>
          </View>
        </View>

        {/* Bloco "Adicionais" */}
        <View style={styles.rulesBlock}>
          <Text style={styles.blockTitle}>Adicionais</Text>

          <View style={styles.switchGrid}>
            <SquareSwitch label="Cartas Especiais" value={specialCards} onValueChange={setSpecialCards} />
            <SquareSwitch label="Roubar Vez" value={stealTurn} onValueChange={setStealTurn} />
          </View>

          {specialCards && (
            <TouchableOpacity
              style={styles.configButton}
              onPress={() => router.push('/special-cards')}
            >
              <Ionicons name="settings-outline" size={20} color={COLORS.primary} />
              <Text style={styles.configButtonText}>Configurar Cartas Especiais</Text>
            </TouchableOpacity>
          )}
        </View>

      </ScrollView>

      <Footer buttonText="INICIAR PARTIDA" onPress={handleStart} />

      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        currentLanguage={language}
        onSelect={setLanguage}
      />
    </View>
  );
}

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
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 24,
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
  rulesBlock: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E0D8D0',
    borderBottomWidth: 4,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  ruleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ruleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    flex: 1,
    paddingRight: 10,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  stepBtn: {
    padding: 10,
    paddingHorizontal: 16,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    minWidth: 40,
    textAlign: 'center',
  },
  ruleBlockInner: {
  },
  timerOptions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  timerBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.light,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timerBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timerBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  timerBtnTextActive: {
    color: '#fff',
  },
  ruleHint: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  configButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  configButtonText: {
    color: COLORS.textDark,
    fontWeight: 'bold',
    fontSize: 14,
  },
  ruleDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginTop: 12,
  },
  switchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  startButtonText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },
});
