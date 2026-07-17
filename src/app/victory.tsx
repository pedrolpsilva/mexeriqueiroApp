import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { Footer } from '../components/Footer';
import { COLORS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';

export default function VictoryScreen() {
  const router = useRouter();
  const { matchStats, specialCardsData, resetMatch } = useAppStore();

  const gameDuration = useMemo(() => {
    if (!matchStats.startTime) return '00:00';
    const diff = Date.now() - matchStats.startTime;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [matchStats.startTime]);

  const winnerLabel = useMemo(() => {
    if (matchStats.finalScoreA > matchStats.finalScoreB) return 'TIME A';
    if (matchStats.finalScoreB > matchStats.finalScoreA) return 'TIME B';
    return 'EMPATE';
  }, [matchStats.finalScoreA, matchStats.finalScoreB]);

  const bestLeaders = useMemo(() => {
    return Object.entries(matchStats.leaderPoints)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
  }, [matchStats.leaderPoints]);

  const themePerformances = useMemo(() => {
    return Object.entries(matchStats.themeStats).map(([label, stats]) => {
      const total = stats.hits + stats.misses;
      const accuracy = total > 0 ? (stats.hits / total) * 100 : 0;
      return { label, ...stats, accuracy };
    }).sort((a, b) => b.accuracy - a.accuracy);
  }, [matchStats.themeStats]);

  const cardsUsed = useMemo(() => {
    return specialCardsData.filter(card => matchStats.specialCardsUsed.includes(card.id));
  }, [matchStats.specialCardsUsed, specialCardsData]);

  const handleNewGame = () => {
    resetMatch();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Victory Header */}
        <Animated.View 
          entering={FadeInDown.duration(800)}
          style={styles.victoryHeader}
        >
          <Animated.View 
            entering={ZoomIn.duration(1000).delay(300)}
            style={styles.trophyWrapper}
          >
            <FontAwesome5 name="trophy" size={64} color="#FFD700" />
          </Animated.View>
          <Text style={styles.victoryTitle}>
            {winnerLabel === 'EMPATE' ? 'EMPATE!' : `${winnerLabel} VENCEU!`}
          </Text>
          <Text style={styles.victorySubtitle}>
            {winnerLabel === 'EMPATE' 
              ? 'Ninguém ficou para trás!' 
              : `Parabéns ao ${winnerLabel} pela vitória!`}
          </Text>
        </Animated.View>

        {/* Final Scoreboard */}
        <Animated.View 
          entering={FadeInUp.duration(800).delay(600)}
          style={styles.finalScoreboard}
        >
          <View style={[styles.teamScore, winnerLabel === 'TIME A' && styles.winnerScore]}>
            <Text style={styles.teamScoreLabel}>TIME A</Text>
            <Text style={styles.teamScoreValue}>{matchStats.finalScoreA.toFixed(1).replace('.', ',')}</Text>
          </View>
          <View style={styles.scoreSeparator}>
            <Text style={styles.scoreSeparatorText}>X</Text>
          </View>
          <View style={[styles.teamScore, winnerLabel === 'TIME B' && styles.winnerScore]}>
            <Text style={styles.teamScoreLabel}>TIME B</Text>
            <Text style={styles.teamScoreValue}>{matchStats.finalScoreB.toFixed(1).replace('.', ',')}</Text>
          </View>
        </Animated.View>

        {/* Quick Stats Grid */}
        <Animated.View 
          entering={FadeInUp.duration(800).delay(800)}
          style={styles.statsGrid}
        >
          <View style={styles.statBox}>
            <Ionicons name="time-outline" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{gameDuration}</Text>
            <Text style={styles.statLabel}>Duração</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="refresh" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{matchStats.totalRounds}</Text>
            <Text style={styles.statLabel}>Rodadas</Text>
          </View>
        </Animated.View>

        {/* Top Performers */}
        {bestLeaders.length > 0 && (
          <Animated.View 
            entering={FadeInUp.duration(800).delay(1000)}
            style={styles.section}
          >
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="medal" size={18} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Líderes Destaque</Text>
            </View>
            <View style={styles.leadersList}>
              {bestLeaders.map(([name, points], index) => (
                <View key={name} style={styles.leaderItem}>
                  <Text style={styles.leaderRank}>{index + 1}º</Text>
                  <Text style={styles.leaderName}>{name}</Text>
                  <Text style={styles.leaderPoints}>{points.toFixed(1)} pts</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        )}

        {/* Theme Stats */}
        {themePerformances.length > 0 && (
          <Animated.View 
            entering={FadeInUp.duration(800).delay(1200)}
            style={styles.section}
          >
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="chart-donut" size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Desempenho por Tema</Text>
            </View>
            <View style={styles.themesList}>
              {themePerformances.map((theme) => (
                <View key={theme.label} style={styles.themeItem}>
                  <View style={styles.themeMain}>
                    <Text style={styles.themeLabel}>{theme.label}</Text>
                    <Text style={styles.themeAccuracy}>{theme.accuracy.toFixed(0)}% de acerto</Text>
                  </View>
                  <View style={styles.themeDots}>
                    {Array.from({ length: theme.hits }).map((_, i) => (
                      <View key={`h-${i}`} style={[styles.dot, styles.dotHit]} />
                    ))}
                    {Array.from({ length: theme.misses }).map((_, i) => (
                      <View key={`m-${i}`} style={[styles.dot, styles.dotMiss]} />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>
        )}

        {/* Special Cards Used */}
        {cardsUsed.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="cards-playing" size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Cartas Utilizadas</Text>
            </View>
            <View style={styles.cardsRow}>
              {cardsUsed.map((card) => (
                <View key={card.id} style={styles.cardChip}>
                  <MaterialCommunityIcons name={card.icon as any} size={16} color={COLORS.primary} />
                  <Text style={styles.cardChipText}>{card.title}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Footer 
          buttonText="NOVA PARTIDA" 
          onPress={handleNewGame}
          icon={<Ionicons name="refresh" size={24} color="#fff" />}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  victoryHeader: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  trophyWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  victoryTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  victorySubtitle: {
    fontSize: 16,
    color: COLORS.textDark,
    opacity: 0.7,
    marginTop: 8,
    fontWeight: 'bold',
  },
  finalScoreboard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0D8D0',
    borderBottomWidth: 6,
  },
  teamScore: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  winnerScore: {
    backgroundColor: '#FFF1EC',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  teamScoreLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 4,
  },
  teamScoreValue: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.textDark,
  },
  scoreSeparator: {
    paddingHorizontal: 20,
  },
  scoreSeparatorText: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    opacity: 0.3,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0D8D0',
    borderBottomWidth: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textDark,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0D8D0',
    borderBottomWidth: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  leadersList: {
    gap: 12,
  },
  leaderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 12,
  },
  leaderRank: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
    width: 32,
  },
  leaderName: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  leaderPoints: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.primary,
  },
  themesList: {
    gap: 12,
  },
  themeItem: {
    marginBottom: 4,
  },
  themeMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  themeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  themeAccuracy: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  themeDots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotHit: {
    backgroundColor: '#4CAF50',
  },
  dotMiss: {
    backgroundColor: '#F44336',
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cardChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1EC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.support,
  },
  cardChipText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
