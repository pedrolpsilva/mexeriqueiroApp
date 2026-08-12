import { auth } from './firebase';
import { 
  signInAnonymously, 
  signOut,
  OAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    // webClientId deve ser configurado no Google Cloud / Firebase Console (OAuth Web Client ID)
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
  });
};

export const loginAnonymously = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const loginWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    
    if (userInfo.data && userInfo.data.idToken) {
      const googleCredential = GoogleAuthProvider.credential(userInfo.data.idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      return { user: userCredential.user, error: null };
    }
    throw new Error('Google token não encontrado');
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const loginWithApple = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (credential.identityToken) {
      const provider = new OAuthProvider('apple.com');
      const authCredential = provider.credential({
        idToken: credential.identityToken,
      });
      const userCredential = await signInWithCredential(auth, authCredential);
      return { user: userCredential.user, error: null };
    }
    throw new Error('Apple token não encontrado');
  } catch (error: any) {
    if (error.code === 'ERR_REQUEST_CANCELED') {
      return { user: null, error: 'Cancelado pelo usuário' };
    }
    return { user: null, error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
