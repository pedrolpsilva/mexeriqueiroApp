import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomModal } from '../components/CustomModal';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { LanguageModal } from '../components/LanguageModal';
import { SpecialCardModal } from '../components/SpecialCardModal';
import { COLORS } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';

export default function SpecialCards() {
  const router = useRouter();
  const { language, selectedCards, specialCardsData, setMatchRules, setLanguage } = useAppStore();
  const [localSelectedCards, setLocalSelectedCards] = useState(selectedCards);

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCardDetail, setSelectedCardDetail] = useState<any>(null);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const getLanguageFlag = () => {
    if (language === 'BR') return '🇧🇷';
    if (language === 'US') return '🇺🇸';
    return '🇪🇸';
  };

  const handleSave = () => {
    setMatchRules({ selectedCards: localSelectedCards });
    setShowSaveSuccess(true);
  };

  const onSaveSuccessClose = () => {
    setShowSaveSuccess(false);
    router.back();
  };

  const openModal = (card: any) => {
    setSelectedCardDetail(card);
    setModalVisible(true);
  };

  const renderIcon = (card: any, isSelected: boolean) => {
    const color = isSelected ? COLORS.primary : '#999';
    if (card.type === 'FontAwesome5') {
      return <FontAwesome5 name={card.icon} size={32} color={color} />;
    }
    return <MaterialCommunityIcons name={card.icon} size={36} color={color} />;
  };

  return (
    <View style={styles.container}>
      <Header
        title="Cartas Especiais"
        onLanguagePress={() => setShowLanguageModal(true)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.pageSubtitle}>
            Selecione quais cartas podem aparecer durante a partida. Toque em uma carta para ver o detalhamento.
          </Text>
        </View>

        <View style={styles.grid}>
          {specialCardsData.map(card => {
            const isSelected = localSelectedCards[card.id];
            return (
              <TouchableOpacity
                key={card.id}
                style={[styles.cardItem, isSelected ? styles.cardItemSelected : styles.cardItemUnselected]}
                onPress={() => openModal(card)}
                activeOpacity={0.7}
              >
                {/* Top Title */}
                <Text style={[styles.cardTitle, !isSelected && styles.textUnselected]} numberOfLines={1}>
                  {card.title}
                </Text>

                {/* Points Badge */}
                <View style={styles.pointsBadge}>
                  <Text style={styles.pointsBadgeText}>{card.points}</Text>
                </View>

                {/* Center Icon */}
                <View style={styles.cardIconWrapper}>
                  {renderIcon(card, isSelected)}
                </View>

                {/* Rarity Stars (Mini) */}
                <View style={styles.rarityRow}>
                  {[...Array(card.rarity)].map((_, i) => (
                    <Ionicons key={i} name="star" size={8} color="#FFD700" />
                  ))}
                </View>

                {/* Top Right Checkbox */}
                <TouchableOpacity
                  style={[styles.checkbox, isSelected && styles.checkboxSelected]}
                  onPress={() => setLocalSelectedCards(prev => ({ ...prev, [card.id]: !prev[card.id] }))}
                  hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                >
                  {isSelected && <Ionicons name="checkmark" size={14} color="#FFF" />}
                </TouchableOpacity>

              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <Footer
        buttonText="SALVAR SELEÇÃO"
        onPress={handleSave}
        buttonColor={COLORS.info}
        borderColor={COLORS.buttonBorderInfo}
        icon={<Ionicons name="checkmark-circle" size={24} color="#fff" />}
      />

      <SpecialCardModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        specialCard={selectedCardDetail}
      />
      {showSaveSuccess && (
        <CustomModal
          visible={true}
          onClose={onSaveSuccessClose}
          title="Salvo!"
          description="As configurações das cartas especiais foram atualizadas com sucesso."
          icon={<Ionicons name="checkmark-circle" size={48} color={COLORS.primary} />}
        />
      )}

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
    paddingBottom: 120, // space for fixed footer
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardItem: {
    width: '30%', // roughly 3 columns
    aspectRatio: 0.75, // card ratio
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 8,
    borderWidth: 2,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardItemSelected: {
    borderColor: COLORS.dark,
    borderBottomWidth: 4,
  },
  cardItemUnselected: {
    borderColor: '#E0D8D0',
    borderBottomWidth: 2,
    opacity: 0.6,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginTop: 4,
  },
  textUnselected: {
    color: '#999',
  },
  cardIconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0D8D0',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.dark,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  pointsBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: COLORS.support,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    zIndex: 1,
  },
  pointsBadgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  rarityRow: {
    flexDirection: 'row',
    gap: 1,
    marginBottom: 4,
  },
});
