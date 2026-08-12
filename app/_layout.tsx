import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { useAuthStore } from '@/src/store/useAuthStore';
import { subscribeToAuthChanges, configureGoogleSignIn } from '@/src/services/AuthService';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  
  const setUser = useAuthStore(state => state.setUser);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Auth Subscription
  useEffect(() => {
    // Inicializa o Google Sign-In config
    configureGoogleSignIn();

    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      setAuthInitialized(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loaded && authInitialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, authInitialized]);

  if (!loaded || !authInitialized) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();
  
  const { user } = useAuthStore();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';

    if (!user && inAuthGroup) {
      // Redireciona para o login se tentar acessar (tabs) sem usuário
      router.replace('/login');
    } else if (user && segments[0] === 'login') {
      // Redireciona para (tabs) se tentar acessar login logado
      router.replace('/(tabs)');
    }
  }, [user, segments]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
