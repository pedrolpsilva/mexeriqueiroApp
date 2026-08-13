import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Platform } from 'react-native';

const apiKey = Platform.select({
  ios: process.env.EXPO_PUBLIC_FIREBASE_IOS_API_KEY || process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  android: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_API_KEY || process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  default: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
});

const appId = Platform.select({
  ios: process.env.EXPO_PUBLIC_FIREBASE_IOS_APP_ID || process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  android: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID || process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  default: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
});

const firebaseConfig = {
  apiKey,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth with React Native persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
