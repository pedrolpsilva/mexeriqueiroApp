import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { COLORS } from '../constants/theme';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  showLanguageSelector?: boolean;
  onLanguagePress?: () => void;
  rightElement?: React.ReactNode;
}

export function Header({
  title,
  showBackButton = true,
  onBackPress,
  showLanguageSelector = true,
  onLanguagePress,
  rightElement,
}: HeaderProps) {
  const router = useRouter();
  const { language } = useAppStore();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const getLanguageFlag = () => {
    if (language === 'BR') return '🇧🇷';
    if (language === 'US') return '🇺🇸';
    return '🇪🇸';
  };

  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={handleBack}
          style={styles.headerIcon}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
      ) : (
        <View style={styles.headerIcon} />
      )}

      {title ? (
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      <View style={styles.headerRight}>
        {onLanguagePress && (
          <TouchableOpacity
            style={styles.languageBtn}
            onPress={onLanguagePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.flagText}>{getLanguageFlag()}</Text>
          </TouchableOpacity>
        )}
        {rightElement}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerIcon: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 40,
    gap: 12,
  },
  languageBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.support,
  },
  flagText: {
    fontSize: 20,
  },
});
