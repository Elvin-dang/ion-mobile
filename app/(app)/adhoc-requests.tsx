/**
 * My Work Order — WBS 7.2.2 (TECH Work Request List).
 * Lists TECH's own ad-hoc requests with search, filter, and correct card layout.
 */

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Button, Divider, FAB, Menu, Portal, Searchbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../src/components/AppHeader';
import {
  AnimatedEntrance,
  ElevatedCard,
  EmptyState,
  IconContainer,
  MetaPill,
  PressableScale,
  SkeletonList,
  StatusChip,
} from '../../src/components/ui';
import { requests } from '../../src/data/mockData';
import { palette, spacing } from '../../src/theme/theme';

const STATUSES = ['All', 'Requested', 'Pending', 'Rejected', 'Draft', 'Cancelled'];

export default function AdhocRequestsScreen() {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState('All');
  const [stMenu, setStMenu] = useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const adhoc = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter((r) => {
      const matchType = r.type === 'Ad-hoc WO';
      const matchQ = !q || r.id.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
      const matchSt = status === 'All' || r.status === status;
      return matchType && matchQ && matchSt;
    });
  }, [query, status]);

  const hasActiveFilter = status !== 'All';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title="My Work Order" showBack={false} />

      <View style={{ flexDirection: 'row', padding: spacing.md, gap: spacing.xs, alignItems: 'center' }}>
        <Searchbar
          placeholder="Search by ID or description"
          value={query}
          onChangeText={setQuery}
          style={{ flex: 1, backgroundColor: theme.colors.surfaceVariant }}
          inputStyle={{ fontSize: 15 }}
        />
        <PressableScale onPress={() => setFilterOpen(true)}>
          <IconContainer
            icon="filter-variant"
            category={hasActiveFilter ? 'notifications' : 'navigation'}
          />
        </PressableScale>
      </View>

      {loading ? (
        <SkeletonList />
      ) : (
        <FlatList
          data={adhoc}
          keyExtractor={(i) => i.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ padding: spacing.md, paddingTop: 0, gap: spacing.sm, paddingBottom: 100 }}
          renderItem={({ item, index }) => (
            <AnimatedEntrance index={index}>
              <PressableScale onPress={() => router.push(`/request/${item.id}`)} tintColor={palette.accentCoral}>
                <ElevatedCard>
                  <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                    <IconContainer icon="clipboard-text-outline" category="workOrder" />
                    <View style={{ flex: 1 }}>
                      {/* WO ID + timestamp */}
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <Text style={{ fontSize: 14, fontWeight: '700', color: theme.colors.onSurface }}>
                            {item.id}
                          </Text>
                          <Text style={{ fontSize: 11, color: theme.colors.onSurfaceVariant }}>
                            {item.createdDate}
                          </Text>
                        </View>
                        <StatusChip label={item.status} />
                      </View>
                      {/* Asset code bold */}
                      <Text style={{ fontSize: 14, fontWeight: '700', color: theme.colors.onSurface, marginTop: 2 }}>
                        {item.asset || item.assetType || '—'}
                      </Text>
                      {/* WO Type */}
                      <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>{item.type}</Text>
                      {/* Location + Due date */}
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                        <MetaPill
                          label={`${item.floor ?? ''} · ${item.area ?? item.building}`}
                          color={palette.accentCyan}
                          icon="map-marker-outline"
                        />
                        <MetaPill
                          label={`Due ${item.createdDate}`}
                          color={palette.accentAmber}
                          icon="calendar-clock"
                        />
                      </View>
                    </View>
                  </View>
                </ElevatedCard>
              </PressableScale>
            </AnimatedEntrance>
          )}
          ListEmptyComponent={
            <View style={{ paddingTop: spacing.xxxl }}>
              <EmptyState icon="clipboard-text-outline" message="No work requests found." />
            </View>
          }
        />
      )}

      <FAB
        icon="plus"
        label="New Request"
        style={{ position: 'absolute', right: 16, bottom: 24 }}
        onPress={() => router.push('/create-work-order')}
      />

      <Portal>
        {filterOpen ? (
          <View
            style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, top: 0,
              backgroundColor: theme.colors.backdrop, justifyContent: 'flex-end',
            }}
          >
            <PressableScale onPress={() => setFilterOpen(false)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard level="floating" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: theme.colors.onSurface, marginBottom: spacing.md }}>
                Filter Work Requests
              </Text>
              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>Status</Text>
              <Menu visible={stMenu} onDismiss={() => setStMenu(false)} anchor={
                <Button mode="outlined" onPress={() => setStMenu(true)} icon="chevron-down" contentStyle={{ flexDirection: 'row-reverse' }}>
                  {status}
                </Button>
              }>
                {STATUSES.map((s) => (
                  <Menu.Item key={s} title={s} onPress={() => { setStatus(s); setStMenu(false); }} />
                ))}
              </Menu>
              <Divider style={{ marginVertical: spacing.md }} />
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button mode="outlined" style={{ flex: 1 }} onPress={() => { setStatus('All'); }}>Reset</Button>
                <Button mode="contained" style={{ flex: 1 }} onPress={() => setFilterOpen(false)}>Apply</Button>
              </View>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>
    </SafeAreaView>
  );
}
