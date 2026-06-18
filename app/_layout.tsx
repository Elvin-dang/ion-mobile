import 'react-native-gesture-handler';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import MaterialCommunityIconsFont from '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/contexts/AuthContext';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import { SnackbarProvider } from '../src/contexts/SnackbarContext';
import { ThemeModeProvider, useThemeMode } from '../src/contexts/ThemeContext';
import { palette } from '../src/theme/theme';

function ThemedStatusBar() {
  const { isDark } = useThemeMode();
  return <StatusBar style={isDark ? 'light' : 'dark'} />;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': PlusJakartaSans_400Regular,
    'PlusJakartaSans-Medium': PlusJakartaSans_500Medium,
    'PlusJakartaSans-SemiBold': PlusJakartaSans_600SemiBold,
    'PlusJakartaSans-Bold': PlusJakartaSans_700Bold,
    'PlusJakartaSans-ExtraBold': PlusJakartaSans_800ExtraBold,
    MaterialCommunityIcons: MaterialCommunityIconsFont,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: palette.backgroundLight }} />;
  }

  return (
    <SafeAreaProvider>
      <ThemeModeProvider>
        <AuthProvider>
          <LanguageProvider>
            <SnackbarProvider>
              <ThemedStatusBar />
              <Slot />
            </SnackbarProvider>
          </LanguageProvider>
        </AuthProvider>
      </ThemeModeProvider>
    </SafeAreaProvider>
  );
}
