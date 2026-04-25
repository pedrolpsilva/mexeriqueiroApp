import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';

interface FooterProps {
  buttonText?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
  buttonColor?: string;
  borderColor?: string;
}

export function Footer({ 
  buttonText, 
  onPress, 
  icon, 
  disabled, 
  children,
  buttonColor,
  borderColor
}: FooterProps) {
  return (
    <View style={styles.footer}>
      {children ? children : (
        <TouchableOpacity
          style={[
            styles.button, 
            buttonColor ? { backgroundColor: buttonColor } : null,
            borderColor ? { borderColor: borderColor } : null,
            disabled && styles.buttonDisabled
          ]}
          activeOpacity={0.8}
          onPress={onPress}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0D8D0',
    zIndex: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
    paddingVertical: 18,
    borderRadius: 16,
    borderBottomWidth: 6,
    borderColor: '#b94b30',
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: '#999',
    borderColor: '#777',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },
  iconContainer: {
    marginLeft: 8,
  },
});
