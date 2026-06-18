import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Button, Divider, Menu, Portal, Searchbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../src/components/AppHeader';
import { RequestCard } from '../../../src/components/cards';
import {
  AnimatedEntrance,
  ElevatedCard,
  EmptyState,
  IconContainer,
  PressableScale,
  SkeletonList,
} from '../../../src/components/ui';
import { requests } from '../../../src/data/mockData';
import { spacing } from '../../../src/theme/theme';

const REQUEST_STATUSES = [
  'All',
  'Tenant Request',
  'Pending',
  'Service Request Accepted',
  'Approval Rejected',
  'Ad-hoc Declined',
  'Cancelled',
];
const REQUEST_TYPES = ['All', 'Tenant Request', 'Ad-hoc WO', 'Service Request'];

export default function RequestsScreen() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState('All');
  const [reqType, setReqType] = useState('All');
  const [stMenu, setStMenu] = useState(false);
  const [tyMenu, setTyMenu] = useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter((r) => {
      const matchQ = !q || r.id.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
      const matchSt = status === 'All' || r.status === status;
      const matchTy = reqType === 'All' || r.type === reqType;
      return matchQ && matchSt && matchTy;
    });
  }, [query, status, reqType]);

  const hasActiveFilters = status !== 'All' || reqType !== 'All';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title="Requests" />
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
            category={hasActiveFilters ? 'notifications' : 'navigation'}
          />
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
              <RequestCard req={item} />
            </AnimatedEntrance>
          )}
          ListEmptyComponent={<EmptyState message="No requests found." />}
        />
      )}

      <Portal>
        {filterOpen ? (
          <View
            style={{
              position: 'absolute',
              left: 0, right: 0, bottom: 0, top: 0,
              backgroundColor: theme.colors.backdrop,
              justifyContent: 'flex-end',
            }}
          >
            <PressableScale onPress={() => setFilterOpen(false)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard level="floating" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: theme.colors.onSurface, marginBottom: spacing.md }}>
                Filter Requests
              </Text>

              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>Status</Text>
              <Menu visible={stMenu} onDismiss={() => setStMenu(false)} anchor={
                <Button mode="outlined" onPress={() => setStMenu(true)} icon="chevron-down" contentStyle={{ flexDirection: 'row-reverse' }}>{status}</Button>
              }>
                {REQUEST_STATUSES.map((s) => (
                  <Menu.Item key={s} title={s} onPress={() => { setStatus(s); setStMenu(false); }} />
                ))}
              </Menu>

              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: spacing.sm, marginBottom: 4 }}>Type</Text>
              <Menu visible={tyMenu} onDismiss={() => setTyMenu(false)} anchor={
                <Button mode="outlined" onPress={() => setTyMenu(true)} icon="chevron-down" contentStyle={{ flexDirection: 'row-reverse' }}>{reqType}</Button>
              }>
                {REQUEST_TYPES.map((s) => (
                  <Menu.Item key={s} title={s} onPress={() => { setReqType(s); setTyMenu(false); }} />
                ))}
              </Menu>

              <Divider style={{ marginVertical: spacing.md }} />
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button mode="outlined" style={{ flex: 1 }} onPress={() => { setStatus('All'); setReqType('All'); }}>Reset</Button>
                <Button mode="contained" style={{ flex: 1 }} onPress={() => setFilterOpen(false)}>Apply</Button>
              </View>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>
    </SafeAreaView>
  );
}
