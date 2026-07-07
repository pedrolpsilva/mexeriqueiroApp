import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import packageJson from '../../package.json';
import { LanguageModal } from '../components/LanguageModal';
import { COLORS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';



export default function Page() {
  const router = useRouter();
  const { language, setLanguage, resetMatch } = useAppStore();

  useFocusEffect(
    React.useCallback(() => {
      resetMatch();
    }, [resetMatch])
  );

  const [showLanguageModal, setShowLanguageModal] = React.useState(false);

  // Animação sutil para o "mascote" ou logo
  const bounceValue = useSharedValue(0);

  useEffect(() => {
    bounceValue.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1500 }),
        withTiming(0, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const animatedLogo = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bounceValue.value }],
    };
  });

  const handleLanguagePress = () => {
    setShowLanguageModal(true);
  };

  const getLanguageFlag = () => {
    if (language === 'BR') return '🇧🇷 PT-BR';
    if (language === 'US') return '🇺🇸 EN-US';
    return '🇪🇸 ES-ES';
  };

  const translations = {
    BR: { play: 'Iniciar Jogo', rules: 'Como Jogar', settings: 'Configurações' },
    US: { play: 'Start Game', rules: 'How to Play', settings: 'Settings' },
    ES: { play: 'Iniciar Juego', rules: 'Cómo Jugar', settings: 'Ajustes' },
  };

  const t = translations[language];

  return (
    <View style={styles.container}>


      {/* Background decoration to simulate a subtle grid/card pattern */}
      <View style={styles.gridOverlay} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Top bar with language toggle aligned right */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.languageButton} onPress={handleLanguagePress}>
            <Text style={styles.languageText}>{getLanguageFlag()}</Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color={COLORS.textDark} />
          </TouchableOpacity>
        </View>

        {/* Centered Logo / Title area */}
        <Animated.View
          entering={FadeInDown.duration(800).delay(200)}
          style={styles.logoContainer}
        >
          <Animated.View style={[styles.iconWrapper, animatedLogo]}>
            {/* <MaterialCommunityIcons name="cards-playing" size={64} color={COLORS.primary} /> */}
            <Image source={require('../../assets/images/splash-icon.png')} style={{ width: 120, height: 120 }} />
          </Animated.View>
          <Text style={styles.title}>Mexeriqueiro</Text>
          <Text style={styles.subtitle}>Party Game</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(800).delay(400)}
          style={styles.buttonContainer}
        >
          {/* Botão Principal: Iniciar Jogo */}
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => router.push('/match-settings')} activeOpacity={0.8}>
            <View style={styles.btnContent}>
              <FontAwesome5 name="play" size={20} color="#FFFFFF" />
              <Text style={styles.btnTextPrimary}>{t.play}</Text>
            </View>
          </TouchableOpacity>

          {/* Botão Secundário: Configurações */}
          <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={() => router.push('/settings')} activeOpacity={0.8}>
            <View style={styles.btnContent}>
              <Ionicons name="settings-sharp" size={22} color={COLORS.textDark} />
              <Text style={styles.btnTextSecondary}>{t.settings}</Text>
            </View>
          </TouchableOpacity>

          {/* Botão de Apoio: Como Jogar */}
          <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={() => router.push('/rules')} activeOpacity={0.8}>
            <View style={styles.btnContent}>
              <MaterialCommunityIcons name="lightbulb-on" size={24} color={COLORS.textDark} />
              <Text style={styles.btnTextSecondary}>{t.rules}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer with App Version */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>v{packageJson.version}</Text>
        </View>
      </ScrollView>

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
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.03,
    // A simple way to create a grid pattern is using a repeating background image, 
    // but we use a color overlay trick here to keep it light.
    backgroundColor: '#000',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.support,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  languageText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    marginRight: 4,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  iconWrapper: {
    marginBottom: 16,
    position: 'relative',
  },
  iconBadge: {
    position: 'absolute',
    bottom: -4,
    right: -8,
    backgroundColor: COLORS.light,
    borderRadius: 12,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.light,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: -4,
  },
  buttonContainer: {
    flex: 1,
    gap: 16,
    marginTop: 20,
  },
  btn: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 6, // Cria a sensação de profundidade de botão/cartão físico
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.dark,
  },
  btnSecondary: {
    backgroundColor: COLORS.cardBg,
    borderColor: '#E0D8D0',
    borderWidth: 1,
    borderBottomWidth: 6,
  },
  btnSupport: {
    backgroundColor: COLORS.support,
    borderColor: COLORS.light,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  btnTextPrimary: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  btnTextSecondary: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  versionText: {
    color: COLORS.light,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
