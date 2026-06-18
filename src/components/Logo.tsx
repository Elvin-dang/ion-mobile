/**
 * Logo — branded "I-ON" wordmark with a MaterialCommunityIcons hexagon mark.
 * Uses theme colors only. Used on login, appbar, settings header.
 */

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { fontFamily } from '../theme/theme';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

const SIZES = {
  sm: { mark: 22, text: 18, gap: 6 },
  md: { mark: 30, text: 24, gap: 8 },
  lg: { mark: 48, text: 38, gap: 12 },
};

export default function Logo({ size = 'md', showTagline = false }: LogoProps) {
  const theme = useTheme();
  const s = SIZES[size];

  return (
    <View style={styles.wrap}>
      <View style={[styles.row, { gap: s.gap }]}>
        <MaterialCommunityIcons name="hexagon-multiple" size={s.mark} color={theme.colors.primary} />
        <View style={styles.textRow}>
          <Text
            style={{
              fontFamily: fontFamily.extrabold,
              fontSize: s.text,
              color: theme.colors.onSurface,
              letterSpacing: 0.5,
            }}
          >
            I-ON
          </Text>
        </View>
      </View>
      {showTagline ? (
        <Text
          style={{
            fontFamily: fontFamily.semibold,
            fontSize: 11,
            letterSpacing: 1.5,
            marginTop: 4,
            color: theme.colors.onSurfaceVariant,
          }}
        >
          MAINTENANCE MANAGEMENT
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  textRow: { flexDirection: 'row', alignItems: 'baseline' },
});
