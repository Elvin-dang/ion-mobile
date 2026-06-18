import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { Menu, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../src/components/AppHeader';
import KpiCard from '../../../src/components/KpiCard';
import {
  AnimatedEntrance,
  ElevatedCard,
  EmptyState,
  IconContainer,
  MetaPill,
  PressableScale,
  SectionHeader,
  SkeletonList,
  StatusChip,
} from '../../../src/components/ui';
import { useAuth } from '../../../src/contexts/AuthContext';
import {
  bmKpis,
  buildings,
  recentActivity,
  supKpis,
  techKpis,
  workOrders,
} from '../../../src/data/mockData';
import { palette, spacing, withAlpha } from '../../../src/theme/theme';

export default function DashboardScreen() {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const role = currentUser?.role ?? 'BM';
  const isTech = role === 'TECH';

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [building, setBuilding] = useState(buildings[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chartFilter, setChartFilter] = useState<'week' | 'month' | 'year'>('month');

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }, []);

  const kpis = role === 'SUP' ? supKpis : role === 'TECH' ? techKpis : bmKpis;

  const kpiTarget = (cat: string) => {
    if (cat === 'request') return role === 'BM' ? '/requests' : '/workorders';
    return '/workorders';
  };

  const greeting = `Welcome, ${currentUser?.name?.split(' ')[0] ?? ''}`;

  // WO Needing Attention for TECH role
  const woNeedingAttention = workOrders.filter((w) =>
    ['Assigned', 'Started', 'Completion Rejected'].includes(w.status)
  ).slice(0, 5);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
        <AppHeader showLogo />
        <SkeletonList count={6} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader showLogo />
      {isTech ? (
        /* ---- TECH Dashboard ---- */
        <ScrollView
          contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxxl }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <AnimatedEntrance index={0}>
            <View style={{ marginBottom: spacing.xs }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: theme.colors.onSurfaceVariant, letterSpacing: 1 }}>
                MSP TECHNICIAN
              </Text>
              <Text style={{ fontSize: 22, fontWeight: '700', color: theme.colors.onSurface }}>
                {greeting}
              </Text>
              <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: spacing.md }}>
                {currentUser?.userGroup}
              </Text>
            </View>
          </AnimatedEntrance>

          {/* KPI Row — 3 cards */}
          <AnimatedEntrance index={1}>
            <View
              style={{
                flexDirection: 'row',
                gap: spacing.sm,
                marginBottom: spacing.lg,
              }}
            >
              {kpis.map((k) => (
                <View key={k.key} style={{ flex: 1 }}>
                  <KpiCard
                    label={k.label}
                    count={k.count}
                    icon={k.icon}
                    category={k.category}
                    onPress={() => router.push('/workorders')}
                  />
                </View>
              ))}
            </View>
          </AnimatedEntrance>

          {/* Chart Section */}
          <AnimatedEntrance index={2}>
            <ElevatedCard style={{ marginBottom: spacing.lg }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.onSurface }}>WO Trend</Text>
                <View style={{ flexDirection: 'row', gap: spacing.xs }}>
                  {(['week', 'month', 'year'] as const).map((f) => (
                    <TouchableOpacity
                      key={f}
                      onPress={() => setChartFilter(f)}
                      style={{
                        paddingHorizontal: spacing.sm,
                        paddingVertical: 4,
                        borderRadius: 999,
                        backgroundColor: chartFilter === f ? palette.primary : 'transparent',
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: '600', color: chartFilter === f ? '#fff' : theme.colors.onSurfaceVariant }}>
                        {f === 'week' ? 'Week' : f === 'month' ? 'Month' : 'Year'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              {/* Mock 3-line chart (Todo / Completed / Closed) */}
              {(() => {
                const todoVals =      [3, 5, 2, 7, 4, 6, 3];
                const completedVals = [1, 2, 2, 4, 3, 5, 2];
                const closedVals =    [1, 1, 1, 3, 2, 4, 2];
                const maxVal = 8;
                const H = 72;
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                const series = [
                  { vals: todoVals,      color: palette.accentAmber,  label: 'Todo' },
                  { vals: completedVals, color: palette.secondary,     label: 'Completed' },
                  { vals: closedVals,    color: palette.primary,       label: 'Closed' },
                ];
                return (
                  <>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: H + 4 }}>
                      {months.map((_, colIdx) => (
                        <View key={colIdx} style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
                          {series.map((s) => (
                            <View
                              key={s.label}
                              style={{
                                flex: 1,
                                height: Math.max(4, (s.vals[colIdx] / maxVal) * H),
                                backgroundColor: withAlpha(s.color, 0.8),
                                borderRadius: 3,
                              }}
                            />
                          ))}
                        </View>
                      ))}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                      {months.map((m) => (
                        <Text key={m} style={{ fontSize: 10, color: theme.colors.onSurfaceVariant, flex: 1, textAlign: 'center' }}>{m}</Text>
                      ))}
                    </View>
                    <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm }}>
                      {series.map((s) => (
                        <View key={s.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: s.color }} />
                          <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>{s.label}</Text>
                        </View>
                      ))}
                    </View>
                  </>
                );
              })()}
            </ElevatedCard>
          </AnimatedEntrance>

          {/* WO Needing Attention */}
          <AnimatedEntrance index={3}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xs }}>
              <SectionHeader title="WO Needing Attention" icon="alert-circle-outline" accentColor={palette.accentCoral} />
              <PressableScale onPress={() => router.push('/workorders')}>
                <MaterialCommunityIcons name="bookmark-outline" size={22} color={theme.colors.onSurfaceVariant} />
              </PressableScale>
            </View>
            {woNeedingAttention.length === 0 ? (
              <EmptyState message="No work orders need attention." />
            ) : (
              woNeedingAttention.map((wo, idx) => (
                <AnimatedEntrance key={wo.id} index={4 + idx}>
                  <PressableScale onPress={() => router.push(`/work-order/${wo.id}`)}>
                    <ElevatedCard style={{ marginBottom: spacing.sm }}>
                      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={{ fontSize: 13, fontWeight: '700', color: theme.colors.onSurface }}>
                              {wo.id}
                            </Text>
                            <Text style={{ fontSize: 11, color: theme.colors.onSurfaceVariant }}>
                              {wo.createdDate}
                            </Text>
                          </View>
                          <Text style={{ fontSize: 14, fontWeight: '700', color: theme.colors.onSurface, marginTop: 2 }}>
                            {wo.assetCode}
                          </Text>
                          <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>{wo.type}</Text>
                          {wo.type === 'Maintenance Scheduling' && wo.planId ? (
                            <Text style={{ fontSize: 12, color: palette.primary, marginTop: 1 }}>
                              {wo.round} · #{wo.planId} · {wo.planName}
                            </Text>
                          ) : null}
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                            <MaterialCommunityIcons name="map-marker-outline" size={14} color={theme.colors.onSurfaceVariant} />
                            <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>
                              {wo.floor} · {wo.area}
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                            <MaterialCommunityIcons
                              name={wo.overdue ? 'calendar-alert' : 'calendar-clock'}
                              size={14}
                              color={wo.overdue ? palette.accentCoral : theme.colors.onSurfaceVariant}
                            />
                            <Text style={{ fontSize: 12, color: wo.overdue ? palette.accentCoral : theme.colors.onSurfaceVariant }}>
                              Due {wo.dueDate}
                            </Text>
                          </View>
                        </View>
                        <StatusChip label={wo.status} />
                      </View>
                    </ElevatedCard>
                  </PressableScale>
                </AnimatedEntrance>
              ))
            )}
          </AnimatedEntrance>
        </ScrollView>
      ) : (
        /* ---- BM / SUP Dashboard ---- */
        <FlatList
          data={recentActivity}
          keyExtractor={(i) => i.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxxl }}
          ListHeaderComponent={
            <View>
              <AnimatedEntrance index={0}>
                <Text style={{ fontSize: 24, fontWeight: '700', color: theme.colors.onSurface }}>
                  {greeting}
                </Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: spacing.md }}>
                  {currentUser?.userGroup}
                </Text>
              </AnimatedEntrance>

              {buildings.length > 1 ? (
                <AnimatedEntrance index={1}>
                  <Menu
                    visible={menuOpen}
                    onDismiss={() => setMenuOpen(false)}
                    anchor={
                      <PressableScale onPress={() => setMenuOpen(true)}>
                        <ElevatedCard style={{ marginBottom: spacing.md }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                            <IconContainer icon="office-building-outline" category="navigation" />
                            <View style={{ flex: 1 }}>
                              <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>
                                Building
                              </Text>
                              <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.onSurface }}>
                                {building.name}
                              </Text>
                            </View>
                            <MaterialCommunityIcons
                              name="chevron-down"
                              size={24}
                              color={theme.colors.onSurfaceVariant}
                            />
                          </View>
                        </ElevatedCard>
                      </PressableScale>
                    }
                  >
                    {buildings.map((b) => (
                      <Menu.Item
                        key={b.id}
                        title={b.name}
                        onPress={() => {
                          setBuilding(b);
                          setMenuOpen(false);
                        }}
                      />
                    ))}
                  </Menu>
                </AnimatedEntrance>
              ) : null}

              <AnimatedEntrance index={2}>
                <SectionHeader title="Overview" icon="chart-box-outline" />
              </AnimatedEntrance>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: '2%' as any,
                  rowGap: spacing.sm,
                  marginBottom: spacing.lg,
                }}
              >
                {kpis.map((k, i) => (
                  <AnimatedEntrance key={k.key} index={3 + i} style={{ width: '32%' }}>
                    <KpiCard
                      label={k.label}
                      count={k.count}
                      icon={k.icon}
                      category={k.category}
                      onPress={() => router.push(kpiTarget(k.category) as any)}
                    />
                  </AnimatedEntrance>
                ))}
              </View>

              <SectionHeader
                title="Recent Activity"
                accentColor={palette.accentAmber}
                onSeeAll={() => router.push('/notifications')}
              />
            </View>
          }
          renderItem={({ item, index }) => (
            <AnimatedEntrance index={index}>
              <PressableScale
                onPress={() =>
                  router.push(
                    item.linkType === 'request'
                      ? `/request/${item.linkId}`
                      : `/work-order/${item.linkId}`
                  )
                }
              >
                <ElevatedCard style={{ marginBottom: spacing.sm }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                    <IconContainer
                      icon={item.icon as any}
                      category={item.linkType === 'request' ? 'request' : 'workOrder'}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, color: theme.colors.onSurface }}>
                        {item.description}
                      </Text>
                      <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, marginTop: 2 }}>
                        {item.timestamp}
                      </Text>
                    </View>
                    <StatusChip label={item.status} />
                  </View>
                </ElevatedCard>
              </PressableScale>
            </AnimatedEntrance>
          )}
          ListEmptyComponent={<EmptyState message="No recent activity." />}
        />
      )}
    </SafeAreaView>
  );
}
