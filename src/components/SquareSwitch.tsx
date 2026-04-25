import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../constants/theme';

interface SquareSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon?: React.ReactNode;
}

export function SquareSwitch({ label, value, onValueChange, icon }: SquareSwitchProps) {
  return (
    <TouchableOpacity
      style={[
        styles.squareSwitch,
        value ? styles.squareSwitchActive : styles.squareSwitchInactive,
      ]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.7}
    >
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Text style={[styles.squareSwitchLabel, !value && styles.textUnselected]}>
        {label}
      </Text>
      {value && (
        <View style={styles.checkIcon}>
          <Ionicons name="checkmark" size={14} color="#FFF" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  squareSwitch: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    position: 'relative',
  },
  squareSwitchActive: {
    borderColor: COLORS.dark,
    borderBottomWidth: 4,
  },
  squareSwitchInactive: {
    borderColor: '#E0D8D0',
    borderBottomWidth: 2,
    opacity: 0.6,
  },
  squareSwitchLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  textUnselected: {
    color: '#999',
  },
  iconWrapper: {
    marginBottom: 4,
  },
  checkIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
