import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import { loginAnonymously, loginWithGoogle, loginWithApple } from '../src/services/AuthService';
import { useAuthStore } from '../src/store/useAuthStore';

export default function LoginScreen() {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = React.useState<string | null>(null);

  const handleAnonLogin = async () => {
    setLoadingAction('anon');
    const { user, error } = await loginAnonymously();
    setLoadingAction(null);
    if (error) {
      alert('Erro ao entrar como convidado: ' + error);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingAction('google');
    const { user, error } = await loginWithGoogle();
    setLoadingAction(null);
    if (error) {
      alert('Erro no Google Login: ' + error);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleAppleLogin = async () => {
    setLoadingAction('apple');
    const { user, error } = await loginWithApple();
    setLoadingAction(null);
    if (error) {
      alert('Erro no Apple Login: ' + error);
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mexeriqueiro</Text>
      <Text style={styles.subtitle}>Faça login para jogar</Text>

      <View style={styles.buttonsContainer}>
        {Platform.OS === 'ios' && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={8}
            style={styles.appleButton}
            onPress={handleAppleLogin}
          />
        )}

        <TouchableOpacity 
          style={[styles.button, styles.googleButton]} 
          onPress={handleGoogleLogin}
          disabled={!!loadingAction}
        >
          {loadingAction === 'google' ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <FontAwesome name="google" size={20} color="#000" style={styles.icon} />
              <Text style={styles.googleButtonText}>Entrar com Google</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.anonButton]} 
          onPress={handleAnonLogin}
          disabled={!!loadingAction}
        >
          {loadingAction === 'anon' ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <FontAwesome5 name="user-secret" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.anonButtonText}>Entrar como Convidado</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7373A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 50,
    opacity: 0.9,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 350,
    gap: 15,
  },
  appleButton: {
    width: '100%',
    height: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  googleButton: {
    backgroundColor: '#FFF',
  },
  googleButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  anonButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  anonButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginRight: 10,
  },
});
