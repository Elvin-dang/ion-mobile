import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { palette, radius, spacing, withAlpha } from '../theme/theme';
import { ElevatedCard, IconName, PressableScale } from './ui';

const CATEGORY_COLOR: Record<string, string> = {
  workOrder: palette.info,
  request: palette.accentViolet,
  pending: palette.accentAmber,
  completed: palette.secondary,
  closed: palette.successDeep,
  inProgress: palette.info,
};

export interface KpiCardProps {
  label: string;
  count: number;
  icon: string;
  category: string;
  onPress?: () => void;
}

export default function KpiCard({ label, count, icon, category, onPress }: KpiCardProps) {
  const theme = useTheme();
  const color = CATEGORY_COLOR[category] ?? theme.colors.primary;

  return (
    <PressableScale onPress={onPress} tintColor={color} style={{ width: '100%' }}>
      <ElevatedCard level="raised" style={{ borderRadius: radius.xl }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: radius.md,
            backgroundColor: withAlpha(color, 0.15),
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.sm,
          }}
        >
          <MaterialCommunityIcons name={icon as IconName} size={22} color={color} />
        </View>
        <Text style={{ fontSize: 28, fontWeight: '800', color: theme.colors.onSurface }}>
          {count}
        </Text>
        <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: 2 }}>
          {label}
        </Text>
      </ElevatedCard>
    </PressableScale>
  );
}
