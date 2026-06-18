/**
 * Spare Part List — WBS 4.2.4 / 6.3.4 / 7.3.5.
 * Search (name/code), Status filter (All/Active/Inactive), pull-to-refresh,
 * SparePartCard rows. Read-only.
 */

import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl, useWindowDimensions, View } from 'react-native';
import { Menu, Searchbar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../src/components/AppHeader';
import { SparePartCard } from '../../src/components/cards';
import {
  AnimatedEntrance,
  EmptyState,
  IconContainer,
  PressableScale,
} from '../../src/components/ui';
import { useAuth } from '../../src/contexts/AuthContext';
import { spareParts } from '../../src/data/mockData';
import { spacing } from '../../src/theme/theme';

const STATUSES = ['All', 'Active', 'Inactive'] as const;

export default function SparePartsScreen() {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const isTech = currentUser?.role === 'TECH';
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 720);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<(typeof STATUSES)[number]>('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return spareParts.filter((p) => {
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
      const matchSt = status === 'All' || p.status === status;
      return matchQ && matchSt;
    });
  }, [query, status]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title="Spare Parts" showBack showNotifications={false} />
      <View style={{ width: maxWidth, alignSelf: 'center', flex: 1 }}>
        <View style={{ flexDirection: 'row', padding: spacing.md, gap: spacing.xs, alignItems: 'center' }}>
          <Searchbar
            placeholder="Search by name or code"
            value={query}
            onChangeText={setQuery}
            style={{ flex: 1, backgroundColor: theme.colors.surfaceVariant }}
            inputStyle={{ fontSize: 15 }}
          />
          <Menu
            visible={menuOpen}
            onDismiss={() => setMenuOpen(false)}
            anchor={
              <PressableScale onPress={() => setMenuOpen(true)} accessibilityLabel="Filter by status">
                <IconContainer icon="filter-variant" category="navigation" />
              </PressableScale>
            }
          >
            {STATUSES.map((s) => (
              <Menu.Item
                key={s}
                title={s}
                trailingIcon={status === s ? 'check' : undefined}
                onPress={() => {
                  setStatus(s);
                  setMenuOpen(false);
                }}
              />
            ))}
          </Menu>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ padding: spacing.md, paddingTop: 0, gap: spacing.sm, paddingBottom: spacing.xxxl }}
          renderItem={({ item, index }) => (
            <AnimatedEntrance index={index}>
              <SparePartCard part={item} />
            </AnimatedEntrance>
          )}
          ListEmptyComponent={
            <EmptyState message={isTech ? 'No spare parts found within your scope.' : 'No spare parts found.'} />
          }
        />
      </View>
    </SafeAreaView>
  );
}
