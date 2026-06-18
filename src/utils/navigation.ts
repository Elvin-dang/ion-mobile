import { router } from 'expo-router';

/**
 * Safe back navigation — falls back to the dashboard if there is no
 * history to go back to (e.g. the user opened the screen via a direct URL).
 */
export function safeBack(fallback: string = '/(app)/(tabs)/dashboard') {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallback as any);
  }
}
