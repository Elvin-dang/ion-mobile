import { router } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Button, Divider, Menu, Portal, Searchbar, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../src/components/AppHeader';
import { AssetCard } from '../../../src/components/cards';
import {
  AnimatedEntrance,
  ElevatedCard,
  EmptyState,
  IconContainer,
  PressableScale,
  SectionHeader,
  SkeletonList,
} from '../../../src/components/ui';
import { useAuth } from '../../../src/contexts/AuthContext';
import { assets, buildings } from '../../../src/data/mockData';
import { palette, spacing, withAlpha } from '../../../src/theme/theme';

const SYSTEMS = ['All Systems', 'HVAC', 'Fire Safety', 'Vertical Transport', 'Electrical', 'Plumbing'];
const STATUSES = ['All', 'Active', 'Inactive'];

export default function AssetsScreen() {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const role = currentUser?.role ?? 'BM';
  const isTech = role === 'TECH';
  const isBM = role === 'BM';

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [building, setBuilding] = useState('All Buildings');
  const [system, setSystem] = useState('All Systems');
  const [status, setStatus] = useState('All');
  const [bMenu, setBMenu] = useState(false);
  const [sMenu, setSMenu] = useState(false);
  const [stMenu, setStMenu] = useState(false);
  const [viewMode, setViewMode] = useState<'assets' | 'drawings'>('assets');

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || a.name.toLowerCase().includes(q) || a.code.toLowerCase().includes(q);
      const matchB = building === 'All Buildings' || a.building === building;
      const matchS = system === 'All Systems' || a.system === system;
      const matchSt = status === 'All' || a.status === status;
      return matchQ && matchB && matchS && matchSt;
    });
  }, [query, building, system, status]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title="Assets" />

      {/* BM: Asset List / Drawings toggle */}
      {isBM ? (
        <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.sm }}>
          <SegmentedButtons
            value={viewMode}
            onValueChange={(v) => setViewMode(v as 'assets' | 'drawings')}
            buttons={[
              { value: 'assets', label: 'Asset List', icon: 'format-list-bulleted' },
              { value: 'drawings', label: 'Drawings', icon: 'floor-plan' },
            ]}
          />
        </View>
      ) : null}

      {viewMode === 'drawings' && isBM ? (
        /* Drawings panel for BM */
        <View style={{ flex: 1, padding: spacing.md }}>
          <SectionHeader title="Building Drawings" icon="floor-plan" />
          {buildings.map((b) => (
            <PressableScale key={b.id} onPress={() => router.push('/asset-drawing')}>
              <ElevatedCard style={{ marginBottom: spacing.sm }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                  <IconContainer icon="office-building-outline" category="navigation" />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.onSurface }}>
                      {b.name}
                    </Text>
                    <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: 2 }}>
                      Tap to view floor drawings & asset tags
                    </Text>
                  </View>
                  <IconContainer icon="chevron-right" category="navigation" />
                </View>
              </ElevatedCard>
            </PressableScale>
          ))}
        </View>
      ) : (
        <>
          <View style={{ flexDirection: 'row', padding: spacing.md, paddingTop: spacing.sm, gap: spacing.xs, alignItems: 'center' }}>
            <Searchbar
              placeholder="Search by name or code"
              value={query}
              onChangeText={setQuery}
              style={{ flex: 1, backgroundColor: theme.colors.surfaceVariant }}
              inputStyle={{ fontSize: 15 }}
            />
            <PressableScale onPress={() => setFilterOpen(true)}>
              <IconContainer icon="filter-variant" category="navigation" />
            </PressableScale>
            <PressableScale onPress={() => router.push('/qr-scan')}>
              <IconContainer icon="qrcode-scan" color={palette.accentAmber} />
            </PressableScale>
          </View>

          {loading ? (
            <SkeletonList />
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={(i) => i.id}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              contentContainerStyle={{ padding: spacing.md, paddingTop: 0, gap: spacing.sm, paddingBottom: spacing.xxxl }}
              renderItem={({ item, index }) => (
                <AnimatedEntrance index={index}>
                  <AssetCard asset={item} />
                </AnimatedEntrance>
              )}
              ListEmptyComponent={
                <EmptyState message={isTech ? 'No assets found within your scope.' : 'No assets found.'} />
              }
            />
          )}
        </>
      )}

      <Portal>
        {filterOpen ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              backgroundColor: theme.colors.backdrop,
              justifyContent: 'flex-end',
            }}
          >
            <PressableScale onPress={() => setFilterOpen(false)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard level="floating" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: theme.colors.onSurface, marginBottom: spacing.md }}>
                Filter Assets
              </Text>

              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>Building</Text>
              <Menu
                visible={bMenu}
                onDismiss={() => setBMenu(false)}
                anchor={
                  <Button mode="outlined" onPress={() => setBMenu(true)} icon="chevron-down" contentStyle={{ flexDirection: 'row-reverse' }}>
                    {building}
                  </Button>
                }
              >
                <Menu.Item title="All Buildings" onPress={() => { setBuilding('All Buildings'); setBMenu(false); }} />
                {buildings.map((b) => (
                  <Menu.Item key={b.id} title={b.name} onPress={() => { setBuilding(b.name); setBMenu(false); }} />
                ))}
              </Menu>

              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: spacing.sm, marginBottom: 4 }}>Asset System</Text>
              <Menu
                visible={sMenu}
                onDismiss={() => setSMenu(false)}
                anchor={
                  <Button mode="outlined" onPress={() => setSMenu(true)} icon="chevron-down" contentStyle={{ flexDirection: 'row-reverse' }}>
                    {system}
                  </Button>
                }
              >
                {SYSTEMS.map((s) => (
                  <Menu.Item key={s} title={s} onPress={() => { setSystem(s); setSMenu(false); }} />
                ))}
              </Menu>

              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: spacing.sm, marginBottom: 4 }}>Status</Text>
              <Menu
                visible={stMenu}
                onDismiss={() => setStMenu(false)}
                anchor={
                  <Button mode="outlined" onPress={() => setStMenu(true)} icon="chevron-down" contentStyle={{ flexDirection: 'row-reverse' }}>
                    {status}
                  </Button>
                }
              >
                {STATUSES.map((s) => (
                  <Menu.Item key={s} title={s} onPress={() => { setStatus(s); setStMenu(false); }} />
                ))}
              </Menu>

              <Divider style={{ marginVertical: spacing.md }} />
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button
                  mode="outlined"
                  style={{ flex: 1 }}
                  onPress={() => {
                    setBuilding('All Buildings');
                    setSystem('All Systems');
                    setStatus('All');
                  }}
                >
                  Reset
                </Button>
                <Button mode="contained" style={{ flex: 1 }} onPress={() => setFilterOpen(false)}>
                  Apply
                </Button>
              </View>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>
    </SafeAreaView>
  );
}
