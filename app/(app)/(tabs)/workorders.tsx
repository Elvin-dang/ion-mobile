import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Button, Divider, FAB, Menu, Portal, Searchbar, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../src/components/AppHeader';
import { RequestCard, WorkOrderCard } from '../../../src/components/cards';
import {
  AnimatedEntrance,
  ElevatedCard,
  EmptyState,
  IconContainer,
  PressableScale,
  SkeletonList,
} from '../../../src/components/ui';
import { useAuth } from '../../../src/contexts/AuthContext';
import { buildings, requests, workOrders } from '../../../src/data/mockData';
import { spacing } from '../../../src/theme/theme';

const STATUSES = ['All', 'Pending', 'Pending - Unassigned', 'Assigned', 'Started', 'Completed', 'Verified', 'Closed', 'Cancelled'];
const WO_TYPES = ['All', 'Maintenance Scheduling', 'Ad-hoc Work', 'Service Request'];

export default function WorkOrdersScreen() {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const role = currentUser?.role ?? 'BM';
  const isSup = role === 'SUP';
  const canCreate = role === 'SUP' || role === 'TECH';

  const [tab, setTab] = useState<'wo' | 'req'>('wo');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [building, setBuilding] = useState('All Buildings');
  const [status, setStatus] = useState('All');
  const [woType, setWoType] = useState('All');
  const [bMenu, setBMenu] = useState(false);
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

  const filteredWO = useMemo(() => {
    return workOrders.filter((w) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || w.id.toLowerCase().includes(q) || w.assetCode.toLowerCase().includes(q);
      const matchB = building === 'All Buildings' || w.building === building;
      const matchSt = status === 'All' || w.status === status;
      const matchTy = woType === 'All' || w.type === woType;
      return matchQ && matchB && matchSt && matchTy;
    });
  }, [query, building, status, woType]);

  const filteredReq = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter((r) => !q || r.id.toLowerCase().includes(q));
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title={isSup ? 'WO & Requests' : 'Work Orders'} />

      {isSup ? (
        <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.sm }}>
          <SegmentedButtons
            value={tab}
            onValueChange={(v) => setTab(v as 'wo' | 'req')}
            buttons={[
              { value: 'wo', label: 'Work Orders', icon: 'clipboard-text-outline' },
              { value: 'req', label: 'Requests', icon: 'file-document-outline' },
            ]}
          />
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', padding: spacing.md, gap: spacing.xs, alignItems: 'center' }}>
        <Searchbar
          placeholder="Search by ID or asset name"
          value={query}
          onChangeText={setQuery}
          style={{ flex: 1, backgroundColor: theme.colors.surfaceVariant }}
          inputStyle={{ fontSize: 15 }}
        />
        {tab === 'wo' ? (
          <PressableScale onPress={() => setFilterOpen(true)}>
            <IconContainer icon="filter-variant" category="navigation" />
          </PressableScale>
        ) : null}
      </View>

      {loading ? (
        <SkeletonList />
      ) : tab === 'wo' ? (
        <FlatList
          data={filteredWO}
          keyExtractor={(i) => i.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ padding: spacing.md, paddingTop: 0, gap: spacing.sm, paddingBottom: 100 }}
          renderItem={({ item, index }) => (
            <AnimatedEntrance index={index}>
              <WorkOrderCard wo={item} />
            </AnimatedEntrance>
          )}
          ListEmptyComponent={
            <EmptyState
              message={
                role === 'TECH'
                  ? 'No work orders assigned to you.'
                  : 'No work orders found for the selected filters.'
              }
            />
          }
        />
      ) : (
        <FlatList
          data={filteredReq}
          keyExtractor={(i) => i.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ padding: spacing.md, paddingTop: 0, gap: spacing.sm, paddingBottom: 100 }}
          renderItem={({ item, index }) => (
            <AnimatedEntrance index={index}>
              <RequestCard req={item} />
            </AnimatedEntrance>
          )}
          ListEmptyComponent={<EmptyState message="No requests found." />}
        />
      )}

      {canCreate ? (
        <FAB
          icon="plus"
          label="Ad-hoc WO"
          style={{ position: 'absolute', right: 16, bottom: 24 }}
          onPress={() => router.push('/create-work-order')}
        />
      ) : null}

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
                Filter Work Orders
              </Text>

              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>Building</Text>
              <Menu visible={bMenu} onDismiss={() => setBMenu(false)} anchor={
                <Button mode="outlined" onPress={() => setBMenu(true)} icon="chevron-down" contentStyle={{ flexDirection: 'row-reverse' }}>{building}</Button>
              }>
                <Menu.Item title="All Buildings" onPress={() => { setBuilding('All Buildings'); setBMenu(false); }} />
                {buildings.map((b) => <Menu.Item key={b.id} title={b.name} onPress={() => { setBuilding(b.name); setBMenu(false); }} />)}
              </Menu>

              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: spacing.sm, marginBottom: 4 }}>Status</Text>
              <Menu visible={stMenu} onDismiss={() => setStMenu(false)} anchor={
                <Button mode="outlined" onPress={() => setStMenu(true)} icon="chevron-down" contentStyle={{ flexDirection: 'row-reverse' }}>{status}</Button>
              }>
                {STATUSES.map((s) => <Menu.Item key={s} title={s} onPress={() => { setStatus(s); setStMenu(false); }} />)}
              </Menu>

              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: spacing.sm, marginBottom: 4 }}>WO Type</Text>
              <Menu visible={tyMenu} onDismiss={() => setTyMenu(false)} anchor={
                <Button mode="outlined" onPress={() => setTyMenu(true)} icon="chevron-down" contentStyle={{ flexDirection: 'row-reverse' }}>{woType}</Button>
              }>
                {WO_TYPES.map((s) => <Menu.Item key={s} title={s} onPress={() => { setWoType(s); setTyMenu(false); }} />)}
              </Menu>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, gap: 6 }}>
                <MaterialCommunityIcons name="calendar-range" size={20} color={theme.colors.onSurfaceVariant} />
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 13 }}>Date Range: Last 30 days</Text>
              </View>

              <Divider style={{ marginVertical: spacing.md }} />
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button mode="outlined" style={{ flex: 1 }} onPress={() => { setBuilding('All Buildings'); setStatus('All'); setWoType('All'); }}>Reset</Button>
                <Button mode="contained" style={{ flex: 1 }} onPress={() => setFilterOpen(false)}>Apply</Button>
              </View>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>
    </SafeAreaView>
  );
}
