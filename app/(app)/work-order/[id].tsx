/**
 * Work Order Detail — role-aware (WBS 4.4.2 / 6.2.3 / 7.2.4) with embedded
 * role action flows:
 *   BM   (Verified)             -> Sign Off & Close (4.4.3) / Reject (4.4.4)
 *   SUP  (Pending - Unassigned) -> Assign to Technician (6.2.5)
 *   SUP  (Completed)            -> Approve & Submit / Decline (6.2.7)
 *   SUP  (active)               -> Request Spare Parts (6.2.6)
 *   TECH (Assigned)             -> Start Work Order (7.2.5)
 *   TECH (Started)              -> Complete & Sign Off (7.2.10) + inline execution
 *                                  (7.2.6 checklist, 7.2.7 photos, 7.2.8 parts, 7.2.9 request)
 *   TECH (Completion Rejected)  -> Resubmit Work Order (7.2.11)
 *
 * WO status + checklist + photos + parts are kept in LOCAL state so technician
 * actions mutate live.
 */

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { safeBack } from '../../../src/utils/navigation';
import React, { useMemo, useState } from 'react';
import { Linking, ScrollView, useWindowDimensions, View } from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  List,
  Menu,
  Modal,
  Portal,
  ProgressBar,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../src/components/AppHeader';
import { TechnicianCard } from '../../../src/components/cards';
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
  ChecklistItem,
  getTechnician,
  getWorkOrder,
  HistoryEntry,
  PartReplacement,
  spareParts,
  WorkOrderStatus,
} from '../../../src/data/mockData';
import { palette, radius, spacing, withAlpha } from '../../../src/theme/theme';

const STAGES = ['New', 'Pending', 'In Progress', 'Review', 'Approval'] as const;

/** Map a WO status onto the 5-stage stepper index (0..4). */
function stageIndex(status: WorkOrderStatus): number {
  switch (status) {
    case 'Draft':
      return 0;
    case 'Pending':
    case 'Pending - Unassigned':
      return 1;
    case 'Assigned':
    case 'Started':
    case 'Completion Rejected':
      return 2;
    case 'Completed':
      return 3;
    case 'Verification Rejected':
      return 3;
    case 'Verified':
      return 4;
    case 'Closed':
      return 4;
    case 'Cancelled':
    case 'Ad-hoc Declined':
    case 'Overdue':
      return 0;
    default:
      return 0;
  }
}

function stageContextLabel(status: WorkOrderStatus): string {
  switch (status) {
    case 'Draft':
      return 'Draft — review details before submitting.'; 
    case 'Pending':
      return 'Awaiting Building Manager approval.';
    case 'Pending - Unassigned':
      return 'Approved — awaiting technician assignment.';
    case 'Assigned':
      return 'Assigned to technician, not yet started.';
    case 'Started':
      return 'Execution in progress.';
    case 'Completion Rejected':
      return 'Returned to technician for correction.';
    case 'Completed':
      return 'Awaiting Supervisor review.';
    case 'Verification Rejected':
      return 'Returned to Supervisor by Building Manager.';
    case 'Verified':
      return 'Verified — awaiting Building Manager sign-off.';
    case 'Closed':
      return 'Signed off and closed.';
    case 'Cancelled':
      return 'Work order cancelled.';
    case 'Ad-hoc Declined':
      return 'Ad-hoc request declined — awaiting technician resubmission.';
    case 'Overdue':
      return 'Work order is overdue.';
    default:
      return '';
  }
}

const DESC_MAX = 500;
const COUNTER_RED = 480;

