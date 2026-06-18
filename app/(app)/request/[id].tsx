/**
 * Request Detail — WBS 4.3.2, embedding action flows 4.3.3 (Approve),
 * 4.3.4 (Decline/Reject), 4.3.5 (Accept Tenant Request), 4.3.6 (Assign — navigates).
 * Header + Location & Asset + expandable description + attachments (photo viewer +
 * PDF chips) + history log + conditional StickyActionBar with dialogs / bottom sheet.
 */

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import {
  Button,
  HelperText,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
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
} from '../../../src/components/ui';
import { useSnackbar } from '../../../src/contexts/SnackbarContext';
import { getRequest } from '../../../src/data/mockData';
import { palette, radius, spacing, withAlpha } from '../../../src/theme/theme';

const DESC_LINE_LIMIT = 4;

export default function RequestDetailScreen() {
  const theme = useTheme();
  const { showToast } = useSnackbar();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 720);

  const { id } = useLocalSearchParams<{ id: string }>();
  const base = getRequest(String(id));

  const [loading, setLoading] = useState(true);
  // Local UI status so actions update the screen live.
  const [status, setStatus] = useState<string>(base?.status ?? '');

  // Description expand
  const [descExpanded, setDescExpanded] = useState(false);
  // History expand
  const [historyExpanded, setHistoryExpanded] = useState(false);

  // Photo viewer
  const [viewerOpen, setViewerOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Approve / Accept dialogs
  const [approveOpen, setApproveOpen] = useState(false);
  const [acceptOpen, setAcceptOpen] = useState(false);

  // Decline / Reject bottom sheet
  const [declineOpen, setDeclineOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const photos = useMemo(
    () => (base ? base.attachments.filter((a) => a.kind === 'photo') : []),
    [base]
  );
  const pdfs = useMemo(
    () => (base ? base.attachments.filter((a) => a.kind === 'pdf') : []),
    [base]
  );

  if (!base) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
        <AppHeader title="Request Detail" showBack showNotifications={false} />
        <EmptyState
          icon="file-document-alert-outline"
          message="Failed to load request details. Please go back and try again."
        />
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
        <AppHeader title="Request Detail" showBack showNotifications={false} />
        <SkeletonList />
      </SafeAreaView>
    );
  }

  const isTenant = base.type === 'Tenant Request';

  // ---- Actions ----------------------------------------------------------
  const doApprove = () => {
    setApproveOpen(false);
    setStatus('Pending - Unassigned');
    showToast('Work order approved.', 'success');
  };

  const doAccept = () => {
    setAcceptOpen(false);
    setStatus('Service Request Accepted');
    showToast('Service request accepted.', 'success');
  };

  const openDecline = () => {
    setReason('');
    setReasonError(false);
    setDeclineOpen(true);
  };

  const doDeclineConfirm = () => {
    if (!reason.trim()) {
      setReasonError(true);
      return;
    }
    setDeclineOpen(false);
    if (isTenant) {
      setStatus('Cancelled');
      showToast('Request declined.', 'success');
    } else {
      setStatus('Approval Rejected');
      showToast('Work order rejected.', 'success');
    }
  };

  const goAssign = () => router.push(`/assign-work-order/${base.id}`);

  // ---- Photo viewer nav -------------------------------------------------
  const prevPhoto = () => setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
  const nextPhoto = () => setPhotoIndex((i) => (i + 1) % photos.length);

  // ---- History ----------------------------------------------------------
  const COLLAPSED_HISTORY = 2;
  const visibleHistory = historyExpanded
    ? base.history
    : base.history.slice(Math.max(0, base.history.length - COLLAPSED_HISTORY));

  // ---- Action bar state -------------------------------------------------
  const showTenantActions = status === 'Tenant Request';
  const showAdhocActions = status === 'Pending';
  const showAssign = status === 'Service Request Accepted';
  const hasActions = showTenantActions || showAdhocActions || showAssign;

  const typeColor =
    base.type === 'Tenant Request'
      ? palette.accentViolet
      : base.type === 'Ad-hoc WO'
      ? palette.info
      : palette.accentCyan;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title="Request Detail" showBack showNotifications={false} />

      <ScrollView
        contentContainerStyle={{
          padding: spacing.md,
          gap: spacing.md,
          paddingBottom: spacing.xxxl,
          width: '100%',
          maxWidth,
          alignSelf: 'center',
        }}
      >
        {/* Header */}
        <AnimatedEntrance index={0}>
          <ElevatedCard level="raised">
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm }}>
              <IconContainer icon="file-document-outline" category="request" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.onSurface }}>
                  {base.id}
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: 6 }}>
                  <MetaPill label={base.type} color={typeColor} icon="tag-outline" />
                  <StatusChip label={status} />
                </View>
              </View>
            </View>
            <View style={{ marginTop: spacing.sm, gap: 4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={16}
                  color={theme.colors.onSurfaceVariant}
                />
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 13 }}>
                  Created {base.createdDate}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <MaterialCommunityIcons
                  name="account-outline"
                  size={16}
                  color={theme.colors.onSurfaceVariant}
                />
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 13 }}>
                  Submitted by {base.submittedBy}
                </Text>
              </View>
            </View>
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Location & Asset */}
        <AnimatedEntrance index={1}>
          <ElevatedCard level="raised">
            <SectionHeader title="Location & Asset" icon="map-marker-outline" accentColor={palette.accentCyan} />
            <DetailRow label="Building" value={base.building} />
            <DetailRow label="Floor" value={base.floor} />
            <DetailRow label="Area / Unit" value={base.area} />
            <View
              style={{
                height: 1,
                backgroundColor: theme.colors.outlineVariant,
                marginVertical: spacing.xs,
              }}
            />
            <DetailRow label="Asset System" value={base.assetSystem} />
            <DetailRow label="Asset Type" value={base.assetType} />
            <DetailRow label="Asset" value={base.asset} />
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Issue description */}
        <AnimatedEntrance index={2}>
          <ElevatedCard level="raised">
            <SectionHeader title="Issue Description" icon="text-box-outline" accentColor={palette.accentViolet} />
            <Text
              numberOfLines={descExpanded ? undefined : DESC_LINE_LIMIT}
              style={{ color: theme.colors.onSurface, fontSize: 14, lineHeight: 21 }}
            >
              {base.description}
            </Text>
            {base.description.length > 140 ? (
              <Text
                onPress={() => setDescExpanded((v) => !v)}
                style={{
                  color: theme.colors.primary,
                  fontSize: 14,
                  fontWeight: '600',
                  marginTop: spacing.xs,
                }}
              >
                {descExpanded ? 'Show less' : 'Show more'}
              </Text>
            ) : null}
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Attachments */}
        {base.attachments.length > 0 ? (
          <AnimatedEntrance index={3}>
            <ElevatedCard level="raised">
              <SectionHeader title="Attachments" icon="paperclip" accentColor={palette.accentAmber} />
              {photos.length > 0 ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
                  {photos.map((p, idx) => (
                    <PressableScale
                      key={p.id}
                      accessibilityLabel={`View photo ${p.name}`}
                      onPress={() => {
                        setPhotoIndex(idx);
                        setViewerOpen(true);
                      }}
                    >
                      <View
                        style={{
                          width: 96,
                          height: 96,
                          borderRadius: radius.md,
                          backgroundColor: withAlpha(palette.accentCyan, 0.18),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MaterialCommunityIcons
                          name="image-outline"
                          size={34}
                          color={withAlpha(palette.accentCyan, 0.8)}
                        />
                      </View>
                    </PressableScale>
                  ))}
                </View>
              ) : null}

              {pdfs.length > 0 ? (
                <View style={{ gap: spacing.xs, marginTop: photos.length > 0 ? spacing.sm : 0 }}>
                  {pdfs.map((p) => (
                    <PressableScale
                      key={p.id}
                      accessibilityLabel={`Open document ${p.name}`}
                      onPress={() => showToast('Opening document...', 'info')}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: spacing.sm,
                          backgroundColor: withAlpha(palette.error, 0.1),
                          borderRadius: radius.md,
                          paddingVertical: 10,
                          paddingHorizontal: spacing.sm,
                        }}
                      >
                        <MaterialCommunityIcons name="file-pdf-box" size={24} color={palette.error} />
                        <Text style={{ flex: 1, color: theme.colors.onSurface, fontSize: 14, fontWeight: '600' }}>
                          {p.name}
                        </Text>
                        <MaterialCommunityIcons
                          name="open-in-new"
                          size={18}
                          color={theme.colors.onSurfaceVariant}
                        />
                      </View>
                    </PressableScale>
                  ))}
                </View>
              ) : null}
            </ElevatedCard>
          </AnimatedEntrance>
        ) : null}

        {/* History log */}
        <AnimatedEntrance index={4}>
          <ElevatedCard level="raised">
            <SectionHeader title="History" icon="history" accentColor={palette.secondary} />
            <View style={{ gap: spacing.sm }}>
              {visibleHistory.map((h) => (
                <View key={h.id} style={{ flexDirection: 'row', gap: spacing.sm }}>
                  <View style={{ alignItems: 'center', width: 16 }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: theme.colors.primary,
                        marginTop: 4,
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>{h.text}</Text>
                    <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12, marginTop: 2 }}>
                      {h.timestamp}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            {base.history.length > COLLAPSED_HISTORY ? (
              <Text
                onPress={() => setHistoryExpanded((v) => !v)}
                style={{
                  color: theme.colors.primary,
                  fontSize: 14,
                  fontWeight: '600',
                  marginTop: spacing.sm,
                }}
              >
                {historyExpanded ? 'Show less' : 'Show all history'}
              </Text>
            ) : null}
          </ElevatedCard>
        </AnimatedEntrance>

        {showAssign ? (
          <AnimatedEntrance index={5}>
            <View
              style={{
                flexDirection: 'row',
                gap: spacing.xs,
                alignItems: 'flex-start',
                backgroundColor: withAlpha(palette.info, 0.1),
                borderRadius: radius.md,
                padding: spacing.sm,
              }}
            >
              <MaterialCommunityIcons name="information-outline" size={18} color={palette.info} />
              <Text style={{ flex: 1, color: theme.colors.onSurface, fontSize: 13, lineHeight: 19 }}>
                Forwarded to Supervisor for review. You can assign a specific Supervisor.
              </Text>
            </View>
          </AnimatedEntrance>
        ) : null}
      </ScrollView>

      {/* Sticky action bar — conditional on status */}
      {hasActions ? (
        <View style={{ width: '100%', maxWidth, alignSelf: 'center' }}>
          <ActionBar>
            {showTenantActions ? (
              <View style={{ flex: 1, gap: spacing.sm }}>
                <Button mode="contained" onPress={() => setAcceptOpen(true)} contentStyle={{ height: 46 }}>
                  Accept
                </Button>
                <Button mode="outlined" onPress={openDecline} contentStyle={{ height: 46 }}>
                  Decline
                </Button>
              </View>
            ) : null}

            {showAdhocActions ? (
              <View style={{ flex: 1, gap: spacing.sm }}>
                <Button mode="contained" onPress={() => setApproveOpen(true)} contentStyle={{ height: 46 }}>
                  Approve
                </Button>
                <Button mode="outlined" onPress={openDecline} contentStyle={{ height: 46 }}>
                  Reject
                </Button>
              </View>
            ) : null}

            {showAssign ? (
              <Button
                mode="contained"
                onPress={goAssign}
                style={{ flex: 1 }}
                contentStyle={{ height: 46 }}
                icon="account-arrow-right-outline"
              >
                Assign to Supervisor
              </Button>
            ) : null}
          </ActionBar>
        </View>
      ) : null}

      {/* Approve bottom sheet (4.3.3) */}
      <Portal>
        {approveOpen ? (
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
            <PressableScale onPress={() => setApproveOpen(false)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard
              level="floating"
              style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, width: '100%', maxWidth, alignSelf: 'center' }}
            >
              {/* Icon + title */}
              <View style={{ alignItems: 'center', marginBottom: spacing.md }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: withAlpha(theme.colors.primary, 0.12),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: spacing.sm,
                  }}
                >
                  <MaterialCommunityIcons name="check-decagram-outline" size={30} color={theme.colors.primary} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.onSurface, textAlign: 'center' }}>
                  Approve Work Order
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.onSurfaceVariant,
                    textAlign: 'center',
                    marginTop: 6,
                    lineHeight: 20,
                  }}
                >
                  This work order will be made available for the MSP Supervisor to assign and schedule.
                </Text>
              </View>

              {/* Request summary chip */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: spacing.sm,
                  backgroundColor: withAlpha(theme.colors.primary, 0.07),
                  borderRadius: radius.md,
                  padding: spacing.sm,
                  marginBottom: spacing.md,
                }}
              >
                <MaterialCommunityIcons name="file-document-outline" size={20} color={theme.colors.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '700', fontSize: 14, color: theme.colors.onSurface }}>{base.id}</Text>
                  <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>{base.asset} · {base.building}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button mode="outlined" style={{ flex: 1 }} onPress={() => setApproveOpen(false)} contentStyle={{ height: 44 }}>
                  Cancel
                </Button>
                <Button mode="contained" style={{ flex: 1 }} onPress={doApprove} contentStyle={{ height: 44 }} icon="check">
                  Approve
                </Button>
              </View>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>

      {/* Accept bottom sheet (4.3.5) */}
      <Portal>
        {acceptOpen ? (
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
            <PressableScale onPress={() => setAcceptOpen(false)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard
              level="floating"
              style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, width: '100%', maxWidth, alignSelf: 'center' }}
            >
              {/* Icon + title */}
              <View style={{ alignItems: 'center', marginBottom: spacing.md }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: withAlpha(palette.accentViolet, 0.12),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: spacing.sm,
                  }}
                >
                  <MaterialCommunityIcons name="check-circle-outline" size={30} color={palette.accentViolet} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.onSurface, textAlign: 'center' }}>
                  Accept Service Request
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.onSurfaceVariant,
                    textAlign: 'center',
                    marginTop: 6,
                    lineHeight: 20,
                  }}
                >
                  This request will be forwarded to the MSP Supervisor for assignment and scheduling.
                </Text>
              </View>

              {/* Request summary chip */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: spacing.sm,
                  backgroundColor: withAlpha(palette.accentViolet, 0.07),
                  borderRadius: radius.md,
                  padding: spacing.sm,
                  marginBottom: spacing.md,
                }}
              >
                <MaterialCommunityIcons name="account-circle-outline" size={20} color={palette.accentViolet} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '700', fontSize: 14, color: theme.colors.onSurface }}>{base.id}</Text>
                  <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>
                    {base.submittedBy} · {base.building}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button mode="outlined" style={{ flex: 1 }} onPress={() => setAcceptOpen(false)} contentStyle={{ height: 44 }}>
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  style={{ flex: 1, backgroundColor: palette.accentViolet }}
                  onPress={doAccept}
                  contentStyle={{ height: 44 }}
                  icon="check-circle-outline"
                >
                  Accept
                </Button>
              </View>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>

      {/* Decline / Reject bottom sheet (4.3.4) */}
      <Portal>
        {declineOpen ? (
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
            <PressableScale onPress={() => setDeclineOpen(false)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard
              level="floating"
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                width: '100%',
                maxWidth,
                alignSelf: 'center',
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: '700', color: theme.colors.onSurface, marginBottom: spacing.sm }}>
                {isTenant ? 'Decline Request' : 'Reject Work Order'}
              </Text>
              <TextInput
                mode="outlined"
                autoFocus
                multiline
                value={reason}
                onChangeText={(t) => {
                  setReason(t);
                  if (t.trim()) setReasonError(false);
                }}
                placeholder="Enter reason for declining / rejecting..."
                maxLength={500}
                error={reasonError}
                style={{ minHeight: 110 }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <HelperText type="error" visible={reasonError}>
                  Reason is required.
                </HelperText>
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>
                  {reason.length}/500
                </Text>
              </View>

              <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
                <Button mode="text" style={{ flex: 1 }} onPress={() => setDeclineOpen(false)}>
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  buttonColor={theme.colors.error}
                  style={{ flex: 1 }}
                  onPress={doDeclineConfirm}
                >
                  Confirm
                </Button>
              </View>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>

      {/* Full-screen photo viewer */}
      <Portal>
        <Modal
          visible={viewerOpen}
          onDismiss={() => setViewerOpen(false)}
          contentContainerStyle={{ flex: 1, margin: 0, justifyContent: 'center' }}
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
        >
          {photos.length > 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <PressableScale
                accessibilityLabel="Close viewer"
                onPress={() => setViewerOpen(false)}
                style={{ position: 'absolute', top: 48, right: spacing.lg, zIndex: 2 }}
              >
                <MaterialCommunityIcons name="close" size={30} color="#FFFFFF" />
              </PressableScale>

              <View
                style={{
                  width: '82%',
                  aspectRatio: 1,
                  borderRadius: radius.lg,
                  backgroundColor: withAlpha(palette.accentCyan, 0.25),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MaterialCommunityIcons name="image-outline" size={96} color="#FFFFFF" />
                <Text style={{ color: '#FFFFFF', marginTop: spacing.sm, fontSize: 14, fontWeight: '600' }}>
                  {photos[photoIndex]?.name}
                </Text>
              </View>

              <Text style={{ color: '#FFFFFF', marginTop: spacing.md, fontSize: 13 }}>
                {photoIndex + 1} / {photos.length}
              </Text>

              {photos.length > 1 ? (
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '46%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: spacing.md,
                  }}
                >
                  <PressableScale accessibilityLabel="Previous photo" onPress={prevPhoto}>
                    <MaterialCommunityIcons name="chevron-left-circle" size={44} color="#FFFFFF" />
                  </PressableScale>
                  <PressableScale accessibilityLabel="Next photo" onPress={nextPhoto}>
                    <MaterialCommunityIcons name="chevron-right-circle" size={44} color="#FFFFFF" />
                  </PressableScale>
                </View>
              ) : null}
            </View>
          ) : null}
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

/** Local sticky action bar that supports stacked/full-width layouts. */
function ActionBar({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: spacing.md,
        paddingBottom: spacing.lg,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.outlineVariant,
      }}
    >
      {children}
    </View>
  );
}
