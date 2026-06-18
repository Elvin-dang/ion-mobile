/**
 * Spare Part Detail (read-only) — WBS 4.2.4.
 * Header with Name + timestamp + Status badge.
 * General Info (Code, Location, Asset Type, Sub-system, System, Brand, Model, Serial).
 * Stock Info (Quantity, Store Room, Department, Origin, Purchase Date, Year, Usage Date, Warranty).
 * Stock counters (Total / Available / On-Hold).
 * Stock history timeline with timestamps.
 */

import { useLocalSearchParams } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../src/components/AppHeader';
import {
  AnimatedEntrance,
  DetailRow,
  ElevatedCard,
  EmptyState,
  IconContainer,
  SectionHeader,
  StatusChip,
} from '../../../src/components/ui';
import { getSparePart, stockHistory } from '../../../src/data/mockData';
import { palette, radius, spacing, withAlpha } from '../../../src/theme/theme';

export default function SparePartDetailScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 720);
  const { id } = useLocalSearchParams<{ id: string }>();
  const part = getSparePart(String(id));

  if (!part) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
        <AppHeader title="Spare Part" showBack showNotifications={false} />
        <EmptyState icon="package-variant-closed" message="No spare parts found." />
      </SafeAreaView>
    );
  }

  const availZero = part.available === 0;
  const counters = [
    { label: 'Total', value: part.total, color: palette.accentCyan },
    { label: 'Available', value: part.available, color: availZero ? palette.error : palette.success },
    { label: 'On-Hold', value: part.onHold, color: palette.accentAmber },
  ];
  const history = stockHistory.slice(0, 10);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title="Spare Part" showBack showNotifications={false} />
      <ScrollView
        contentContainerStyle={{
          padding: spacing.md,
          gap: spacing.md,
          paddingBottom: spacing.xxxl,
          width: maxWidth,
          alignSelf: 'center',
        }}
      >
        {/* Header */}
        <AnimatedEntrance index={0}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm }}>
            <IconContainer icon="package-variant-closed" category="inventory" size={48} iconSize={26} />
            <View style={{ flex: 1 }}>
              <Text variant="titleLarge" style={{ fontWeight: '700', color: theme.colors.onSurface }}>
                {part.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: 4 }}>
                <StatusChip label={part.status} />
                {part.createdAt ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <MaterialCommunityIcons name="clock-outline" size={14} color={theme.colors.onSurfaceVariant} />
                    <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>
                      {part.createdAt}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </AnimatedEntrance>

        {/* Stock counters */}
        <AnimatedEntrance index={1}>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            {counters.map((c) => (
              <ElevatedCard key={c.label} style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: '700', color: c.color }}>{c.value}</Text>
                <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: 2 }}>{c.label}</Text>
              </ElevatedCard>
            ))}
          </View>
        </AnimatedEntrance>

        {/* General Info */}
        <AnimatedEntrance index={2}>
          <ElevatedCard>
            <SectionHeader title="General Info" icon="information-outline" accentColor={palette.primary} />
            <DetailRow label="Spare Part Code" value={part.code} />
            <DetailRow label="Location" value={part.location ?? '—'} />
            <DetailRow label="Asset Type" value={part.assetType ?? '—'} />
            <DetailRow label="Sub-system" value={part.subSystem ?? '—'} />
            <DetailRow label="Asset System" value={part.system} />
            <DetailRow label="Brand" value={part.brand ?? '—'} />
            <DetailRow label="Model" value={part.model ?? '—'} />
            <DetailRow label="Serial" value={part.serial ?? '—'} />
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Stock Info */}
        <AnimatedEntrance index={3}>
          <ElevatedCard>
            <SectionHeader title="Stock Info" icon="package-variant" accentColor={palette.accentCyan} />
            <DetailRow label="Quantity" value={String(part.total)} />
            <DetailRow label="Store Room" value={part.storeRoom ?? '—'} />
            <DetailRow label="Department" value={part.department ?? '—'} />
            <DetailRow label="Origin" value={part.origin ?? '—'} />
            <DetailRow label="Purchase Date" value={part.purchaseDate ?? '—'} />
            <DetailRow label="Year of Manufacture" value={part.yearOfManufacture ?? '—'} />
            <DetailRow label="Usage Date" value={part.usageDate ?? '—'} />
            <DetailRow label="Warranty Expiry Date" value={part.warrantyExpiryDate ?? '—'} />
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Supporting Info */}
        {part.specification ? (
          <AnimatedEntrance index={4}>
            <ElevatedCard>
              <SectionHeader title="Supporting Info" icon="file-document-outline" accentColor={palette.accentAmber} />
              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>Specification</Text>
              <Text style={{ fontSize: 14, color: theme.colors.onSurface, lineHeight: 20 }}>
                {part.specification}
              </Text>
            </ElevatedCard>
          </AnimatedEntrance>
        ) : null}

        {/* Stock history */}
        <AnimatedEntrance index={5}>
          <ElevatedCard>
            <SectionHeader title="Stock History" icon="history" accentColor={palette.secondary} />
            {history.length === 0 ? (
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, paddingVertical: spacing.xs }}>
                No stock history.
              </Text>
            ) : (
              history.map((h, i) => {
                const negative = h.change.trim().startsWith('-');
                return (
                  <View
                    key={h.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      gap: spacing.sm,
                      paddingVertical: spacing.sm,
                      borderTopWidth: i === 0 ? 0 : 1,
                      borderTopColor: theme.colors.outlineVariant,
                    }}
                  >
                    <View
                      style={{
                        minWidth: 48,
                        alignItems: 'center',
                        paddingVertical: 4,
                        borderRadius: radius.sm,
                        backgroundColor: withAlpha(negative ? palette.error : palette.success, 0.14),
                      }}
                    >
                      <Text style={{ fontSize: 15, fontWeight: '700', color: negative ? palette.error : palette.success }}>
                        {h.change}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, color: theme.colors.onSurface }}>{h.reason}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        <MaterialCommunityIcons name="clock-outline" size={12} color={theme.colors.onSurfaceVariant} />
                        <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>{h.date}</Text>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </ElevatedCard>
        </AnimatedEntrance>
      </ScrollView>
    </SafeAreaView>
  );
}
