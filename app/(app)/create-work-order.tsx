/**
 * Create Ad-hoc Work Order — WBS 6.2.1 (SUP) / 7.2.1 (TECH).
 * 3-step wizard: Info → Details → Checklist.
 */

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { safeBack } from '../../src/utils/navigation';
import React, { useMemo, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Button, Checkbox, Divider, IconButton, Menu, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../src/components/AppHeader';
import {
  AnimatedEntrance,
  ElevatedCard,
  MetaPill,
  SectionHeader,
  StickyActionBar,
} from '../../src/components/ui';
import { useAuth } from '../../src/contexts/AuthContext';
import { useSnackbar } from '../../src/contexts/SnackbarContext';
import { assets, buildings } from '../../src/data/mockData';
import { palette, spacing } from '../../src/theme/theme';

const WORK_TYPES = ['Repairs', 'Inspection', 'Replacement', 'Cleaning', 'Other'];
const uniq = (arr: string[]) => Array.from(new Set(arr));

interface ChecklistDraft {
  id: string;
  name: string;
  descMode: 'Off' | 'Require' | 'Optional';
  photoMode: 'Off' | 'Require' | 'Optional';
}

function DropdownField({
  label,
  required,
  value,
  placeholder,
  options,
  onSelect,
  disabled,
  theme,
}: {
  label: string;
  required?: boolean;
  value: string;
  placeholder: string;
  options: { key: string; title: string }[];
  onSelect: (key: string) => void;
  disabled?: boolean;
  theme: ReturnType<typeof useTheme>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      {label ? (
        <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>
          {label}{required ? ' *' : ''}
        </Text>
      ) : null}
      <Menu
        visible={open}
        onDismiss={() => setOpen(false)}
        anchor={
          <Button
            mode="outlined"
            disabled={disabled}
            onPress={() => setOpen(true)}
            icon="chevron-down"
            contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
            style={{ justifyContent: 'flex-start' }}
          >
            {value || placeholder}
          </Button>
        }
      >
        {options.map((o) => (
          <Menu.Item key={o.key} title={o.title} onPress={() => { onSelect(o.key); setOpen(false); }} />
        ))}
      </Menu>
    </View>
  );
}

export default function CreateWorkOrderScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 760);
  const { currentUser } = useAuth();
  const { showToast } = useSnackbar();
  const isTech = currentUser?.role === 'TECH';

  const [step, setStep] = useState(1);

  // Step 1 — Info
  const [assetId, setAssetId] = useState('');
  const [system, setSystem] = useState('');
  const [subSystem, setSubSystem] = useState('');
  const [assetType, setAssetType] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');

  // Step 2 — Details
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [workType, setWorkType] = useState('');
  const [timeRequired, setTimeRequired] = useState('');
  const [description, setDescription] = useState('');
  const [remark, setRemark] = useState('');
  const [cause, setCause] = useState('');

  // Step 3 — Checklist
  const [items, setItems] = useState<ChecklistDraft[]>([
    { id: 'ci-1', name: '', descMode: 'Off', photoMode: 'Off' },
  ]);

  const systems = useMemo(() => uniq(assets.map((a) => a.system)), []);
  const subSystems = useMemo(() => uniq(assets.filter((a) => a.system === system).map((a) => a.subSystem)), [system]);
  const types = useMemo(
    () => uniq(assets.filter((a) => a.system === system && (!subSystem || a.subSystem === subSystem)).map((a) => a.type)),
    [system, subSystem]
  );
  const assetOptions = useMemo(
    () => assets.filter((a) => (!system || a.system === system) && (!subSystem || a.subSystem === subSystem) && (!assetType || a.type === assetType)),
    [system, subSystem, assetType]
  );
  const selectedAsset = assets.find((a) => a.id === assetId);

  const pickAsset = (id: string) => {
    const a = assets.find((x) => x.id === id);
    setAssetId(id);
    if (a) { setSystem(a.system); setSubSystem(a.subSystem); setAssetType(a.type); }
  };

  const addItem = () =>
    setItems((prev) => [...prev, { id: `ci-${prev.length + 1}`, name: '', descMode: 'Off', photoMode: 'Off' }]);

  const removeItem = (id: string) => setItems((prev) => prev.filter((c) => c.id !== id));

  const updateItem = (id: string, patch: Partial<ChecklistDraft>) =>
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const validateStep1 = () => {
    if (!assetId) { showToast('Please select an asset.', 'error'); return false; }
    if (isTech && !tenantName.trim()) { showToast('Tenant Name is required.', 'error'); return false; }
    if (isTech && !tenantPhone.trim()) { showToast('Tenant Phone is required.', 'error'); return false; }
    return true;
  };

  const validateStep2 = () => {
    if (!startTime.trim()) { showToast('Start Time is required.', 'error'); return false; }
    if (!endTime.trim()) { showToast('End Time is required.', 'error'); return false; }
    if (!workType) { showToast('Work Type is required.', 'error'); return false; }
    if (!timeRequired.trim()) { showToast('Time Required is required.', 'error'); return false; }
    return true;
  };

  const onSubmit = () => {
    showToast(
      isTech ? 'Request submitted to your Supervisor for review.' : 'Work order submitted for Building Manager approval.',
      'success'
    );
    if (isTech) router.replace('/adhoc-requests');
    else safeBack();
  };

  const STEP_LABELS = ['Info', 'Details', 'Checklist'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title="New Ad-hoc Work Order" showBack showNotifications={false} />

      {/* Step indicator */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, gap: 0 }}>
        {STEP_LABELS.map((label, idx) => {
          const n = idx + 1;
          const active = step === n;
          const done = step > n;
          return (
            <React.Fragment key={label}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <View
                  style={{
                    width: 28, height: 28, borderRadius: 14,
                    backgroundColor: done || active ? palette.primary : theme.colors.surfaceVariant,
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {done ? (
                    <MaterialCommunityIcons name="check" size={16} color="#fff" />
                  ) : (
                    <Text style={{ color: active ? '#fff' : theme.colors.onSurfaceVariant, fontSize: 13, fontWeight: '700' }}>{n}</Text>
                  )}
                </View>
                <Text style={{ fontSize: 11, marginTop: 3, fontWeight: active ? '700' : '400', color: active ? palette.primary : theme.colors.onSurfaceVariant }}>
                  {label}
                </Text>
              </View>
              {idx < STEP_LABELS.length - 1 ? (
                <View style={{ flex: 1, height: 2, backgroundColor: step > n ? palette.primary : theme.colors.surfaceVariant, marginBottom: 14 }} />
              ) : null}
            </React.Fragment>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxxl, width: '100%', maxWidth, alignSelf: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        {/* ---- STEP 1: Info ---- */}
        {step === 1 ? (
          <AnimatedEntrance index={0}>
            <SectionHeader title="Asset" icon="cube-outline" />
            <ElevatedCard level="raised" style={{ gap: spacing.sm }}>
              <DropdownField label="Asset System" required value={system} placeholder="Select asset system"
                options={systems.map((s) => ({ key: s, title: s }))}
                onSelect={(s) => { setSystem(s); setSubSystem(''); setAssetType(''); setAssetId(''); }} theme={theme} />
              <DropdownField label="Sub-system" value={subSystem} placeholder="Select sub-system" disabled={!system}
                options={subSystems.map((s) => ({ key: s, title: s }))}
                onSelect={(s) => { setSubSystem(s); setAssetType(''); setAssetId(''); }} theme={theme} />
              <DropdownField label="Asset Type" value={assetType} placeholder="Select asset type" disabled={!system}
                options={types.map((t) => ({ key: t, title: t }))}
                onSelect={(t) => { setAssetType(t); setAssetId(''); }} theme={theme} />
              <View>
                <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>Asset *</Text>
                <View style={{ flexDirection: 'row', gap: spacing.xs, alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <DropdownField label="" value={selectedAsset ? `${selectedAsset.code} · ${selectedAsset.name}` : ''} placeholder="Select asset"
                      options={assetOptions.map((a) => ({ key: a.id, title: `${a.code} · ${a.name}` }))}
                      onSelect={pickAsset} theme={theme} />
                  </View>
                  <IconButton mode="contained" icon="qrcode-scan" accessibilityLabel="Scan QR to select asset" onPress={() => router.push('/qr-scan')} />
                </View>
              </View>
              {selectedAsset ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                  <MetaPill label={selectedAsset.code} color={palette.accentCyan} icon="barcode" />
                  <MetaPill label={`${selectedAsset.floor} · ${selectedAsset.area}`} color={palette.accentViolet} icon="map-marker-outline" />
                </View>
              ) : null}
            </ElevatedCard>

            {isTech ? (
              <>
                <SectionHeader title="Tenant Contact" icon="account-outline" />
                <ElevatedCard level="raised" style={{ gap: spacing.sm }}>
                  <TextInput mode="outlined" label="Tenant Name *" value={tenantName} onChangeText={setTenantName} />
                  <TextInput mode="outlined" label="Phone *" value={tenantPhone} onChangeText={setTenantPhone} keyboardType="phone-pad" />
                  <TextInput mode="outlined" label="Email (optional)" value={tenantEmail} onChangeText={setTenantEmail} keyboardType="email-address" autoCapitalize="none" />
                </ElevatedCard>
              </>
            ) : null}
          </AnimatedEntrance>
        ) : null}

        {/* ---- STEP 2: Details ---- */}
        {step === 2 ? (
          <AnimatedEntrance index={0}>
            <SectionHeader title="Schedule" icon="calendar-clock-outline" />
            <ElevatedCard level="raised" style={{ gap: spacing.sm }}>
              <TextInput mode="outlined" label="Start Time *" placeholder="dd/mm/yyyy hh:mm" value={startTime} onChangeText={setStartTime} />
              <TextInput mode="outlined" label="End Time *" placeholder="dd/mm/yyyy hh:mm" value={endTime} onChangeText={setEndTime} />
              <TextInput mode="outlined" label="Time Required to Complete *" placeholder="e.g. 2 hours" value={timeRequired} onChangeText={setTimeRequired} />
            </ElevatedCard>

            <SectionHeader title="Work Details" icon="clipboard-text-outline" />
            <ElevatedCard level="raised" style={{ gap: spacing.sm }}>
              <DropdownField label="Work Type" required value={workType} placeholder="Select work type"
                options={WORK_TYPES.map((t) => ({ key: t, title: t }))} onSelect={setWorkType} theme={theme} />
              <TextInput mode="outlined" label="Description" value={description} onChangeText={setDescription} multiline numberOfLines={4} />
              <TextInput mode="outlined" label="Remark" value={remark} onChangeText={setRemark} multiline numberOfLines={2} />
              <TextInput mode="outlined" label="Cause" value={cause} onChangeText={setCause} multiline numberOfLines={2} />
            </ElevatedCard>

            <SectionHeader title="Photos" icon="image-multiple-outline" />
            <ElevatedCard>
              <Button mode="outlined" icon="camera-plus-outline" onPress={() => showToast('Photo added.', 'success')}>
                Upload Photos
              </Button>
              <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, marginTop: 6 }}>
                JPG or PNG, max 5 MB each.
              </Text>
            </ElevatedCard>
          </AnimatedEntrance>
        ) : null}

        {/* ---- STEP 3: Checklist ---- */}
        {step === 3 ? (
          <AnimatedEntrance index={0}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm }}>
              <SectionHeader title="Checklist Items" icon="format-list-checks" />
              <Button mode="text" compact icon="plus" onPress={addItem}>Add</Button>
            </View>
            {items.map((item, idx) => (
              <ElevatedCard key={item.id} level="raised" style={{ gap: spacing.sm, marginBottom: spacing.sm }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant }}>Item {idx + 1}</Text>
                  {items.length > 1 ? (
                    <Button mode="text" compact textColor={theme.colors.error} onPress={() => removeItem(item.id)}>Remove</Button>
                  ) : null}
                </View>
                <TextInput mode="outlined" label="Name *" dense value={item.name} onChangeText={(t) => updateItem(item.id, { name: t })} />
                <View>
                  <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>Description</Text>
                  {(['Off', 'Require', 'Optional'] as const).map((m) => (
                    <View key={m} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Checkbox status={item.descMode === m ? 'checked' : 'unchecked'} onPress={() => updateItem(item.id, { descMode: m })} />
                      <Text>{m}</Text>
                    </View>
                  ))}
                </View>
                <View>
                  <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>Photos</Text>
                  {(['Off', 'Require', 'Optional'] as const).map((m) => (
                    <View key={m} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Checkbox status={item.photoMode === m ? 'checked' : 'unchecked'} onPress={() => updateItem(item.id, { photoMode: m })} />
                      <Text>{m}</Text>
                    </View>
                  ))}
                </View>
                {idx < items.length - 1 ? <Divider /> : null}
              </ElevatedCard>
            ))}
          </AnimatedEntrance>
        ) : null}
      </ScrollView>

      <StickyActionBar>
        <Button mode="outlined" style={{ flex: 1 }} onPress={() => { if (step === 1) safeBack(); else setStep((s) => s - 1); }}>
          {step === 1 ? 'Cancel' : 'Back'}
        </Button>
        <Button
          mode="contained"
          style={{ flex: 1 }}
          buttonColor={palette.primary}
          onPress={() => {
            if (step === 1 && validateStep1()) setStep(2);
            else if (step === 2 && validateStep2()) setStep(3);
            else if (step === 3) onSubmit();
          }}
        >
          {step === 3 ? 'Submit' : 'Next'}
        </Button>
      </StickyActionBar>
    </SafeAreaView>
  );
}
