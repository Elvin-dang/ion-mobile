/**
 * Asset Detail (read-only) — WBS 4.2.2 / 7.3.2.
 * Header (Name + Status), QR with full-screen zoom and Download QR button,
 * Classification / Location / Asset Details (incl. Manufactured Date) sections,
 * Technical Information and Supporting Info (TECH role), Maintenance History,
 * Related WO History, Pending WOs. Work Request button for TECH.
 */

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Button, Modal, Portal, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../src/components/AppHeader';
import {
  AnimatedEntrance,
  DetailRow,
  ElevatedCard,
  EmptyState,
  IconContainer,
  MetaPill,
  PressableScale,
  SectionHeader,
  SkeletonList,
  StatusChip,
  StickyActionBar,
} from '../../../src/components/ui';
import { useAuth } from '../../../src/contexts/AuthContext';
import { useSnackbar } from '../../../src/contexts/SnackbarContext';
import {
  getAsset,
  getTechnician,
  maintenanceHistory,
  pendingWorkOrders,
  workOrders,
  WorkOrder,
} from '../../../src/data/mockData';
import { palette, radius, spacing, withAlpha } from '../../../src/theme/theme';

export default function AssetDetailScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 720);
  const { id } = useLocalSearchParams<{ id: string }>();
  const asset = getAsset(String(id));
  const { currentUser } = useAuth();
  const { showToast } = useSnackbar();
  const role = currentUser?.role ?? 'BM';
  const isTech = role === 'TECH';

  const [loading, setLoading] = useState(true);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const history = useMemo(() => (asset ? maintenanceHistory(asset.id) : []), [asset]);
  const pending = useMemo(() => (asset ? pendingWorkOrders(asset.id) : []), [asset]);
  const relatedWOs = useMemo(
    () => (asset ? workOrders.filter((w) => w.assetId === asset.id) : []),
    [asset]
  );

  if (!asset) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
        <AppHeader title="Asset Detail" showBack showNotifications={false} />
        <EmptyState
          icon="cube-off-outline"
          message="Failed to load asset details. Please go back and try again."
        />
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
        <AppHeader
          title={isTech ? asset.code : 'Asset Detail'}
          showBack
          showNotifications={false}
          rightIcon={isTech ? 'clock-outline' : undefined}
        />
        <SkeletonList />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader
        title={isTech ? asset.code : 'Asset Detail'}
        showBack
        showNotifications={false}
        rightIcon={isTech ? 'clock-outline' : undefined}
      />
      <ScrollView
        contentContainerStyle={{
          padding: spacing.md,
          gap: spacing.md,
          paddingBottom: spacing.xxxl,
          width: maxWidth,
          alignSelf: 'center',
        }}
      >
        {/* TECH: Photo banner + Asset Name */}
        {isTech ? (
          <AnimatedEntrance index={0}>
            <PressableScale accessibilityLabel="View asset photo">
              <View
                style={{
                  width: '100%',
                  height: 180,
                  borderRadius: radius.md,
                  backgroundColor: withAlpha(palette.accentCyan, 0.12),
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <MaterialCommunityIcons name="image-outline" size={64} color={withAlpha(palette.accentCyan, 0.5)} />
                <Text style={{ color: withAlpha(palette.accentCyan, 0.7), fontSize: 13, marginTop: 6 }}>
                  Tap to expand photo
                </Text>
              </View>
            </PressableScale>
            <Text
              variant="titleLarge"
              style={{ fontWeight: '700', color: theme.colors.onSurface, marginTop: spacing.sm }}
            >
              {asset.name}
            </Text>
          </AnimatedEntrance>
        ) : (
          /* Non-TECH header row */
          <AnimatedEntrance index={0}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
              <IconContainer icon="cube-outline" category="asset" size={48} iconSize={26} />
              <View style={{ flex: 1 }}>
                <Text variant="titleLarge" style={{ fontWeight: '700', color: theme.colors.onSurface }}>
                  {asset.name}
                </Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, marginTop: 2 }}>
                  {asset.code}
                </Text>
              </View>
              <StatusChip label={asset.status} />
            </View>
          </AnimatedEntrance>
        )}

        {/* QR Code */}
        <AnimatedEntrance index={1}>
          <ElevatedCard>
            <SectionHeader title="Asset QR Code" icon="qrcode" accentColor={palette.accentCyan} />
            <PressableScale onPress={() => setQrOpen(true)} accessibilityLabel="Zoom QR code">
              <View
                style={{
                  alignSelf: 'center',
                  padding: spacing.md,
                  borderRadius: radius.md,
                  borderWidth: 1,
                  borderColor: theme.colors.outline,
                  backgroundColor: theme.colors.surface,
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons name="qrcode" size={140} color={theme.colors.onSurface} />
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12, marginTop: spacing.xs }}>
                  Tap to zoom
                </Text>
              </View>
            </PressableScale>
            <Button
              mode="outlined"
              icon="download"
              onPress={() => showToast('QR code downloaded.', 'success')}
              style={{ marginTop: spacing.sm }}
            >
              Download QR
            </Button>
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Classification */}
        <AnimatedEntrance index={2}>
          <ElevatedCard>
            <SectionHeader title="Asset Classification" icon="shape-outline" accentColor={palette.accentViolet} />
            <DetailRow label="Asset System" value={asset.system} />
            <DetailRow label="Asset Sub-system" value={asset.subSystem} />
            <DetailRow label="Asset Type" value={asset.type} />
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Location */}
        <AnimatedEntrance index={3}>
          <ElevatedCard>
            <SectionHeader title="Location" icon="map-marker-outline" accentColor={palette.accentCyan} />
            <DetailRow label="Building" value={asset.building} />
            <DetailRow label="Floor" value={asset.floor} />
            <DetailRow label="Area/Unit" value={asset.area} />
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Asset Details */}
        <AnimatedEntrance index={4}>
          <ElevatedCard>
            <SectionHeader title="Asset Details" icon="information-outline" accentColor={palette.primary} />
            <DetailRow label="Asset Code" value={asset.code} />
            {asset.assetTag ? <DetailRow label="Asset Tag" value={asset.assetTag} /> : null}
            <DetailRow label="Model" value={asset.model} />
            <DetailRow label="Serial Number" value={asset.serial} />
            <DetailRow label="Brand" value={asset.brand} />
            <DetailRow label="Purchase Date" value={asset.purchaseDate} />
            <DetailRow label="Manufactured Date" value={asset.manufacturedDate} />
            <DetailRow label="Status" value={asset.status} />
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Technical Information (TECH role) */}
        {isTech ? (
          <AnimatedEntrance index={5}>
            <ElevatedCard>
              <SectionHeader title="Technical Information" icon="cog-outline" accentColor={palette.accentViolet} />
              <DetailRow label="Model" value={asset.model} />
              <DetailRow label="Serial" value={asset.serial} />
              <DetailRow label="Origin" value={asset.origin ?? '—'} />
              <DetailRow label="Brand" value={asset.brand} />
              <DetailRow label="Year of Manufacture" value={asset.yearOfManufacture ?? '—'} />
              <DetailRow label="Purchase Date" value={asset.purchaseDate} />
              <DetailRow label="Usage Date" value={asset.usageDate ?? '—'} />
              <DetailRow label="Warranty Expiry" value={asset.warrantyExpiryDate ?? '—'} />
            </ElevatedCard>
          </AnimatedEntrance>
        ) : null}

        {/* Supporting Info (TECH role) */}
        {isTech && (asset.specification || asset.maintenanceFrequency) ? (
          <AnimatedEntrance index={6}>
            <ElevatedCard>
              <SectionHeader title="Supporting Info" icon="file-document-outline" accentColor={palette.accentAmber} />
              {asset.specification ? (
                <View style={{ marginBottom: spacing.sm }}>
                  <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>
                    Specification
                  </Text>
                  <Text style={{ fontSize: 14, color: theme.colors.onSurface, lineHeight: 20 }}>
                    {asset.specification}
                  </Text>
                </View>
              ) : null}
              {asset.maintenanceFrequency ? (
                <DetailRow label="Maintenance Frequency" value={asset.maintenanceFrequency} />
              ) : null}
            </ElevatedCard>
          </AnimatedEntrance>
        ) : null}

        {/* Maintenance History */}
        <AnimatedEntrance index={7}>
          <ElevatedCard>
            <SectionHeader title="Maintenance History" icon="history" accentColor={palette.secondary} />
            {history.length === 0 ? (
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, paddingVertical: spacing.xs }}>
                No maintenance history.
              </Text>
            ) : (
              history.map((wo) => <WorkOrderRow key={wo.id} wo={wo} kind="history" />)
            )}
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Related WO History */}
        <AnimatedEntrance index={8}>
          <ElevatedCard>
            <SectionHeader title="Related WO History" icon="clipboard-text-outline" accentColor={palette.accentCyan} />
            {relatedWOs.length === 0 ? (
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, paddingVertical: spacing.xs }}>
                No related work orders.
              </Text>
            ) : (
              relatedWOs.map((wo) => <WorkOrderRow key={wo.id} wo={wo} kind="related" />)
            )}
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Pending WOs */}
        <AnimatedEntrance index={9}>
          <ElevatedCard>
            <SectionHeader title="Pending Work Orders" icon="clipboard-clock-outline" accentColor={palette.accentAmber} />
            {pending.length === 0 ? (
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, paddingVertical: spacing.xs }}>
                No pending work orders.
              </Text>
            ) : (
              pending.map((wo) => <WorkOrderRow key={wo.id} wo={wo} kind="pending" />)
            )}
          </ElevatedCard>
        </AnimatedEntrance>
      </ScrollView>

      {/* Work Request button for TECH */}
      {isTech ? (
        <StickyActionBar>
          <Button
            mode="contained"
            buttonColor={palette.primary}
            icon="clipboard-plus-outline"
            style={{ flex: 1 }}
            contentStyle={{ height: 48 }}
            onPress={() => router.push('/create-work-order')}
          >
            Work Request
          </Button>
        </StickyActionBar>
      ) : null}

      {/* QR full-screen zoom */}
      <Portal>
        <Modal
          visible={qrOpen}
          onDismiss={() => setQrOpen(false)}
          contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <PressableScale onPress={() => setQrOpen(false)} accessibilityLabel="Dismiss QR code">
            <View
              style={{
                padding: spacing.xl,
                borderRadius: radius.lg,
                backgroundColor: palette.white,
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name="qrcode" size={Math.min(maxWidth - 80, 320)} color={palette.black} />
              <Text style={{ color: palette.black, fontSize: 16, fontWeight: '700', marginTop: spacing.md }}>
                {asset.code}
              </Text>
              <Text style={{ color: withAlpha(palette.black, 0.6), fontSize: 13, marginTop: 4 }}>
                Tap to dismiss
              </Text>
            </View>
          </PressableScale>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

function WorkOrderRow({ wo, kind }: { wo: WorkOrder; kind: 'history' | 'pending' | 'related' }) {
  const theme = useTheme();
  const tech = getTechnician(wo.mainTechnicianId);
  return (
    <PressableScale onPress={() => router.push(`/work-order/${wo.id}`)} tintColor={palette.info}>
      <View
        style={{
          paddingVertical: spacing.sm,
          borderTopWidth: 1,
          borderTopColor: theme.colors.outlineVariant,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: theme.colors.onSurface }}>{wo.id}</Text>
          <StatusChip label={wo.status} />
        </View>
        {kind === 'history' ? (
          <>
            <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: 4 }}>
              {wo.planName ?? '—'}{wo.round ? ` · ${wo.round}` : ''}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              <MetaPill label={`Completed ${wo.endTime ?? '—'}`} color={palette.secondary} icon="calendar-check" />
              <MetaPill label={tech?.name ?? '—'} color={palette.accentViolet} icon="account-hard-hat" />
            </View>
          </>
        ) : kind === 'related' ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            <MetaPill label={wo.type} color={palette.accentViolet} icon="tag-outline" />
            <MetaPill label={`Created ${wo.createdDate}`} color={palette.accentCyan} icon="calendar-plus" />
          </View>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            <MetaPill label={wo.type} color={palette.accentViolet} icon="tag-outline" />
            <MetaPill
              label={`Due ${wo.dueDate}`}
              color={wo.overdue ? palette.accentCoral : palette.accentAmber}
              icon={wo.overdue ? 'calendar-alert' : 'calendar-clock'}
            />
          </View>
        )}
      </View>
    </PressableScale>
  );
}
