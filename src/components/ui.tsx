/**
 * ui.tsx — Shared I-ON design-system primitives implementing the
 * Branding_Styleguide.md "Mobile UI Component Patterns" exactly.
 * NO hardcoded hex — everything flows from theme.ts / mobilePatterns.
 */

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { useThemeMode } from '../contexts/ThemeContext';
import {
  animations,
  elevations,
  elevationsDark,
  gradients,
  iconColorMap,
  pressFeedback,
  radius,
  spacing,
  statusColors,
  withAlpha,
} from '../theme/theme';

export type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];
export type IconCategory = keyof typeof iconColorMap;

/* -------------------------------------------------------------------------- */
/* Elevation hook                                                             */
/* -------------------------------------------------------------------------- */

export function useElevation(level: keyof typeof elevations = 'card') {
  const { isDark } = useThemeMode();
  return (isDark ? elevationsDark : elevations)[level];
}

/* -------------------------------------------------------------------------- */
/* ElevatedCard — content cards are NEVER flat (min Level 1)                  */
/* -------------------------------------------------------------------------- */

export function ElevatedCard({
  children,
  level = 'card',
  style,
  noPadding,
}: {
  children: React.ReactNode;
  level?: 'card' | 'raised' | 'floating';
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
}) {
  const theme = useTheme();
  const elev = useElevation(level);
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderRadius: radius.lg,
          padding: noPadding ? 0 : spacing.md,
        },
        elev,
        style,
      ]}
    >
      {children}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* PressableScale — scale 0.97 + opacity 0.92 + tint overlay on press         */
/* -------------------------------------------------------------------------- */

