import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomModal } from '../components/CustomModal';
import { Header } from '../components/Header';
import { LanguageModal } from '../components/LanguageModal';
import { COLORS } from '../constants/theme';
import { syncDatabase } from '../services/DatabaseService';
import { useAppStore } from '../store/useAppStore';



export default function Settings() {
  const router = useRouter();
  const { language, words, syncStatus, lastSync, setLanguage } = useAppStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ title: '', desc: '', icon: '' });
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const totalWords = Object.values(words).flat().length;

  const handleSync = async () => {
    const result = await syncDatabase();
    if (result.success) {
      setModalData({
        title: 'Sincronizado!',
        desc: `O banco de dados foi atualizado com sucesso. Foram carregadas ${result.count} palavras válidas.`,
        icon: 'checkmark-circle'
      });
    } else {
      setModalData({
        title: 'Erro na Sincronização',
        desc: 'Não foi possível conectar ao Google Sheets. Verifique sua conexão com a internet.',
        icon: 'cloud-offline'
      });
    }
    setModalVisible(true);
  };

  const getStatusText = () => {
    if (syncStatus === 'syncing') return 'Sincronizando...';
    if (syncStatus === 'synced') return 'Sincronizado';
    if (syncStatus === 'error') return 'Erro na conexão';
    return 'Pendente';
  };

  const getStatusColor = () => {
    if (syncStatus === 'syncing') return '#2196F3';
    if (syncStatus === 'synced') return '#4CAF50';
    if (syncStatus === 'error') return '#F44336';
    return '#999';
  };

  return (
    <View style={styles.container}>
      <Header
        title="Configurações"
        onLanguagePress={() => setShowLanguageModal(true)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="database" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Banco de Dados</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Status</Text>
              <View style={styles.statusBadge}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                <Text style={[styles.statusText, { color: getStatusColor() }]}>{getStatusText()}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Palavras</Text>
              <Text style={styles.statValue}>{totalWords}</Text>
            </View>
          </View>

          {lastSync && (
            <Text style={styles.lastSyncText}>
              Última atualização: {new Date(lastSync).toLocaleString('pt-BR')}
            </Text>
          )}

          <TouchableOpacity
            style={[styles.syncButton, syncStatus === 'syncing' && styles.syncButtonDisabled]}
            onPress={handleSync}
            disabled={syncStatus === 'syncing'}
          >
            {syncStatus === 'syncing' ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <MaterialCommunityIcons name="refresh" size={20} color="#FFF" />
                <Text style={styles.syncButtonText}>Atualizar Cartas</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={COLORS.dark} />
          <Text style={styles.infoText}>
            O app ignora automaticamente palavras compostas (com hífen) seguindo as regras oficiais.
          </Text>
        </View>
      </ScrollView>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalData.title}
        description={modalData.desc}
        icon={<Ionicons name={modalData.icon as any} size={48} color={COLORS.primary} />}
      />

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
  },
  sectionBlock: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0D8D0',
    borderBottomWidth: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0D8D0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textDark,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    backgroundColor: '#E0D8D0',
    marginHorizontal: 10,
  },
  lastSyncText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  syncButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    borderBottomWidth: 4,
    borderColor: COLORS.dark,
  },
  syncButtonDisabled: {
    opacity: 0.7,
  },
  syncButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.support,
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 12,
    alignItems: 'center',
    opacity: 0.8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
