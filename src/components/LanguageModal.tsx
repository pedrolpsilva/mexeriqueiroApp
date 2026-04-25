import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomModal } from './CustomModal';

import { COLORS } from '../constants/theme';

const LANGUAGES = [
  { id: 'BR', label: 'Português', flag: '🇧🇷' },
  { id: 'US', label: 'English', flag: '🇺🇸' },
  { id: 'ES', label: 'Español', flag: '🇪🇸' },
];

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  currentLanguage: string;
  onSelect: (lang: any) => void;
}

export function LanguageModal({ visible, onClose, currentLanguage, onSelect }: LanguageModalProps) {
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      title="Idioma"
      description="Selecione o idioma das palavras e da interface do jogo."
      buttonText="FECHAR"
      icon={<Ionicons name="language" size={40} color={COLORS.primary} />}
    >
      <View style={styles.languageGrid}>
        {LANGUAGES.map((lang) => {
          const isSelected = currentLanguage === lang.id;
          return (
            <TouchableOpacity
              key={lang.id}
              style={[styles.langCard, isSelected ? styles.langCardActive : styles.langCardInactive]}
              onPress={() => {
                onSelect(lang.id);
                onClose();
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text style={[styles.label, !isSelected && styles.textUnselected]}>{lang.label}</Text>
              {isSelected && (
                <View style={styles.checkIcon}>
                  <Ionicons name="checkmark" size={14} color="#FFF" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  languageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  langCard: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    position: 'relative',
  },
  langCardActive: {
    borderColor: COLORS.dark,
    borderBottomWidth: 4,
  },
  langCardInactive: {
    borderColor: '#E0D8D0',
    borderBottomWidth: 2,
    opacity: 0.6,
  },
  flag: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  textUnselected: {
    color: '#999',
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
