/**
 * View Asset Tags on Drawing (read-only) — WBS 4.2.3 / 7.3.4.
 * Building selector + mock floor-plan with tappable asset tag pins; tapping a
 * pin opens a bottom-sheet popup with a [View Asset Detail] action. Read-only.
 */

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Button, Divider, Menu, Portal, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../src/components/AppHeader';
import {
  DetailRow,
  ElevatedCard,
  EmptyState,
  IconContainer,
  PressableScale,
  SectionHeader,
  StatusChip,
} from '../../src/components/ui';
import { assets, buildings } from '../../src/data/mockData';
import { palette, radius, spacing, statusColors, withAlpha } from '../../src/theme/theme';

// Mock saved pin coordinates (fractions of the drawing area) keyed by asset id.
const PIN_COORDS: Record<string, { x: number; y: number }> = {
  a1: { x: 0.2, y: 0.25 },
  a2: { x: 0.7, y: 0.3 },
  a3: { x: 0.35, y: 0.6 },
  a4: { x: 0.78, y: 0.7 },
  a5: { x: 0.5, y: 0.45 },
  a6: { x: 0.15, y: 0.78 },
};

export default function AssetDrawingScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 720);
  const drawingW = maxWidth - spacing.md * 2 - spacing.md * 2; // minus screen + card padding
  const drawingH = 360;

  const [building, setBuilding] = useState(buildings[0].name);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const buildingAssets = useMemo(
    () => assets.filter((a) => a.building === building && PIN_COORDS[a.id]),
    [building]
  );
  const selected = selectedId ? assets.find((a) => a.id === selectedId) : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title="Asset Drawing" showBack showNotifications={false} />

      <View style={{ width: maxWidth, alignSelf: 'center', flex: 1 }}>
        {/* Building selector */}
        <View style={{ padding: spacing.md, paddingBottom: spacing.xs }}>
          <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>Building</Text>
          <Menu
            visible={menuOpen}
            onDismiss={() => setMenuOpen(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setMenuOpen(true)}
                icon="chevron-down"
                contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                style={{ justifyContent: 'flex-start' }}
              >
                {building}
              </Button>
            }
          >
            {buildings.map((b) => (
              <Menu.Item
                key={b.id}
                title={b.name}
                onPress={() => {
                  setBuilding(b.name);
                  setSelectedId(null);
                  setMenuOpen(false);
                }}
              />
            ))}
          </Menu>
        </View>

        {/* Drawing */}
        <View style={{ padding: spacing.md, paddingTop: spacing.xs }}>
          <ElevatedCard>
            <SectionHeader title="Floor Plan" icon="floor-plan" accentColor={palette.accentCyan} />
            {buildingAssets.length === 0 ? (
              <EmptyState icon="map-marker-off-outline" message="No drawing uploaded for this building. Upload via the web portal." />
            ) : (
              <View
                style={{
                  width: drawingW,
                  height: drawingH,
                  borderRadius: radius.md,
                  backgroundColor: theme.colors.surfaceVariant,
                  overflow: 'hidden',
                }}
              >
                <GridBackground width={drawingW} height={drawingH} color={theme.colors.outline} />
                <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }]}>
                  <MaterialCommunityIcons
                    name="floor-plan"
                    size={96}
                    color={withAlpha(theme.colors.onSurfaceVariant, 0.18)}
                  />
                </View>
                {buildingAssets.map((a) => {
                  const c = PIN_COORDS[a.id];
                  return (
                    <View
                      key={a.id}
                      style={{
                        position: 'absolute',
                        left: c.x * drawingW - 18,
                        top: c.y * drawingH - 36,
                      }}
                    >
                      <PressableScale onPress={() => setSelectedId(a.id)} accessibilityLabel={`Tag ${a.code}`}>
                        <View style={{ alignItems: 'center', padding: 6 }}>
                          <MaterialCommunityIcons
                            name="map-marker"
                            size={36}
                            color={a.status === 'Active' ? statusColors.verified.main : statusColors.cancelled.main}
                          />
                        </View>
                      </PressableScale>
                    </View>
                  );
                })}
              </View>
            )}
            <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12, marginTop: spacing.sm, textAlign: 'center' }}>
              Tap a marker to view the asset tag.
            </Text>
          </ElevatedCard>
        </View>
      </View>

      {/* Tag popup */}
      <Portal>
        {selected ? (
          <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: theme.colors.backdrop, justifyContent: 'flex-end' }}>
            <PressableScale onPress={() => setSelectedId(null)} style={{ flex: 1 }} accessibilityLabel="Dismiss popup">
              <View style={{ flex: 1 }} />
            </PressableScale>
            <View style={{ width: '100%', maxWidth, alignSelf: 'center' }}>
              <ElevatedCard level="floating" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm }}>
                  <IconContainer icon="cube-outline" category="asset" />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 17, fontWeight: '700', color: theme.colors.onSurface }}>{selected.name}</Text>
                    <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant }}>{selected.code}</Text>
                  </View>
                  <StatusChip label={selected.status} />
                </View>
                <Divider style={{ marginBottom: spacing.xs }} />
                <DetailRow label="Asset Type" value={selected.type} />
                <DetailRow label="Asset System" value={selected.system} />
                <DetailRow label="Last Maintenance" value={selected.lastMaintenance} />
                <Button
                  mode="contained"
                  icon="open-in-new"
                  style={{ marginTop: spacing.md }}
                  onPress={() => {
                    const id = selected.id;
                    setSelectedId(null);
                    router.push(`/asset/${id}`);
                  }}
                >
                  View Asset Detail
                </Button>
              </ElevatedCard>
            </View>
          </View>
        ) : null}
      </Portal>
    </SafeAreaView>
  );
}

function GridBackground({ width, height, color }: { width: number; height: number; color: string }) {
  const step = 40;
  const cols = Math.floor(width / step);
  const rows = Math.floor(height / step);
  const lineColor = withAlpha(color, 0.4);
  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {Array.from({ length: cols }).map((_, i) => (
        <View
          key={`c${i}`}
          style={{ position: 'absolute', left: (i + 1) * step, top: 0, bottom: 0, width: 1, backgroundColor: lineColor }}
        />
      ))}
      {Array.from({ length: rows }).map((_, i) => (
        <View
          key={`r${i}`}
          style={{ position: 'absolute', top: (i + 1) * step, left: 0, right: 0, height: 1, backgroundColor: lineColor }}
        />
      ))}
    </View>
  );
}
