/**
 * SettingsRow — §10.9 settings item: colored icon container + title + chevron/switch.
 */

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Text, useTheme } from 'react-native-paper';
import { spacing } from '../theme/theme';
import { IconCategory, IconContainer, IconName, PressableScale } from './ui';

export interface SettingsRowProps {
  icon: IconName;
  category?: IconCategory;
  iconColor?: string;
  title: string;
  subtitle?: string;
  danger?: boolean;
  onPress?: () => void;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
  rightText?: string;
  isLast?: boolean;
}

export default function SettingsRow({
  icon,
  category = 'navigation',
  iconColor,
  title,
  subtitle,
  danger,
  onPress,
  toggle,
  toggleValue,
  onToggle,
  rightText,
  isLast,
}: SettingsRowProps) {
  const theme = useTheme();
  const titleColor = danger ? theme.colors.error : theme.colors.onSurface;

  const body = (
    <View
      style={[
        styles.row,
        !isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.colors.outline },
      ]}
    >
      <IconContainer icon={icon} category={danger ? 'danger' : category} color={iconColor} />
      <View style={styles.textWrap}>
        <Text style={{ fontSize: 16, color: titleColor, fontWeight: '500' }}>{title}</Text>
        {subtitle ? (
          <Text style={{ fontSize: 14, color: theme.colors.onSurfaceVariant, marginTop: 2 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {toggle ? (
        <Switch value={!!toggleValue} onValueChange={onToggle} color={theme.colors.primary} />
      ) : rightText ? (
        <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14 }}>{rightText}</Text>
      ) : danger ? null : (
        <MaterialCommunityIcons name="chevron-right" size={22} color={theme.colors.onSurfaceVariant} />
      )}
    </View>
  );

  if (onPress && !toggle) {
    return <PressableScale onPress={onPress}>{body}</PressableScale>;
  }
  return body;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  textWrap: { flex: 1 },
});