export default function WorkOrderDetailScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 760);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser } = useAuth();
  const { showToast } = useSnackbar();
  const role = currentUser?.role ?? 'BM';

  const base = getWorkOrder(String(id));

  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'details' | 'execution' | 'members'>('details');

  // Live mutable state
  const [status, setStatus] = useState<WorkOrderStatus>(base?.status ?? 'Pending');
  const [checklist, setChecklist] = useState<ChecklistItem[]>(base?.checklist ?? []);
  const [photos, setPhotos] = useState(base?.photos ?? []);
  const [parts, setParts] = useState<PartReplacement[]>(base?.parts ?? []);
  const [history, setHistory] = useState<HistoryEntry[]>(base?.history ?? []);
  const [expandedHistory, setExpandedHistory] = useState(false);

  // Photo viewer
  const [viewPhoto, setViewPhoto] = useState<string | null>(null);

  // Dialogs / sheets
  const [signOffDialog, setSignOffDialog] = useState(false);
  const [signOffSupDialog, setSignOffSupDialog] = useState(false); // SUP sign off & forward to BM
  const [resubmitBmDialog, setResubmitBmDialog] = useState(false); // SUP resubmit to BM
  const [startDialog, setStartDialog] = useState(false);
  const [rejectSheet, setRejectSheet] = useState(false); // BM reject
  const [declineSheet, setDeclineSheet] = useState(false); // SUP decline
  const [techSignSheet, setTechSignSheet] = useState(false);
  const [sparePartSheet, setSparePartSheet] = useState(false); // SUP request
  const [recordPartSheet, setRecordPartSheet] = useState(false); // TECH record
  const [techRequestSheet, setTechRequestSheet] = useState(false); // TECH request
  const [photoMenuFor, setPhotoMenuFor] = useState<string | null>(null);

  // Reason inputs
  const [rejectReason, setRejectReason] = useState('');
  const [rejectError, setRejectError] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [declineError, setDeclineError] = useState('');

  // Spare part request (SUP) + Tech request
  const [reqPartId, setReqPartId] = useState('');
  const [reqQty, setReqQty] = useState('');
  const [reqReason, setReqReason] = useState('');
  const [reqPartMenu, setReqPartMenu] = useState(false);
  const [reqError, setReqError] = useState('');

  // Record part replacement (TECH)
  const [recSource, setRecSource] = useState('IMS Stock');
  const [recPartId, setRecPartId] = useState(''); // IMS Stock path
  const [recPartMenu, setRecPartMenu] = useState(false);
  const [recName, setRecName] = useState(''); // Purchase Separately path
  const [recCode, setRecCode] = useState('');
  const [recQty, setRecQty] = useState('');
  const [recError, setRecError] = useState('');

  // Sign-off sequence state — must live here (before any early returns) to keep hook order stable
  const [signStep, setSignStep] = useState(1);
  const [signIsResubmit, setSignIsResubmit] = useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // An item counts as complete only when marked done AND its required
  // Description / Photos are satisfied (WBS 7.2.6 / 7.2.10).
  const itemComplete = (c: ChecklistItem) =>
    c.done &&
    (!c.descriptionRequired || !!(c.description ?? '').trim()) &&
    (!c.photoRequired || photos.some((p) => p.name.includes(c.id)));
  const doneCount = useMemo(
    () => checklist.filter(itemComplete).length,
    [checklist, photos]
  );
  const allDone = checklist.length > 0 && doneCount === checklist.length;

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
        <AppHeader title="Work Order" showBack />
        <SkeletonList count={4} />
      </SafeAreaView>
    );
  }

  if (!base) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
        <AppHeader title="Work Order" showBack />
        <View style={{ paddingTop: spacing.xxxl }}>
          <EmptyState
            icon="alert-circle-outline"
            message="Failed to load work order details. Please go back and try again."
          />
        </View>
      </SafeAreaView>
    );
  }

  const wo = base;
  const isTechActive = role === 'TECH' && status === 'Started';
  const activeStage = stageIndex(status);

  const addHistory = (text: string) => {
    const ts = new Date().toISOString().slice(0, 16).replace('T', ' ');
    setHistory((prev) => [...prev, { id: `lh-${prev.length}`, timestamp: ts, text }]);
  };

  /* ----------------------------- Actions -------------------------------- */

  const confirmSignOffClose = () => {
    setSignOffDialog(false);
    setStatus('Closed');
    addHistory('Signed off and closed by Building Manager');
    showToast('Work order closed successfully.', 'success');
  };

  const submitReject = () => {
    if (!rejectReason.trim()) {
      setRejectError('Rejection reason is required.');
      return;
    }
    setRejectSheet(false);
    setRejectError('');
    setRejectReason('');
    setStatus('Verification Rejected');
    addHistory('Returned to Supervisor by Building Manager');
    showToast('Work order returned to Supervisor.', 'success');
  };

  const confirmStart = () => {
    setStartDialog(false);
    setStatus('Started');
    addHistory('Execution started');
    showToast('Work order started.', 'success');
  };

  const approveSubmit = () => {
    setSignOffSupDialog(false);
    setStatus('Verified');
    addHistory('Signed off and forwarded to Building Manager by Supervisor');
    showToast('Work order forwarded to Building Manager.', 'success');
  };

  const resubmitToBm = () => {
    setResubmitBmDialog(false);
    setStatus('Verified');
    addHistory('Reviewed and resubmitted to Building Manager by Supervisor');
    showToast('Work order resubmitted to Building Manager.', 'success');
  };

  const submitDecline = () => {
    if (!declineReason.trim()) {
      setDeclineError('Rejection reason is required.');
      return;
    }
    setDeclineSheet(false);
    setDeclineError('');
    setDeclineReason('');
    setStatus('Completion Rejected');
    addHistory('Returned to technician by Supervisor');
    showToast('Work order returned to Technician.', 'success');
  };

  // Sign-off sequence (WBS 7.2.10): Step 1 self, Step 2 Building Technician,
  // Step 3 Tenant (skipped when no tenant configured). isResubmit drives the
  // final success toast (7.2.11).
  const tenantConfigured = !!wo.tenantContact && !wo.tenantContact.startsWith('N/A');

  const finishSignOff = () => {
    setTechSignSheet(false);
    setSignStep(1);
    setStatus('Completed');
    if (signIsResubmit) {
      addHistory('Resubmitted by technician');
      showToast('Work order resubmitted for Supervisor review.', 'success');
    } else {
      addHistory('Completed and signed off by technician');
      showToast('Work order submitted for Supervisor review.', 'success');
    }
  };

  const advanceSignOff = () => {
    // Step 1 -> 2 -> (3 if tenant) -> finish.
    if (signStep === 1) {
      setSignStep(2);
    } else if (signStep === 2) {
      if (tenantConfigured) setSignStep(3);
      else finishSignOff();
    } else {
      finishSignOff();
    }
  };

  const startSignOff = (isResubmit: boolean) => {
    if (!allDone) {
      showToast('Please complete all required checklist items before submitting.', 'error');
      return;
    }
    setSignIsResubmit(isResubmit);
    setSignStep(1);
    setTechSignSheet(true);
  };

  const submitSpareRequest = (isTech: boolean) => {
    if (!reqPartId) {
      setReqError('Please select a spare part.');
      return;
    }
    const q = Number(reqQty);
    if (!reqQty || Number.isNaN(q) || q < 1) {
      setReqError('Please enter a valid quantity.');
      return;
    }
    const selPart = spareParts.find((s) => s.id === reqPartId);
    if (selPart && q > selPart.available) {
      // Warning (not blocking) — flagged Unavailable.
      showToast('Requested quantity exceeds available stock. This request will be flagged as Unavailable.', 'info');
    }
    setReqError('');
    setReqPartId('');
    setReqQty('');
    setReqReason('');
    if (isTech) {
      setTechRequestSheet(false);
      showToast('Spare parts request submitted for Building Manager approval.', 'success');
    } else {
      setSparePartSheet(false);
      showToast('Spare parts request submitted for Building Manager approval.', 'success');
    }
  };

  const submitRecordPart = () => {
    const isIms = recSource === 'IMS Stock';
    const imsPart = spareParts.find((s) => s.id === recPartId);
    if (isIms && !recPartId) {
      setRecError('Please select a spare part.');
      return;
    }
    if (!isIms && !recName.trim()) {
      setRecError('Part name is required.');
      return;
    }
    const q = Number(recQty);
    if (!recQty || Number.isNaN(q) || q < 1) {
      setRecError('Please enter a valid quantity.');
      return;
    }
    if (isIms && imsPart && q > imsPart.available) {
      // Warning (not blocking) per WBS.
      showToast('Requested quantity exceeds available stock. Continue?', 'info');
    }
    setParts((prev) => [
      ...prev,
      {
        id: `lp-${prev.length}`,
        source: recSource,
        name: isIms ? imsPart?.name ?? '' : recName.trim(),
        code: isIms ? imsPart?.code ?? '' : recCode.trim(),
        quantity: q,
      },
    ]);
    setRecSource('IMS Stock');
    setRecPartId('');
    setRecName('');
    setRecCode('');
    setRecQty('');
    setRecError('');
    setRecordPartSheet(false);
    showToast('Part replacement recorded.', 'success');
  };

  const toggleChecklist = (itemId: string) => {
    if (!isTechActive) return;
    const item = checklist.find((c) => c.id === itemId);
    if (!item) return;
    // When marking DONE, enforce per-item required Description / Photos (7.2.6).
    if (!item.done) {
      if (item.descriptionRequired && !(item.description ?? '').trim()) {
        showToast('Description required.', 'error');
        return;
      }
      if (item.photoRequired && !photos.some((p) => p.name.includes(item.id))) {
        showToast('At least 1 photo required.', 'error');
        return;
      }
    }
    setChecklist((prev) => prev.map((c) => (c.id === itemId ? { ...c, done: !c.done } : c)));
  };

  const setItemDescription = (itemId: string, text: string) => {
    setChecklist((prev) => prev.map((c) => (c.id === itemId ? { ...c, description: text } : c)));
  };

  const addPhoto = (itemId: string) => {
    setPhotoMenuFor(null);
    setPhotos((prev) => [...prev, { id: `lph-${prev.length}`, name: `photo_${itemId}_${prev.length}.jpg` }]);
    showToast('Photo added.', 'success');
  };

  const callPhone = async (phone: string) => {
    try {
      const url = `tel:${phone.replace(/\s+/g, '')}`;
      const ok = await Linking.canOpenURL(url);
      if (ok) await Linking.openURL(url);
      else showToast('Unable to start a call on this device.', 'error');
    } catch {
      showToast('Unable to start a call on this device.', 'error');
    }
  };

  /* ----------------------------- Render --------------------------------- */

  const overdueColor = wo.overdue ? palette.accentCoral : theme.colors.onSurface;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title="Work Order" showBack />

      <ScrollView
        contentContainerStyle={{
          padding: spacing.md,
          paddingBottom: spacing.xxxl,
          gap: spacing.md,
          width: '100%',
          maxWidth,
          alignSelf: 'center',
        }}
      >
        {/* Header */}
        <AnimatedEntrance index={0}>
          <ElevatedCard level="raised">
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <IconContainer icon="clipboard-text-outline" category="workOrder" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '800', color: theme.colors.onSurface }}>
                  {wo.assetCode} · {wo.type}
                </Text>
                <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: 2 }}>
                  {wo.id}
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8, alignItems: 'center' }}>
                  <StatusChip label={status} />
                  <MetaPill label={wo.type} color={palette.accentViolet} icon="tag-outline" />
                  <MetaPill label={`Created ${wo.createdDate}`} color={palette.accentCyan} icon="calendar-plus" />
                </View>
              </View>
            </View>
          </ElevatedCard>
        </AnimatedEntrance>

        {/* 5-stage progress */}
        <AnimatedEntrance index={1}>
          <ElevatedCard>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
              {STAGES.map((s, i) => (
                <View key={s} style={{ flex: 1, alignItems: 'center' }}>
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: i <= activeStage ? palette.primary : theme.colors.surfaceVariant,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {i < activeStage ? (
                      <MaterialCommunityIcons name="check" size={16} color={palette.white} />
                    ) : (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '700',
                          color: i === activeStage ? palette.white : theme.colors.onSurfaceVariant,
                        }}
                      >
                        {i + 1}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      marginTop: 4,
                      textAlign: 'center',
                      color: i <= activeStage ? theme.colors.onSurface : theme.colors.onSurfaceVariant,
                      fontWeight: i === activeStage ? '700' : '400',
                    }}
                  >
                    {s}
                  </Text>
                </View>
              ))}
            </View>
            <ProgressBar
              progress={(activeStage + 1) / STAGES.length}
              color={palette.primary}
              style={{ height: 6, borderRadius: 3, marginTop: spacing.xs }}
            />
            <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, marginTop: spacing.sm }}>
              {stageContextLabel(status)}
            </Text>
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Rejection banners */}
        {status === 'Completion Rejected' ? (
          <ElevatedCard style={{ backgroundColor: withAlpha(palette.error, 0.1) }}>
            <Text style={{ color: palette.error, fontWeight: '700' }}>
              Rejected by Supervisor Maria Santos on 14/06/2026. Reason: Hose photo unclear, please retake.
            </Text>
          </ElevatedCard>
        ) : null}
        {status === 'Verification Rejected' ? (
          <ElevatedCard style={{ backgroundColor: withAlpha(palette.error, 0.1) }}>
            <Text style={{ color: palette.error, fontWeight: '700' }}>
              Rejected by Daniel Lim on 16/06/2026. Reason: Sign-off signature missing on checklist item 3.
            </Text>
          </ElevatedCard>
        ) : null}
        {status === 'Ad-hoc Declined' ? (
          <ElevatedCard style={{ backgroundColor: withAlpha(palette.error, 0.1) }}>
            <View style={{ flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' }}>
              <MaterialCommunityIcons name="alert-circle-outline" size={20} color={palette.error} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: palette.error, fontWeight: '700', marginBottom: 4 }}>
                  Ad-hoc Work Order Declined
                </Text>
                <Text style={{ color: palette.error, fontSize: 13, lineHeight: 18 }}>
                  The ad-hoc service request was declined by the MSP Supervisor. Please review, make the necessary updates, and resubmit for approval.
                </Text>
              </View>
            </View>
          </ElevatedCard>
        ) : null}

        {/* Overview */}
        <AnimatedEntrance index={2}>
          <SectionHeader title="Overview" icon="information-outline" />
          <ElevatedCard>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.xs, gap: spacing.md }}>
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, flex: 1 }}>Start Time</Text>
              <Text style={{ color: theme.colors.onSurface, fontSize: 14, fontWeight: '600', flex: 1, textAlign: 'right' }}>
                {wo.startTime ?? '—'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.xs, gap: spacing.md }}>
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, flex: 1 }}>End Time</Text>
              <Text style={{ color: overdueColor, fontSize: 14, fontWeight: '600', flex: 1, textAlign: 'right' }}>
                {wo.endTime ?? (wo.overdue ? 'Overdue' : '—')}
              </Text>
            </View>
            <DetailRow label="Time Required" value={wo.timeRequired} />
            <DetailRow label="Due Date" value={wo.dueDate} />
            <DetailRow label="Location" value={`${wo.building} · ${wo.floor} · ${wo.area}`} />
            <DetailRow label="Asset Code" value={wo.assetCode} />
            <DetailRow label="Asset Type" value={wo.assetType} />
            <DetailRow label="Sub-system" value={wo.subSystem} />
            <DetailRow label="System" value={wo.system} />
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Draft status instruction */}
        {status === 'Draft' ? (
          <ElevatedCard style={{ backgroundColor: withAlpha(palette.info, 0.1) }}>
            <View style={{ flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' }}>
              <MaterialCommunityIcons name="information-outline" size={20} color={palette.info} />
              <Text style={{ flex: 1, color: theme.colors.onSurface, fontSize: 13, lineHeight: 19 }}>
                This work order has been assigned to you. Please review the details and start execution.
              </Text>
            </View>
          </ElevatedCard>
        ) : null}

        {/* Tabs */}
        <AnimatedEntrance index={3}>
          <SegmentedButtons
            value={tab}
            onValueChange={(v) => setTab(v as 'details' | 'execution' | 'members')}
            buttons={[
              { value: 'details', label: 'Details', icon: 'text-box-outline' },
              { value: 'execution', label: `Execution (${doneCount}/${checklist.length})`, icon: 'progress-wrench' },
              { value: 'members', label: 'Members', icon: 'account-group-outline' },
            ]}
          />
        </AnimatedEntrance>

        {tab === 'details' ? (
          <>
            <SectionHeader title="Schedule" icon="calendar-clock-outline" />
            <ElevatedCard>
              <DetailRow label="Start Time" value={wo.startTime ?? '—'} />
              <DetailRow
                label="End Time"
                value={wo.endTime ?? (wo.overdue ? '⚠ Overdue' : '—')}
              />
              <DetailRow label="Time Required" value={wo.timeRequired} />
              <DetailRow label="Asset Code" value={wo.assetCode} />
              <DetailRow label="Location" value={`${wo.building} · ${wo.floor} · ${wo.area}`} />
            </ElevatedCard>

            <SectionHeader title="Description" icon="text-box-outline" />
            <ElevatedCard>
              <Text style={{ color: theme.colors.onSurface, fontSize: 14, lineHeight: 20 }}>
                {wo.description}
              </Text>
            </ElevatedCard>

            {wo.remark ? (
              <>
                <SectionHeader title="Remark" icon="comment-text-outline" />
                <ElevatedCard>
                  <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>{wo.remark}</Text>
                </ElevatedCard>
              </>
            ) : null}

            {wo.cause ? (
              <>
                <SectionHeader title="Cause" icon="alert-outline" />
                <ElevatedCard>
                  <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>{wo.cause}</Text>
                </ElevatedCard>
              </>
            ) : null}

            <SectionHeader title={`Photos (${photos.length})`} icon="image-multiple-outline" />
            {photos.length === 0 ? (
              <ElevatedCard>
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14 }}>No photos uploaded.</Text>
              </ElevatedCard>
            ) : (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
                {photos.map((p) => (
                  <PressableScale key={p.id} onPress={() => setViewPhoto(p.name)}>
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: radius.md,
                        backgroundColor: withAlpha(palette.info, 0.18),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MaterialCommunityIcons name="image-outline" size={32} color={palette.info} />
                    </View>
                  </PressableScale>
                ))}
              </View>
            )}

          </>
        ) : tab === 'members' ? (
          <>
            <SectionHeader title="Technicians" icon="account-hard-hat" />
            <View style={{ gap: spacing.sm }}>
              <PressableScale onPress={() => callPhone(getTechnician(wo.mainTechnicianId)?.phone ?? '')}>
                <TechnicianCard techId={wo.mainTechnicianId} />
              </PressableScale>
              {wo.subTechnicianId ? (
                <PressableScale onPress={() => callPhone(getTechnician(wo.subTechnicianId!)?.phone ?? '')}>
                  <TechnicianCard techId={wo.subTechnicianId} />
                </PressableScale>
              ) : null}
            </View>
          </>
        ) : (
          <>
            <SectionHeader title={`Work Checklist (${doneCount} of ${checklist.length})`} icon="format-list-checks" />
            <ElevatedCard noPadding>
              {checklist.map((c, idx) => (
                <List.Accordion
                  key={c.id}
                  title={c.text}
                  titleNumberOfLines={3}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={c.done ? 'check-circle' : 'circle-outline'}
                      color={c.done ? palette.success : theme.colors.onSurfaceVariant}
                    />
                  )}
                  style={{ backgroundColor: theme.colors.surface }}
                >
                  <View style={{ paddingHorizontal: spacing.md, paddingBottom: spacing.sm, gap: spacing.xs }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xxs }}>
                      {c.descriptionRequired ? (
                        <MetaPill label="Description required" color={palette.accentViolet} icon="text" />
                      ) : null}
                      {c.photoRequired ? (
                        <MetaPill label="Photo required" color={palette.accentAmber} icon="camera-outline" />
                      ) : null}
                    </View>
                    {c.remark ? (
                      <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 13 }}>
                        Remark: {c.remark}
                      </Text>
                    ) : null}
                    {/* Description field — shown when item has a description setting (7.2.6) */}
                    {c.descriptionRequired || c.description !== undefined ? (
                      <TextInput
                        mode="outlined"
                        label={c.descriptionRequired ? 'Description *' : 'Description'}
                        placeholder="Enter description..."
                        value={c.description ?? ''}
                        onChangeText={(t) => setItemDescription(c.id, t)}
                        editable={isTechActive}
                        multiline
                        dense
                      />
                    ) : null}
                    {/* Photo thumbnails for this item */}
                    {photos.filter((p) => p.name.includes(c.id)).length > 0 ? (
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
                        {photos
                          .filter((p) => p.name.includes(c.id))
                          .map((p) => (
                            <PressableScale key={p.id} onPress={() => setViewPhoto(p.name)}>
                              <View
                                style={{
                                  width: 56,
                                  height: 56,
                                  borderRadius: radius.sm,
                                  backgroundColor: withAlpha(palette.info, 0.18),
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <MaterialCommunityIcons name="image-outline" size={22} color={palette.info} />
                              </View>
                            </PressableScale>
                          ))}
                      </View>
                    ) : null}
                    {isTechActive ? (
                      <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs }}>
                        <Button
                          mode={c.done ? 'outlined' : 'contained'}
                          compact
                          onPress={() => toggleChecklist(c.id)}
                          buttonColor={c.done ? undefined : palette.success}
                        >
                          {c.done ? 'Mark not done' : 'Done'}
                        </Button>
                        {c.photoRequired || c.description !== undefined ? (
                          <Button mode="outlined" compact icon="camera-plus-outline" onPress={() => setPhotoMenuFor(c.id)}>
                            Add Photo
                          </Button>
                        ) : null}
                      </View>
                    ) : null}
                  </View>
                  {idx < checklist.length - 1 ? <Divider /> : null}
                </List.Accordion>
              ))}
              {checklist.length === 0 ? (
                <Text style={{ padding: spacing.md, color: theme.colors.onSurfaceVariant }}>
                  No checklist items.
                </Text>
              ) : null}
            </ElevatedCard>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 17, fontWeight: '600', color: theme.colors.onSurface }}>
                Part Replacement
              </Text>
              {isTechActive ? (
                <Button mode="text" compact icon="plus" onPress={() => setRecordPartSheet(true)}>
                  Record
                </Button>
              ) : null}
            </View>
            <ElevatedCard>
              {parts.length === 0 ? (
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14 }}>No parts recorded.</Text>
              ) : (
                parts.map((p, i) => (
                  <View key={p.id}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.xs }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: theme.colors.onSurface, fontSize: 14, fontWeight: '600' }}>
                          {p.name}
                        </Text>
                        <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>
                          {p.source} · {p.code || 'No code'}
                        </Text>
                      </View>
                      <MetaPill label={`Qty ${p.quantity}`} color={palette.accentCyan} icon="numeric" />
                    </View>
                    {i < parts.length - 1 ? <Divider /> : null}
                  </View>
                ))
              )}
            </ElevatedCard>

            {isTechActive ? (
              <Button mode="outlined" icon="package-variant-closed" onPress={() => setTechRequestSheet(true)}>
                Create Spare Parts Request
              </Button>
            ) : null}

            {wo.planName ? (
              <>
                <SectionHeader title="Maintenance Plan" icon="calendar-sync-outline" />
                <ElevatedCard>
                  <DetailRow label="Plan" value={wo.planName} />
                  {wo.round ? <DetailRow label="Round" value={wo.round} /> : null}
                </ElevatedCard>
              </>
            ) : null}

            {wo.tenantContact ? (
              <>
                <SectionHeader title="Tenant Contact" icon="account-outline" />
                <ElevatedCard>
                  <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>{wo.tenantContact}</Text>
                </ElevatedCard>
              </>
            ) : null}

            <SectionHeader title="History" icon="history" />
            <ElevatedCard>
              {(expandedHistory ? history : history.slice(-5)).map((h) => (
                <View key={h.id} style={{ flexDirection: 'row', gap: spacing.sm, paddingVertical: spacing.xs }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: palette.primary, marginTop: 6 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>{h.text}</Text>
                    <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>{h.timestamp}</Text>
                  </View>
                </View>
              ))}
              {history.length > 5 ? (
                <Button mode="text" compact onPress={() => setExpandedHistory((v) => !v)}>
                  {expandedHistory ? 'Show less' : 'Show all'}
                </Button>
              ) : null}
            </ElevatedCard>
          </>
        )}

        {/* SUP Request Spare Parts trigger (any active status) */}
        {role === 'SUP' &&
        !['Closed', 'Cancelled'].includes(status) ? (
          <Button mode="outlined" icon="package-variant-closed" onPress={() => setSparePartSheet(true)}>
            Request Spare Parts
          </Button>
        ) : null}
      </ScrollView>

      {/* Sticky actions */}
      {renderActionBar()}

      {/* Photo full-size viewer */}
      <Portal>
        <Modal
          visible={!!viewPhoto}
          onDismiss={() => setViewPhoto(null)}
          contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <PressableScale onPress={() => setViewPhoto(null)} accessibilityLabel="Dismiss photo">
            <View
              style={{
                width: Math.min(maxWidth - 40, 340),
                height: Math.min(maxWidth - 40, 340),
                borderRadius: radius.lg,
                backgroundColor: withAlpha(palette.info, 0.25),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialCommunityIcons name="image-outline" size={96} color={palette.info} />
              <Text style={{ color: theme.colors.onSurface, fontWeight: '700', marginTop: spacing.md }}>
                {viewPhoto}
              </Text>
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 13, marginTop: 4 }}>
                Tap to dismiss
              </Text>
            </View>
          </PressableScale>
        </Modal>
      </Portal>

      {/* Dialogs */}
      <Portal>
        <Dialog visible={signOffDialog} onDismiss={() => setSignOffDialog(false)}>
          <Dialog.Title>Sign Off & Close</Dialog.Title>
          <Dialog.Content>
            <Text>Sign off and close Work Order {wo.id}? This action cannot be undone.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setSignOffDialog(false)}>Cancel</Button>
            <Button textColor={theme.colors.error} onPress={confirmSignOffClose}>
              Sign Off & Close
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={startDialog} onDismiss={() => setStartDialog(false)}>
          <Dialog.Title>Start Work Order</Dialog.Title>
          <Dialog.Content>
            <Text>Start Work Order {wo.id}? This will mark the work as in progress.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setStartDialog(false)}>Cancel</Button>
            <Button onPress={confirmStart}>Start</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={signOffSupDialog} onDismiss={() => setSignOffSupDialog(false)}>
          <Dialog.Title>Sign Off & Forward to BM</Dialog.Title>
          <Dialog.Content>
            <Text>Sign off and forward to Building Manager? Verify all checklist items, photos, and signatures are complete.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setSignOffSupDialog(false)}>Cancel</Button>
            <Button onPress={approveSubmit}>Sign Off</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={resubmitBmDialog} onDismiss={() => setResubmitBmDialog(false)}>
          <Dialog.Title>Review & Resubmit to BM</Dialog.Title>
          <Dialog.Content>
            <Text>Confirm that you have addressed the rejection reason and the work order is ready for resubmission.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setResubmitBmDialog(false)}>Cancel</Button>
            <Button onPress={resubmitToBm}>Resubmit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Bottom sheets */}
      {renderRejectSheet()}
      {renderDeclineSheet()}
      {renderTechSignSheet()}
      {renderSpareRequestSheet(false)}
      {renderSpareRequestSheet(true)}
      {renderRecordPartSheet()}

      {/* Photo source menu */}
      <Portal>
        {photoMenuFor ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: theme.colors.backdrop,
              justifyContent: 'flex-end',
            }}
          >
            <PressableScale onPress={() => setPhotoMenuFor(null)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard level="floating" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.onSurface, marginBottom: spacing.sm }}>
                Add Photo
              </Text>
              <List.Item
                title="Take Photo"
                left={(p) => <List.Icon {...p} icon="camera" />}
                onPress={() => photoMenuFor && addPhoto(photoMenuFor)}
              />
              <List.Item
                title="Choose from Library"
                left={(p) => <List.Icon {...p} icon="image-multiple" />}
                onPress={() => photoMenuFor && addPhoto(photoMenuFor)}
              />
              <Button mode="text" onPress={() => setPhotoMenuFor(null)}>
                Cancel
              </Button>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>
    </SafeAreaView>
  );

  /* ---------------------- Action bar (conditional) ---------------------- */
  function renderActionBar() {
    if (role === 'TECH' && status === 'Draft') {
      return (
        <StickyActionBar>
          <Button
            mode="outlined"
            style={{ flex: 1 }}
            textColor={theme.colors.error}
            onPress={() => {
              setStatus('Cancelled');
              addHistory('Draft work order deleted by technician');
              showToast('Work order deleted.', 'success');
              safeBack();
            }}
          >
            Delete
          </Button>
          <Button
            mode="contained"
            style={{ flex: 1 }}
            buttonColor={palette.primary}
            onPress={() => {
              setStatus('Pending');
              addHistory('Work order submitted by technician');
              showToast('Work order submitted for Supervisor review.', 'success');
            }}
          >
            Submit
          </Button>
        </StickyActionBar>
      );
    }
    if (role === 'BM' && status === 'Verified') {
      return (
        <StickyActionBar>
          <View style={{ flex: 1, gap: spacing.sm }}>
            <Button mode="contained" buttonColor={palette.primary} onPress={() => setSignOffDialog(true)}>
              Sign Off & Close
            </Button>
            <Button mode="outlined" textColor={theme.colors.error} onPress={() => setRejectSheet(true)}>
              Reject
            </Button>
          </View>
        </StickyActionBar>
      );
    }
    if (role === 'SUP' && status === 'Pending - Unassigned') {
      return (
        <StickyActionBar>
          <Button
            mode="contained"
            style={{ flex: 1 }}
            buttonColor={palette.primary}
            onPress={() => router.push(`/assign-work-order/${wo.id}`)}
          >
            Assign to Technician
          </Button>
        </StickyActionBar>
      );
    }
    if (role === 'SUP' && status === 'Completed') {
      return (
        <StickyActionBar>
          <Button mode="outlined" style={{ flex: 1 }} textColor={theme.colors.error} onPress={() => setDeclineSheet(true)}>
            Reject
          </Button>
          <Button mode="contained" style={{ flex: 1 }} buttonColor={palette.primary} onPress={() => setSignOffSupDialog(true)}>
            Sign Off & Forward to BM
          </Button>
        </StickyActionBar>
      );
    }
    if (role === 'SUP' && status === 'Verification Rejected') {
      return (
        <StickyActionBar>
          <Button mode="contained" style={{ flex: 1 }} buttonColor={palette.primary} onPress={() => setResubmitBmDialog(true)}>
            Review & Resubmit to BM
          </Button>
        </StickyActionBar>
      );
    }
    if (role === 'TECH' && status === 'Assigned') {
      return (
        <StickyActionBar>
          <Button mode="contained" style={{ flex: 1 }} buttonColor={palette.primary} onPress={() => setStartDialog(true)}>
            Start Work Order
          </Button>
        </StickyActionBar>
      );
    }
    if (role === 'TECH' && status === 'Started') {
      return (
        <StickyActionBar>
          <View style={{ flex: 1 }}>
            {!allDone ? (
              <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, marginBottom: 4, textAlign: 'center' }}>
                Complete all required checklist items to submit.
              </Text>
            ) : null}
            <Button
              mode="contained"
              buttonColor={palette.primary}
              disabled={!allDone}
              onPress={() => startSignOff(false)}
            >
              Submit & Sign Off
            </Button>
          </View>
        </StickyActionBar>
      );
    }
    if (role === 'TECH' && status === 'Completion Rejected') {
      return (
        <StickyActionBar>
          {/* No confirmation popup — proceeds directly after validation (7.2.11). */}
          <Button mode="contained" style={{ flex: 1 }} buttonColor={palette.primary} onPress={() => startSignOff(true)}>
            Review & Resubmit
          </Button>
        </StickyActionBar>
      );
    }
    if (role === 'TECH' && status === 'Ad-hoc Declined') {
      return (
        <StickyActionBar>
          <Button
            mode="outlined"
            style={{ flex: 1 }}
            textColor={theme.colors.error}
            onPress={() => {
              setStatus('Cancelled');
              addHistory('Ad-hoc work order deleted by technician');
              showToast('Work order deleted.', 'success');
              safeBack();
            }}
          >
            Delete
          </Button>
          <Button
            mode="contained"
            style={{ flex: 1 }}
            buttonColor={palette.primary}
            onPress={() => {
              setStatus('Pending');
              addHistory('Ad-hoc work order resubmitted by technician');
              showToast('Work order resubmitted for Supervisor review.', 'success');
            }}
          >
            Resubmit
          </Button>
        </StickyActionBar>
      );
    }
    return null;
  }

  /* --------------------------- Reason sheets ---------------------------- */
  function reasonCounterColor(len: number) {
    return len >= COUNTER_RED ? theme.colors.error : theme.colors.onSurfaceVariant;
  }

  function renderRejectSheet() {
    return (
      <Portal>
        {rejectSheet ? (
          <View style={sheetBackdrop()}>
            <PressableScale onPress={() => setRejectSheet(false)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard level="floating" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, gap: spacing.sm }}>
              <Text style={sheetTitle()}>Reject Work Order</Text>
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14 }}>
                Provide a reason for rejection. The MSP Supervisor will be notified.
              </Text>
              <TextInput
                mode="outlined"
                label="Rejection Reason"
                placeholder="Describe why this work order is being rejected..."
                value={rejectReason}
                onChangeText={(t) => {
                  setRejectReason(t);
                  if (t.trim()) setRejectError('');
                }}
                multiline
                numberOfLines={4}
                maxLength={DESC_MAX}
                autoFocus
                error={!!rejectError}
              />
              <Text style={{ alignSelf: 'flex-end', fontSize: 12, color: reasonCounterColor(rejectReason.length) }}>
                {rejectReason.length}/{DESC_MAX}
              </Text>
              {rejectError ? <Text style={{ color: theme.colors.error, fontSize: 13 }}>{rejectError}</Text> : null}
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button mode="text" style={{ flex: 1 }} onPress={() => setRejectSheet(false)}>
                  Cancel
                </Button>
                <Button mode="contained" style={{ flex: 1 }} buttonColor={theme.colors.error} onPress={submitReject}>
                  Reject
                </Button>
              </View>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>
    );
  }

  function renderDeclineSheet() {
    return (
      <Portal>
        {declineSheet ? (
          <View style={sheetBackdrop()}>
            <PressableScale onPress={() => setDeclineSheet(false)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard level="floating" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, gap: spacing.sm }}>
              <Text style={sheetTitle()}>Reject Work Order</Text>
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14 }}>
                Provide a reason. The work order will be returned to the technician.
              </Text>
              <TextInput
                mode="outlined"
                label="Rejection Reason"
                placeholder="Describe what needs to be corrected..."
                value={declineReason}
                onChangeText={(t) => {
                  setDeclineReason(t);
                  if (t.trim()) setDeclineError('');
                }}
                multiline
                numberOfLines={4}
                maxLength={DESC_MAX}
                autoFocus
                error={!!declineError}
              />
              <Text style={{ alignSelf: 'flex-end', fontSize: 12, color: reasonCounterColor(declineReason.length) }}>
                {declineReason.length}/{DESC_MAX}
              </Text>
              {declineError ? <Text style={{ color: theme.colors.error, fontSize: 13 }}>{declineError}</Text> : null}
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button mode="text" style={{ flex: 1 }} onPress={() => setDeclineSheet(false)}>
                  Cancel
                </Button>
                <Button mode="contained" style={{ flex: 1 }} buttonColor={theme.colors.error} onPress={submitDecline}>
                  Decline
                </Button>
              </View>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>
    );
  }

  function renderTechSignSheet() {
    const totalSteps = tenantConfigured ? 3 : 2;
    const stepMeta =
      signStep === 1
        ? { title: 'Your Sign-off', prompt: 'Sign off as MSP Technician A to confirm work completion.' }
        : signStep === 2
        ? { title: 'Building Technician Sign-off', prompt: 'Have the Building Technician sign off to witness completion.' }
        : { title: 'Tenant Sign-off', prompt: 'Have the Tenant confirm work completion.' };
    return (
      <Portal>
        {techSignSheet ? (
          <View style={sheetBackdrop()}>
            <PressableScale onPress={() => setTechSignSheet(false)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard level="floating" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, gap: spacing.sm }}>
              <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>
                Step {signStep} of {totalSteps}
              </Text>
              <Text style={sheetTitle()}>{stepMeta.title}</Text>
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14 }}>{stepMeta.prompt}</Text>
              {signStep === 2 ? (
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 13, fontStyle: 'italic' }}>
                  Present device to Building Technician.
                </Text>
              ) : null}
              {signStep === 3 ? (
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 13, fontStyle: 'italic' }}>
                  Present device to Tenant.
                </Text>
              ) : null}
              <View
                style={{
                  height: 120,
                  borderRadius: radius.md,
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: theme.colors.outline,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MaterialCommunityIcons name="draw" size={28} color={theme.colors.onSurfaceVariant} />
                <Text style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>Sign here</Text>
              </View>
              <Button mode="text" compact onPress={() => showToast('Signature cleared.', 'info')}>
                Clear
              </Button>
              <Button mode="contained" buttonColor={palette.primary} onPress={advanceSignOff}>
                Confirm Sign-off
              </Button>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>
    );
  }

  function renderSpareRequestSheet(isTech: boolean) {
    const visible = isTech ? techRequestSheet : sparePartSheet;
    const close = () => (isTech ? setTechRequestSheet(false) : setSparePartSheet(false));
    const part = spareParts.find((s) => s.id === reqPartId);
    return (
      <Portal>
        {visible ? (
          <View style={sheetBackdrop()}>
            <PressableScale onPress={close} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard level="floating" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, gap: spacing.sm }}>
              <Text style={sheetTitle()}>{isTech ? 'Create Spare Parts Request' : 'Request Spare Parts'}</Text>
              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant }}>Spare Part *</Text>
              <Menu
                visible={reqPartMenu}
                onDismiss={() => setReqPartMenu(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setReqPartMenu(true)}
                    icon="chevron-down"
                    contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                  >
                    {part ? `${part.code} · ${part.name}` : 'Select a spare part'}
                  </Button>
                }
              >
                {spareParts.map((s) => (
                  <Menu.Item
                    key={s.id}
                    title={`${s.code} · ${s.name}`}
                    onPress={() => {
                      setReqPartId(s.id);
                      setReqPartMenu(false);
                    }}
                  />
                ))}
              </Menu>
              <TextInput
                mode="outlined"
                label="Quantity *"
                keyboardType="numeric"
                value={reqQty}
                onChangeText={setReqQty}
              />
              <TextInput
                mode="outlined"
                label={isTech ? 'Notes' : 'Reason'}
                value={reqReason}
                onChangeText={setReqReason}
                multiline
              />
              {reqError ? <Text style={{ color: theme.colors.error, fontSize: 13 }}>{reqError}</Text> : null}
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button mode="text" style={{ flex: 1 }} onPress={close}>
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  style={{ flex: 1 }}
                  buttonColor={palette.primary}
                  onPress={() => submitSpareRequest(isTech)}
                >
                  Submit
                </Button>
              </View>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>
    );
  }

  function renderRecordPartSheet() {
    return (
      <Portal>
        {recordPartSheet ? (
          <View style={sheetBackdrop()}>
            <PressableScale onPress={() => setRecordPartSheet(false)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard level="floating" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, gap: spacing.sm }}>
              <Text style={sheetTitle()}>Add Part Replacement</Text>
              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant }}>Source *</Text>
              <SegmentedButtons
                value={recSource}
                onValueChange={(v) => {
                  setRecSource(v);
                  setRecError('');
                }}
                buttons={[
                  { value: 'IMS Stock', label: 'IMS Stock' },
                  { value: 'Purchase Separately', label: 'Purchase Separately' },
                ]}
              />
              {recSource === 'IMS Stock' ? (
                <>
                  <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant }}>Spare Part *</Text>
                  <Menu
                    visible={recPartMenu}
                    onDismiss={() => setRecPartMenu(false)}
                    anchor={
                      <Button
                        mode="outlined"
                        onPress={() => setRecPartMenu(true)}
                        icon="chevron-down"
                        contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                      >
                        {(() => {
                          const p = spareParts.find((s) => s.id === recPartId);
                          return p ? `${p.code} · ${p.name}` : 'Select a spare part';
                        })()}
                      </Button>
                    }
                  >
                    {spareParts
                      .filter((s) => s.status === 'Active')
                      .map((s) => (
                        <Menu.Item
                          key={s.id}
                          title={`${s.code} · ${s.name} (Avail ${s.available})`}
                          onPress={() => {
                            setRecPartId(s.id);
                            setRecPartMenu(false);
                          }}
                        />
                      ))}
                  </Menu>
                </>
              ) : (
                <TextInput
                  mode="outlined"
                  label="Part Name *"
                  value={recName}
                  onChangeText={setRecName}
                  maxLength={100}
                />
              )}
              <TextInput
                mode="outlined"
                label="Quantity *"
                keyboardType="numeric"
                value={recQty}
                onChangeText={setRecQty}
              />
              {recError ? <Text style={{ color: theme.colors.error, fontSize: 13 }}>{recError}</Text> : null}
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button mode="text" style={{ flex: 1 }} onPress={() => setRecordPartSheet(false)}>
                  Cancel
                </Button>
                <Button mode="contained" style={{ flex: 1 }} buttonColor={palette.primary} onPress={submitRecordPart}>
                  Add
                </Button>
              </View>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>
    );
  }

  function sheetBackdrop() {
    return {
      position: 'absolute' as const,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.colors.backdrop,
      justifyContent: 'flex-end' as const,
    };
  }

  function sheetTitle() {
    return { fontSize: 20, fontWeight: '700' as const, color: theme.colors.onSurface };
  }
}
