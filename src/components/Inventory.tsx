import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import { COLORS } from '../constants/theme';
import { SpecialCard, useAppStore } from '../store/useAppStore';

// ─── Colors ─────────────────────────────────────────────────────────────────
const C_LIGHT = '#F8B4B6'; // Red Light  – borda vazia
const C_MEDIUM = '#EE676A'; // Red Claro  – slot ocupado
const C_DARK = '#E7373A'; // Red Padrão – slot ativo / pulse

// ─── Types ───────────────────────────────────────────────────────────────────
interface InventoryProps {
  team: 'A' | 'B';
  cards: SpecialCard[];
  activeCard?: SpecialCard | null;
  onCardPress: (card: SpecialCard) => void;
  isCurrentTurn: boolean;
  hasVolatileCard?: boolean;
  compact?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function renderSlotIcon(icon: string, type: string, size = 28, color = '#FFF') {
  if (type === 'FontAwesome5') {
    return <FontAwesome5 name={icon as any} size={size} color={color} />;
  }
  return <MaterialCommunityIcons name={icon as any} size={size + 2} color={color} />;
}

// ─── Active Slot with pulse animation ────────────────────────────────────────
function ActiveSlot({ card, onPress, compact = false }: { card: SpecialCard; onPress: () => void; compact?: boolean }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.12, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  const slotStyle = compact
    ? [styles.slotCompact, styles.slotActive, { transform: [{ scale: pulseAnim }] }]
    : [styles.slot, styles.slotActive, { transform: [{ scale: pulseAnim }] }];

  const iconSize = compact ? 16 : 28;

  return (
    <Animated.View style={slotStyle}>
      <TouchableOpacity style={styles.slotInner} onPress={onPress} activeOpacity={0.8}>
        {renderSlotIcon(card.icon, card.type, iconSize)}
        {card.volatile && (
          <View style={[styles.volatileBadge, compact && styles.volatileBadgeCompact]}>
            <MaterialCommunityIcons name="swap-horizontal" size={compact ? 6 : 9} color="#FFF" />
          </View>
        )}
        {!compact && (
          <View style={styles.activeLabelWrap}>
            <Text style={styles.activeLabelText}>ATIVO</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Inventory({
  team,
  cards,
  activeCard,
  onCardPress,
  isCurrentTurn,
  hasVolatileCard = false,
  compact = false,
}: InventoryProps) {
  const { removeFromInventory, setRoundState } = useAppStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState<SpecialCard | null>(null);

  const safeCards = Array.isArray(cards) ? cards : [];

  const handleOpenModal = () => {
    setSelectedCard(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  const handleUseCard = () => {
    if (selectedCard) {
      setRoundState({
        activeCard: selectedCard,
        specialCard: selectedCard,
      });
      removeFromInventory(team, selectedCard.id);
      handleCloseModal();
    }
  };

  if (compact) {
    return (
      <>
        <TouchableOpacity
          style={styles.containerCompact}
          onPress={handleOpenModal}
          activeOpacity={isCurrentTurn ? 0.7 : 1}
          disabled={!isCurrentTurn}
        >
          <View style={styles.slotsRowCompact}>
            {[0, 1].map((index) => {
              const card = safeCards[index];
              const isActive = !!card && activeCard?.id === card.id;

              if (!card) {
                return (
                  <View key={`empty-${index}`} style={[styles.slotEmpty, styles.slotCompact]} />
                );
              }

              if (isActive) {
                return (
                  <View key={card.id} style={[styles.slotCompact, styles.slotActive]}>
                    {renderSlotIcon(card.icon, card.type, 10)}
                  </View>
                );
              }

              return (
                <View key={card.id} style={[styles.slotCompact, styles.slotOccupied]}>
                  {renderSlotIcon(card.icon, card.type, 10)}
                  {card.volatile && (
                    <View style={[styles.volatileBadge, styles.volatileBadgeCompact]}>
                      <MaterialCommunityIcons name="swap-horizontal" size={4} color="#FFF" />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalOpen}
          onRequestClose={handleCloseModal}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleCloseModal}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.modalContent}
            >
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons name="cards-playing" size={40} color={COLORS.primary} />
                <Text style={styles.modalTitle}>Cartas Especiais</Text>
                <Text style={styles.modalSubtitle}>TIME {team}</Text>
              </View>

              {activeCard ? (
                <View style={styles.activeNotice}>
                  <MaterialCommunityIcons name="alert-circle-outline" size={16} color={COLORS.danger} />
                  <Text style={styles.activeNoticeText}>Você já usou uma carta nesta rodada!</Text>
                </View>
              ) : null}

              <View style={styles.modalSlotsContainer}>
                {[0, 1].map((index) => {
                  const card = safeCards[index];

                  if (!card) {
                    return (
                      <View key={`modal-empty-${index}`} style={styles.modalSlotEmpty}>
                        <MaterialCommunityIcons name="card-plus-outline" size={24} color={C_LIGHT} />
                        <Text style={styles.modalSlotEmptyText}>Slot Vazio</Text>
                      </View>
                    );
                  }

                  const isSelected = selectedCard?.id === card.id;
                  const canSelect = !activeCard && isCurrentTurn;

                  return (
                    <TouchableOpacity
                      key={card.id}
                      style={[
                        styles.modalSlotCard,
                        isSelected && styles.modalSlotCardSelected,
                        !canSelect && styles.modalSlotCardDisabled,
                      ]}
                      onPress={() => canSelect && setSelectedCard(card)}
                      activeOpacity={canSelect ? 0.7 : 1}
                      disabled={!canSelect}
                    >
                      <View style={styles.modalSlotCardHeader}>
                        <View style={[
                          styles.modalSlotIconContainer,
                          isSelected && styles.modalSlotIconContainerSelected
                        ]}>
                          {renderSlotIcon(card.icon, card.type, 20, isSelected ? '#FFF' : COLORS.primary)}
                        </View>
                        <View style={styles.modalSlotCardInfo}>
                          <Text style={styles.modalSlotCardTitle}>{card.title}</Text>
                          <Text style={styles.modalSlotCardUsage}>{card.usage}</Text>
                        </View>
                        {isSelected && (
                          <View style={styles.selectedBadge}>
                            <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.success} />
                          </View>
                        )}
                      </View>
                      <Text style={styles.modalSlotCardDesc}>{card.desc}</Text>
                      
                      {card.volatile && (
                        <View style={styles.modalVolatileBadge}>
                          <MaterialCommunityIcons name="swap-horizontal" size={10} color="#FFF" />
                          <Text style={styles.modalVolatileText}>Carta Volátil</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity
                  style={styles.cancelModalButton}
                  onPress={handleCloseModal}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelModalButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.useModalButton,
                    !selectedCard && styles.useModalButtonDisabled,
                  ]}
                  onPress={handleUseCard}
                  disabled={!selectedCard}
                  activeOpacity={selectedCard ? 0.7 : 1}
                >
                  <Text style={styles.useModalButtonText}>Usar carta</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }

  return (
    <View style={styles.container}>
      {/* ── Risk warning ─────────────────────────────────── */}
      {hasVolatileCard && (
        <View style={styles.riskBanner}>
          <MaterialCommunityIcons name="alert-circle-outline" size={13} color={C_DARK} />
          <Text style={styles.riskText}>
            Cuidado! Se perderes esta rodada, o rival fica com esta carta!
          </Text>
        </View>
      )}

      {/* ── Team label + slots ────────────────────────────── */}
      <View style={styles.row}>
        <Text style={styles.teamLabel}>TIME {team}</Text>

        <View style={styles.slotsRow}>
          {[0, 1].map((index) => {
            const card = safeCards[index];
            const isActive = !!card && activeCard?.id === card.id;

            // ── Slot vazio ───────────────────────────────────
            if (!card) {
              return (
                <View key={`empty-${index}`} style={[styles.slot, styles.slotEmpty]}>
                  <MaterialCommunityIcons name="card-plus-outline" size={22} color={C_LIGHT} />
                </View>
              );
            }

            // ── Slot ativo (pulsante) ────────────────────────
            if (isActive) {
              return (
                <ActiveSlot
                  key={card.id}
                  card={card}
                  onPress={() => isCurrentTurn && onCardPress(card)}
                />
              );
            }

            // ── Slot ocupado ─────────────────────────────────
            return (
              <TouchableOpacity
                key={card.id}
                style={[styles.slot, styles.slotOccupied]}
                onPress={() => isCurrentTurn && onCardPress(card)}
                activeOpacity={isCurrentTurn ? 0.7 : 1}
                disabled={!isCurrentTurn}
              >
                {renderSlotIcon(card.icon, card.type)}
                {card.volatile && (
                  <View style={styles.volatileBadge}>
                    <MaterialCommunityIcons name="swap-horizontal" size={9} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const SLOT_SIZE = 10;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8F8',
    borderTopWidth: 1.5,
    borderTopColor: C_LIGHT,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  riskBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFEBEB',
    borderWidth: 1,
    borderColor: C_LIGHT,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 8,
  },
  riskText: {
    fontSize: 10,
    color: C_DARK,
    fontWeight: '600',
    flex: 1,
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: C_MEDIUM,
    letterSpacing: 1.2,
  },
  slotsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  slot: {
    width: SLOT_SIZE,
    height: SLOT_SIZE,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  // ── Empty ──────────────────────────────────────────────────────────────────
  slotEmpty: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: C_LIGHT,
    backgroundColor: 'transparent',
  },
  // ── Occupied ──────────────────────────────────────────────────────────────
  slotOccupied: {
    backgroundColor: C_MEDIUM,
    shadowColor: C_DARK,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
  },
  // ── Active ────────────────────────────────────────────────────────────────
  slotActive: {
    backgroundColor: C_DARK,
    shadowColor: C_DARK,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 12,
  },
  slotInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  // ── Volatile badge ────────────────────────────────────────────────────────
  volatileBadge: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 8,
    padding: 2,
  },
  // ── Active label ──────────────────────────────────────────────────────────
  activeLabelWrap: {
    position: 'absolute',
    bottom: -9,
    backgroundColor: C_DARK,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  activeLabelText: {
    color: '#FFF',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  containerCompact: {
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
  slotsRowCompact: {
    flexDirection: 'row',
    gap: 4,
  },
  slotCompact: {
    width: 15,
    height: 15,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  volatileBadgeCompact: {
    top: 1,
    right: 1,
    padding: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 320,
    borderWidth: 2,
    borderColor: '#2A0808',
    borderBottomWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#2A0808',
    marginTop: 6,
  },
  modalSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: C_MEDIUM,
    letterSpacing: 1,
    marginTop: 2,
  },
  activeNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  activeNoticeText: {
    fontSize: 11,
    color: '#B91C1C',
    fontWeight: '600',
    flex: 1,
  },
  modalSlotsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  modalSlotEmpty: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: C_LIGHT,
    backgroundColor: COLORS.background,
  },
  modalSlotEmptyText: {
    fontSize: 14,
    color: C_LIGHT,
    fontWeight: '600',
  },
  modalSlotCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0D8D0',
    backgroundColor: '#FFF',
    position: 'relative',
  },
  modalSlotCardSelected: {
    borderColor: C_DARK,
    backgroundColor: '#FFF8F8',
  },
  modalSlotCardDisabled: {
    opacity: 0.6,
  },
  modalSlotCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  modalSlotIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#FFF8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSlotIconContainerSelected: {
    backgroundColor: C_DARK,
  },
  modalSlotCardInfo: {
    flex: 1,
  },
  modalSlotCardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2A0808',
  },
  modalSlotCardUsage: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  modalSlotCardDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    paddingLeft: 4,
  },
  selectedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  modalVolatileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: C_DARK,
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 8,
  },
  modalVolatileText: {
    fontSize: 8,
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  cancelModalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2A0808',
    backgroundColor: '#FFF',
    borderBottomWidth: 4,
    alignItems: 'center',
  },
  cancelModalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2A0808',
  },
  useModalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2A0808',
    backgroundColor: C_DARK,
    borderBottomWidth: 4,
    alignItems: 'center',
  },
  useModalButtonDisabled: {
    backgroundColor: '#E0E0E0',
    borderColor: '#999',
    borderBottomWidth: 2,
    opacity: 0.8,
  },
  useModalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