export function PressableScale({
  children,
  onPress,
  onLongPress,
  style,
  tintColor,
  disabled,
  accessibilityLabel,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
  tintColor?: string;
  disabled?: boolean;
  accessibilityLabel?: string;
}) {
  const theme = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const overlay = useRef(new Animated.Value(0)).current;
  const tint = tintColor ?? theme.colors.primary;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: pressFeedback.scale,
      useNativeDriver: true,
      damping: pressFeedback.spring.damping,
      stiffness: pressFeedback.spring.stiffness,
      mass: pressFeedback.spring.mass,
    }).start();
    Animated.timing(overlay, {
      toValue: 1,
      duration: pressFeedback.durationMs,
      useNativeDriver: true,
    }).start();
  };
  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: pressFeedback.spring.damping,
      stiffness: pressFeedback.spring.stiffness,
      mass: pressFeedback.spring.mass,
    }).start();
    Animated.timing(overlay, {
      toValue: 0,
      duration: pressFeedback.durationMs,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onLongPress={disabled ? undefined : onLongPress}
      onPressIn={disabled ? undefined : pressIn}
      onPressOut={disabled ? undefined : pressOut}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
    >
      <Animated.View
        style={[
          { transform: [{ scale }], opacity: disabled ? 0.5 : 1 },
          style,
        ]}
      >
        {children}
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: withAlpha(tint, pressFeedback.tintAlpha),
              borderRadius: radius.lg,
              opacity: overlay,
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

/* -------------------------------------------------------------------------- */
/* AnimatedEntrance — fade-in + slide-up with stagger                         */
/* -------------------------------------------------------------------------- */

export function AnimatedEntrance({
  children,
  index = 0,
  style,
}: {
  children: React.ReactNode;
  index?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const delay = Math.min(index, animations.staggerMaxIndex) * animations.staggerDelayMs;
    Animated.timing(progress, {
      toValue: 1,
      duration: animations.cardEntry.durationMs,
      delay,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [index, progress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [animations.cardEntry.translateYFrom, 0],
  });

  return (
    <Animated.View style={[{ opacity: progress, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}

/* -------------------------------------------------------------------------- */
/* IconContainer — 40x40 radius 12, tinted bg by category                     */
/* -------------------------------------------------------------------------- */

export function IconContainer({
  icon,
  category,
  color,
  size = 40,
  iconSize = 22,
}: {
  icon: IconName;
  category?: IconCategory;
  color?: string;
  size?: number;
  iconSize?: number;
}) {
  const resolved = color
    ? { color, bg: withAlpha(color, 0.15) }
    : iconColorMap[category ?? 'navigation'];
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius.md,
        backgroundColor: resolved.bg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MaterialCommunityIcons name={icon} size={iconSize} color={resolved.color} />
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* MetaPill — pill badge for metadata (NOT plain icon+text)                   */
/* -------------------------------------------------------------------------- */

export function MetaPill({
  label,
  color,
  icon,
}: {
  label: string;
  color: string;
  icon?: IconName;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: withAlpha(color, 0.14),
        borderRadius: radius.pill,
        paddingVertical: 4,
        paddingHorizontal: 10,
        gap: 4,
        alignSelf: 'flex-start',
      }}
    >
      {icon ? <MaterialCommunityIcons name={icon} size={14} color={color} /> : null}
      <Text style={{ color, fontSize: 13, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* StatusChip — work-order / request status color map                        */
/* -------------------------------------------------------------------------- */

export type StatusKey = keyof typeof statusColors;

/** Map any human status label to a status color key. */
export function statusKeyFromLabel(label: string): StatusKey {
  const l = label.toLowerCase();
  if (l.includes('draft')) return 'draft';
  if (l.includes('pending') && l.includes('unassign')) return 'approved';
  if (l.includes('unassigned')) return 'approved';
  if (l.includes('await') || l.includes('pending') || l.includes('tenant request'))
    return 'pending';
  if (l.includes('approved') || l.includes('accepted')) return 'approved';
  if (l.includes('assigned')) return 'assigned';
  if (l.includes('progress') || l.includes('started')) return 'inProgress';
  if (l.includes('review')) return 'inReview';
  if (l.includes('verified')) return 'verified';
  if (l.includes('closed') || l.includes('completed')) return 'completed';
  if (l.includes('declined') || l.includes('reject')) return 'declined';
  if (l.includes('cancel')) return 'cancelled';
  if (l.includes('overdue')) return 'overdue';
  if (l.includes('active')) return 'verified';
  if (l.includes('inactive')) return 'cancelled';
  return 'draft';
}

export function StatusChip({
  label,
  statusKey,
}: {
  label: string;
  statusKey?: StatusKey;
}) {
  const { isDark } = useThemeMode();
  const key = statusKey ?? statusKeyFromLabel(label);
  const sc = statusColors[key];
  return (
    <View
      style={{
        backgroundColor: isDark ? sc.tintDark : sc.tint,
        borderRadius: radius.pill,
        paddingVertical: 4,
        paddingHorizontal: 12,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          color: isDark ? sc.dark : sc.main,
          fontSize: 13,
          fontWeight: '700',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* SectionHeader — accent leading bar + title + optional "See all"            */
/* -------------------------------------------------------------------------- */

export function SectionHeader({
  title,
  accentColor,
  icon,
  onSeeAll,
  style,
}: {
  title: string;
  accentColor?: string;
  icon?: IconName;
  onSeeAll?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const accent = accentColor ?? theme.colors.primary;
  return (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
        style,
      ]}
    >
      {icon ? (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={accent}
          style={{ marginRight: 8 }}
        />
      ) : (
        <View
          style={{
            width: 4,
            height: 18,
            borderRadius: 2,
            backgroundColor: accent,
            marginRight: 10,
          }}
        />
      )}
      <Text style={{ fontSize: 17, fontWeight: '600', color: theme.colors.onSurface, flex: 1 }}>
        {title}
      </Text>
      {onSeeAll ? (
        <Text
          onPress={onSeeAll}
          style={{ color: theme.colors.primary, fontSize: 14, fontWeight: '600' }}
        >
          See all
        </Text>
      ) : null}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* EmptyState                                                                 */
/* -------------------------------------------------------------------------- */

export function EmptyState({
  icon = 'inbox-outline',
  message,
  success,
}: {
  icon?: IconName;
  message: string;
  success?: boolean;
}) {
  const theme = useTheme();
  const color = success ? theme.colors.secondary : theme.colors.onSurfaceVariant;
  return (
    <View style={{ alignItems: 'center', paddingVertical: spacing.xxxl }}>
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: withAlpha(color, 0.12),
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: spacing.md,
        }}
      >
        <MaterialCommunityIcons name={icon} size={36} color={color} />
      </View>
      <Text
        style={{
          color: theme.colors.onSurfaceVariant,
          fontSize: 15,
          textAlign: 'center',
          paddingHorizontal: spacing.xl,
        }}
      >
        {message}
      </Text>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Skeleton — shimmer placeholder                                             */
/* -------------------------------------------------------------------------- */

export function SkeletonList({ count = 5 }: { count?: number }) {
  const theme = useTheme();
  const shimmer = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: animations.skeletonShimmerMs / 2,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: animations.skeletonShimmerMs / 2,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);
  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.9] });
  return (
    <View style={{ padding: spacing.md, gap: spacing.sm }}>
      {Array.from({ length: count }).map((_, i) => (
        <Animated.View
          key={i}
          style={{
            opacity,
            height: 84,
            borderRadius: radius.lg,
            backgroundColor: theme.colors.surfaceVariant,
          }}
        />
      ))}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* StickyActionBar — full-width actions outside scroll, safe-area aware       */
/* -------------------------------------------------------------------------- */

export function StickyActionBar({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: spacing.sm,
        padding: spacing.md,
        paddingBottom: spacing.lg,
        backgroundColor: theme.colors.surface,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: theme.colors.outline,
      }}
    >
      {children}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* ImageOverlayCard — bottom gradient over a colored image placeholder        */
/* -------------------------------------------------------------------------- */

export function ImageOverlayCard({
  caption,
  height = 160,
  baseColor,
  icon = 'image-outline',
  overlayChip,
  onPress,
}: {
  caption: string;
  height?: number;
  baseColor: string;
  icon?: IconName;
  overlayChip?: string;
  onPress?: () => void;
}) {
  const content = (
    <View
      style={{
        height,
        borderRadius: radius.lg,
        overflow: 'hidden',
        backgroundColor: withAlpha(baseColor, 0.22),
        justifyContent: 'flex-end',
      }}
    >
      <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
        <MaterialCommunityIcons name={icon} size={48} color={withAlpha(baseColor, 0.7)} />
      </View>
      {overlayChip ? (
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: gradients.glass.backgroundColor,
            borderColor: gradients.glass.borderColor,
            borderWidth: 1,
            borderRadius: radius.md,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>{overlayChip}</Text>
        </View>
      ) : null}
      <LinearGradient
        colors={gradients.imageOverlay.colors}
        start={gradients.imageOverlay.start}
        end={gradients.imageOverlay.end}
        style={{ height: height * gradients.imageOverlay.coverage, justifyContent: 'flex-end', padding: spacing.sm }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700' }}>{caption}</Text>
      </LinearGradient>
    </View>
  );
  if (onPress) {
    return <PressableScale onPress={onPress}>{content}</PressableScale>;
  }
  return content;
}

/* -------------------------------------------------------------------------- */
/* DetailRow — label/value row for read-only sections                         */
/* -------------------------------------------------------------------------- */

export function DetailRow({ label, value }: { label: string; value: string }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.xs,
        gap: spacing.md,
      }}
    >
      <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, flex: 1 }}>{label}</Text>
      <Text
        style={{ color: theme.colors.onSurface, fontSize: 14, fontWeight: '600', flex: 1, textAlign: 'right' }}
      >
        {value}
      </Text>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* ScreenLoader                                                               */
/* -------------------------------------------------------------------------- */

export function ScreenLoader() {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  );
}
