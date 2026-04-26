import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { SpecialCard } from '../store/useAppStore';

// ─── Colors ─────────────────────────────────────────────────────────────────
const C_LIGHT  = '#eabba2'; // Laranja Light  – borda vazia
const C_MEDIUM = '#e3884d'; // Laranja Claro  – slot ocupado
const C_DARK   = '#eb5b27'; // Laranja Padrão – slot ativo / pulse

// ─── Types ───────────────────────────────────────────────────────────────────
interface InventoryProps {
  team: 'A' | 'B';
  cards: SpecialCard[];
  activeCard?: SpecialCard | null;
  onCardPress: (card: SpecialCard) => void;
  isCurrentTurn: boolean;
  hasVolatileCard?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function renderSlotIcon(icon: string, type: string, size = 28, color = '#FFF') {
  if (type === 'FontAwesome5') {
    return <FontAwesome5 name={icon as any} size={size} color={color} />;
  }
  return <MaterialCommunityIcons name={icon as any} size={size + 2} color={color} />;
}

// ─── Active Slot with pulse animation ────────────────────────────────────────
function ActiveSlot({ card, onPress }: { card: SpecialCard; onPress: () => void }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.12, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.slot, styles.slotActive, { transform: [{ scale: pulseAnim }] }]}>
      <TouchableOpacity style={styles.slotInner} onPress={onPress} activeOpacity={0.8}>
        {renderSlotIcon(card.icon, card.type)}
        {card.volatile && (
          <View style={styles.volatileBadge}>
            <MaterialCommunityIcons name="swap-horizontal" size={9} color="#FFF" />
          </View>
        )}
        <View style={styles.activeLabelWrap}>
          <Text style={styles.activeLabelText}>ATIVO</Text>
        </View>
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
}: InventoryProps) {
  const safeCards = Array.isArray(cards) ? cards : [];

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
const SLOT_SIZE = 58;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF9F5',
    borderTopWidth: 1.5,
    borderTopColor: C_LIGHT,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  riskBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF0E8',
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
    borderWidth: 2,
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
});
