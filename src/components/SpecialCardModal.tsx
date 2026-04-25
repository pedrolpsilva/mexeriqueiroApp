import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomModal } from './CustomModal';
import { COLORS } from '../constants/theme';
import { SpecialCard } from '../store/useAppStore';

interface SpecialCardModalProps {
  visible: boolean;
  onClose: () => void;
  specialCard: SpecialCard | null;
}

export function SpecialCardModal({ visible, onClose, specialCard }: SpecialCardModalProps) {
  const renderCardIcon = (icon: string, type: string, size = 32, color = COLORS.primary) => {
    if (type === 'FontAwesome5') return <FontAwesome5 name={icon as any} size={size} color={color} />;
    return <MaterialCommunityIcons name={icon as any} size={size + 4} color={color} />;
  };

  if (!specialCard) return null;

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      title="CARTA ESPECIAL!"
      buttonText="FECHAR"
      icon={<MaterialCommunityIcons name="cards-playing" size={48} color={COLORS.primary} />}
    >
      <View style={styles.specialCard}>
        <View style={styles.specialCardCornerTop}>
          {renderCardIcon(specialCard.icon, specialCard.type, 24)}
        </View>
        <Text style={styles.specialTitle}>{specialCard.title}</Text>
        <View style={styles.specialArtContainer}>
          {renderCardIcon(specialCard.icon, specialCard.type, 80, COLORS.primary)}
        </View>
        <Text style={styles.specialDesc}>{specialCard.desc}</Text>
        <View style={styles.specialFooter}>
          <View style={styles.progInfo}>
            <Text style={styles.progLabel}>Status:</Text>
            <Text style={[styles.progValue, { color: COLORS.primary }]}>{specialCard.status}</Text>
          </View>
          <View style={styles.progInfo}>
            <Text style={styles.progLabel}>Pontos:</Text>
            <Text style={styles.progValue}>{specialCard.points} pts</Text>
          </View>
          <View style={styles.progInfo}>
            <Text style={styles.progLabel}>Raridade:</Text>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={10}
                  color={i < specialCard.rarity ? '#FFD700' : '#E0E0E0'}
                />
              ))}
            </View>
          </View>
          <View style={styles.progInfo}>
            <Text style={styles.progLabel}>Efeito:</Text>
            <Text style={styles.progValue}>{specialCard.progression}</Text>
          </View>
          <View style={styles.progInfo}>
            <Text style={styles.progLabel}>Uso:</Text>
            <Text style={styles.progValue}>{specialCard.usage}</Text>
          </View>
        </View>
        <View style={[styles.specialCardCornerBottom, { transform: [{ rotate: '180deg' }] }]}>
          {renderCardIcon(specialCard.icon, specialCard.type, 24)}
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  specialCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
  },
  specialCardCornerTop: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  specialCardCornerBottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  specialTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.dark,
    marginBottom: 10,
  },
  specialArtContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.support,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  specialDesc: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    color: COLORS.textDark,
  },
  specialFooter: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10,
  },
  progInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 4,
  },
  progLabel: {
    fontSize: 12,
    color: '#999',
  },
  progValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
});
