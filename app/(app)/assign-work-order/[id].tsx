/**
 * Assign Work Order — role-aware.
 *   SUP (WBS 6.2.5): Assign WO to Technician — Searchbar + single-select Main
 *     Technician list (Avatar / Name / Level / active WO count workload),
 *     [+ Add Sub Technician] multi-select chips, Due Date, Notes (max 500),
 *     [Cancel] / [Assign] (disabled until Main Technician selected).
 *   BM (WBS 4.3.6): Assign Request to MSP Supervisor — single-select supervisor
 *     list (name / user group / building coverage pills) + [Assign] / [Cancel].
 */

import { router, useLocalSearchParams } from 'expo-router';
import { safeBack } from '../../../src/utils/navigation';
import React, { useMemo, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Button, Chip, Menu, RadioButton, Searchbar, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../src/components/AppHeader';
import {
  AnimatedEntrance,
  ElevatedCard,
  EmptyState,
  IconContainer,
  MetaPill,
  PressableScale,
} from '../../../src/components/ui';
import { useAuth } from '../../../src/contexts/AuthContext';
import { useSnackbar } from '../../../src/contexts/SnackbarContext';
import { supervisors, technicians } from '../../../src/data/mockData';
import { palette, spacing } from '../../../src/theme/theme';

const NOTES_MAX = 500;

export default function AssignWorkOrderScreen() {
  const theme = useTheme();
  const { showToast } = useSnackbar();
  const { currentUser } = useAuth();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 720);
  const role = currentUser?.role ?? 'SUP';

  // id retained for navigation context / future linking.
  useLocalSearchParams<{ id: string }>();

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  /* ----------------------------- BM flow -------------------------------- */
  const filteredSup = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return supervisors;
    return supervisors.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.userGroup.toLowerCase().includes(q) ||
        s.buildings.some((b) => b.toLowerCase().includes(q))
    );
  }, [query]);

  /* ---------------------------- SUP flow -------------------------------- */
  // Main technician (single) / sub technicians (multi) / due date / notes.
  const [subTechs, setSubTechs] = useState<string[]>([]);
  const [subMenu, setSubMenu] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const filteredTech = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return technicians;
    return technicians.filter(
      (t) => t.name.toLowerCase().includes(q) || t.level.toLowerCase().includes(q)
    );
  }, [query]);

  const selectedTech = technicians.find((t) => t.id === selected);
  const availableSubs = technicians.filter((t) => t.id !== selected && !subTechs.includes(t.id));

  const doAssignTech = () => {
    if (!selectedTech) return;
    showToast(`Work order assigned to ${selectedTech.name}.`, 'success');
    safeBack();
  };

  const selectedSup = supervisors.find((s) => s.id === selected);
  const doAssignSup = () => {
    if (!selectedSup) return;
    showToast(`Request assigned to ${selectedSup.name}.`, 'success');
    safeBack();
  };

  const noTechs = technicians.length === 0;
  const noSupervisors = supervisors.length === 0;

  /* --------------------------- BM render -------------------------------- */
  if (role === 'BM') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
        <AppHeader title="Assign to Supervisor" showBack showNotifications={false} />
        {noSupervisors ? (
          <EmptyState
            icon="account-supervisor-outline"
            message="No active MSP Supervisors available for your buildings."
          />
        ) : (
          <>
            <View style={{ padding: spacing.md, paddingBottom: spacing.xs, width: '100%', maxWidth, alignSelf: 'center' }}>
              <Searchbar
                placeholder="Search supervisors"
                value={query}
                onChangeText={setQuery}
                style={{ backgroundColor: theme.colors.surfaceVariant }}
                inputStyle={{ fontSize: 15 }}
              />
            </View>
            <ScrollView
              contentContainerStyle={{
                padding: spacing.md,
                paddingTop: spacing.xs,
                gap: spacing.sm,
                paddingBottom: spacing.xxxl,
                width: '100%',
                maxWidth,
                alignSelf: 'center',
              }}
            >
              {filteredSup.length === 0 ? (
                <EmptyState icon="account-search-outline" message="No supervisors match your search." />
              ) : (
                filteredSup.map((s, index) => {
                  const isSel = selected === s.id;
                  return (
                    <AnimatedEntrance key={s.id} index={index}>
                      <PressableScale accessibilityLabel={`Select ${s.name}`} onPress={() => setSelected(s.id)}>
                        <ElevatedCard
                          level={isSel ? 'raised' : 'card'}
                          style={{ borderWidth: 1.5, borderColor: isSel ? theme.colors.primary : 'transparent' }}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, minHeight: 44 }}>
                            <IconContainer icon="account-supervisor" category="account" />
                            <View style={{ flex: 1 }}>
                              <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.onSurface }}>{s.name}</Text>
                              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: 1 }}>{s.userGroup}</Text>
                              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xxs, marginTop: 6 }}>
                                {s.buildings.map((b) => (
                                  <MetaPill key={b} label={b} color={palette.accentCyan} icon="office-building-outline" />
                                ))}
                              </View>
                            </View>
                            <RadioButton value={s.id} status={isSel ? 'checked' : 'unchecked'} onPress={() => setSelected(s.id)} />
                          </View>
                        </ElevatedCard>
                      </PressableScale>
                    </AnimatedEntrance>
                  );
                })
              )}
            </ScrollView>
            <View style={actionBarStyle(theme, maxWidth)}>
              <Button mode="text" style={{ flex: 1 }} onPress={() => safeBack()}>
                Cancel
              </Button>
              <Button mode="contained" style={{ flex: 1 }} disabled={!selected} onPress={doAssignSup} contentStyle={{ height: 46 }}>
                Assign
              </Button>
            </View>
          </>
        )}
      </SafeAreaView>
    );
  }

  /* --------------------------- SUP render (6.2.5) ----------------------- */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title="Assign to Technician" showBack showNotifications={false} />
      {noTechs ? (
        <EmptyState
          icon="account-hard-hat-outline"
          message="No active Technicians available in your group."
        />
      ) : (
        <>
          <View style={{ padding: spacing.md, paddingBottom: spacing.xs, width: '100%', maxWidth, alignSelf: 'center' }}>
            <Searchbar
              placeholder="Search technicians"
              value={query}
              onChangeText={setQuery}
              style={{ backgroundColor: theme.colors.surfaceVariant }}
              inputStyle={{ fontSize: 15 }}
            />
          </View>

          <ScrollView
            contentContainerStyle={{
              padding: spacing.md,
              paddingTop: spacing.xs,
              gap: spacing.sm,
              paddingBottom: spacing.xxxl,
              width: '100%',
              maxWidth,
              alignSelf: 'center',
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: '700', color: theme.colors.onSurfaceVariant, marginBottom: 2 }}>
              MAIN TECHNICIAN
            </Text>
            {filteredTech.length === 0 ? (
              <EmptyState icon="account-search-outline" message="No technicians match your search." />
            ) : (
              filteredTech.map((t, index) => {
                const isSel = selected === t.id;
                return (
                  <AnimatedEntrance key={t.id} index={index}>
                    <PressableScale accessibilityLabel={`Select ${t.name}`} onPress={() => setSelected(t.id)}>
                      <ElevatedCard
                        level={isSel ? 'raised' : 'card'}
                        style={{ borderWidth: 1.5, borderColor: isSel ? theme.colors.primary : 'transparent' }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, minHeight: 44 }}>
                          <IconContainer icon="account-hard-hat" category="account" />
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.onSurface }}>{t.name}</Text>
                            <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: 1 }}>{t.level}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xxs, marginTop: 6 }}>
                              <MetaPill
                                label={`${t.activeWoCount} active WO${t.activeWoCount === 1 ? '' : 's'}`}
                                color={palette.accentAmber}
                                icon="clipboard-list-outline"
                              />
                            </View>
                          </View>
                          <RadioButton value={t.id} status={isSel ? 'checked' : 'unchecked'} onPress={() => setSelected(t.id)} />
                        </View>
                      </ElevatedCard>
                    </PressableScale>
                  </AnimatedEntrance>
                );
              })
            )}

            {/* Sub technicians */}
            <Text style={{ fontSize: 13, fontWeight: '700', color: theme.colors.onSurfaceVariant, marginTop: spacing.sm, marginBottom: 2 }}>
              SUB TECHNICIANS
            </Text>
            <ElevatedCard style={{ gap: spacing.sm }}>
              {subTechs.length > 0 ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xxs }}>
                  {subTechs.map((id) => {
                    const t = technicians.find((x) => x.id === id);
                    if (!t) return null;
                    return (
                      <Chip
                        key={id}
                        icon="account-hard-hat"
                        onClose={() => setSubTechs((prev) => prev.filter((x) => x !== id))}
                      >
                        {t.name}
                      </Chip>
                    );
                  })}
                </View>
              ) : null}
              <Menu
                visible={subMenu}
                onDismiss={() => setSubMenu(false)}
                anchor={
                  <Button
                    mode="outlined"
                    icon="account-plus-outline"
                    onPress={() => setSubMenu(true)}
                    disabled={availableSubs.length === 0}
                  >
                    + Add Sub Technician
                  </Button>
                }
              >
                {availableSubs.map((t) => (
                  <Menu.Item
                    key={t.id}
                    title={`${t.name} · ${t.level}`}
                    onPress={() => {
                      setSubTechs((prev) => [...prev, t.id]);
                      setSubMenu(false);
                    }}
                  />
                ))}
              </Menu>
            </ElevatedCard>

            {/* Due Date + Notes */}
            <TextInput
              mode="outlined"
              label="Due Date"
              placeholder="dd/mm/yyyy"
              value={dueDate}
              onChangeText={setDueDate}
              right={<TextInput.Icon icon="calendar" />}
              style={{ marginTop: spacing.xs }}
            />
            <TextInput
              mode="outlined"
              label="Notes"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              maxLength={NOTES_MAX}
            />
            <Text
              style={{
                alignSelf: 'flex-end',
                fontSize: 12,
                color: notes.length >= NOTES_MAX - 20 ? theme.colors.error : theme.colors.onSurfaceVariant,
              }}
            >
              {notes.length}/{NOTES_MAX}
            </Text>
          </ScrollView>

          <View style={actionBarStyle(theme, maxWidth)}>
            <Button mode="text" style={{ flex: 1 }} onPress={() => safeBack()}>
              Cancel
            </Button>
            <Button
              mode="contained"
              style={{ flex: 1 }}
              disabled={!selected}
              onPress={doAssignTech}
              contentStyle={{ height: 46 }}
            >
              Assign
            </Button>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

function actionBarStyle(theme: ReturnType<typeof useTheme>, maxWidth: number) {
  return {
    flexDirection: 'row' as const,
    gap: spacing.sm,
    padding: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineVariant,
    width: '100%' as const,
    maxWidth,
    alignSelf: 'center' as const,
  };
}
