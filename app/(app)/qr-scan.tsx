/**
 * Scan Asset QR Code — WBS 7.3.3 (MOCK — no real camera).
 * Search bar at top + styled scanner viewport with corner brackets +
 * animated scan line, instruction text, and a Simulate Scan button.
 */

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { safeBack } from '../../src/utils/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { Button, IconButton, Searchbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../src/components/AppHeader';
import { useSnackbar } from '../../src/contexts/SnackbarContext';
import { assets } from '../../src/data/mockData';
import { palette, radius, spacing, withAlpha } from '../../src/theme/theme';

const VIEWPORT = 260;
const BRACKET = 36;
const BRACKET_W = 4;

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const color = palette.primaryDark;
  const base = { position: 'absolute' as const, width: BRACKET, height: BRACKET };
  const edges: Record<string, object> = {
    tl: {
      top: 0,
      left: 0,
      borderTopWidth: BRACKET_W,
      borderLeftWidth: BRACKET_W,
      borderTopLeftRadius: radius.md,
    },
    tr: {
      top: 0,
      right: 0,
      borderTopWidth: BRACKET_W,
      borderRightWidth: BRACKET_W,
      borderTopRightRadius: radius.md,
    },
    bl: {
      bottom: 0,
      left: 0,
      borderBottomWidth: BRACKET_W,
      borderLeftWidth: BRACKET_W,
      borderBottomLeftRadius: radius.md,
    },
    br: {
      bottom: 0,
      right: 0,
      borderBottomWidth: BRACKET_W,
      borderRightWidth: BRACKET_W,
      borderBottomRightRadius: radius.md,
    },
  };
  return <View style={[base, { borderColor: color }, edges[pos]]} />;
}

export default function QrScanScreen() {
  const theme = useTheme();
  const { showToast } = useSnackbar();
  const [flash, setFlash] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scan = useRef(new Animated.Value(0)).current;

  const simulateScan = () => {
    showToast('QR code scanned — navigating to asset.', 'info');
    router.push('/asset/a1');
  };

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    const found = assets.find(
      (a) => a.code.toLowerCase() === q || a.code.toLowerCase().includes(q)
    );
    if (found) {
      router.push(`/asset/${found.id}`);
    } else {
      showToast('Asset not found. Please check the code and try again.', 'error');
    }
  };

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scan, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scan, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scan]);

  const translateY = scan.interpolate({
    inputRange: [0, 1],
    outputRange: [BRACKET / 2, VIEWPORT - BRACKET / 2],
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={['top']}
    >
      <AppHeader title="Asset" showBack showNotifications={false} />

      {/* Search bar */}
      <View style={{ padding: spacing.md, paddingBottom: spacing.sm }}>
        <Searchbar
          placeholder="Find by asset code"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          style={{ backgroundColor: theme.colors.surfaceVariant }}
          right={() => (
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={theme.colors.onSurfaceVariant}
              style={{ marginRight: spacing.sm }}
            />
          )}
        />
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.xl,
        }}
      >
        {/* Viewport */}
        <View
          style={{
            width: VIEWPORT,
            height: VIEWPORT,
            borderRadius: radius.lg,
            backgroundColor: withAlpha(palette.primary, 0.06),
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={120}
            color={withAlpha(palette.primary, 0.35)}
          />
          {/* Animated scan line */}
          <Animated.View
            style={{
              position: 'absolute',
              left: BRACKET / 2,
              right: BRACKET / 2,
              height: 2,
              backgroundColor: palette.primaryDark,
              transform: [{ translateY }],
              shadowColor: palette.primaryDark,
              shadowOpacity: 0.6,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 0 },
            }}
          />
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />
        </View>

        <Text
          style={{
            marginTop: spacing.xl,
            fontSize: 15,
            textAlign: 'center',
            color: theme.colors.onSurfaceVariant,
            paddingHorizontal: spacing.lg,
          }}
        >
          Scan QR Code of Asset
        </Text>

        {/* Flash toggle */}
        <View style={{ alignItems: 'center', marginTop: spacing.md }}>
          <IconButton
            mode="contained"
            icon={flash ? 'flash' : 'flash-off'}
            accessibilityLabel="Toggle flash"
            selected={flash}
            onPress={() => setFlash((v) => !v)}
          />
          <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>
            {flash ? 'Flash on' : 'Flash off'}
          </Text>
        </View>

        <Button
          mode="contained"
          icon="qrcode-scan"
          onPress={simulateScan}
          contentStyle={{ height: 52 }}
          style={{ marginTop: spacing.lg, alignSelf: 'stretch' }}
        >
          Simulate Scan
        </Button>
        <Button
          mode="text"
          onPress={() => safeBack()}
          style={{ marginTop: spacing.xs, alignSelf: 'stretch' }}
        >
          Cancel
        </Button>
      </View>
    </SafeAreaView>
  );
}
