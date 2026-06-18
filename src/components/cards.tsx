/**
 * cards.tsx — list-row cards for assets, work orders, requests, spare parts.
 * All use ElevatedCard + PressableScale + StatusChip + MetaPill per styleguide.
 */

import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import {
  Asset,
  MaintenanceRequest,
  SparePart,
  WorkOrder,
  getTechnician,
} from '../data/mockData';
import { palette, spacing } from '../theme/theme';
import {
  ElevatedCard,
  IconContainer,
  MetaPill,
  PressableScale,
  StatusChip,
} from './ui';

export function AssetCard({ asset, index }: { asset: Asset; index?: number }) {
  const theme = useTheme();
  return (
    <PressableScale onPress={() => router.push(`/asset/${asset.id}`)} tintColor={palette.accentCyan}>
      <ElevatedCard>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <IconContainer icon="cube-outline" category="asset" />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, fontWeight: '600' }}>
                {asset.code}
              </Text>
              <StatusChip label={asset.status} />
            </View>
            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.onSurface, marginTop: 2 }}>
              {asset.name}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              <MetaPill label={asset.system} color={palette.accentViolet} icon="cog-outline" />
              <MetaPill
                label={`${asset.floor} · ${asset.area}`}
                color={palette.accentCyan}
                icon="map-marker-outline"
              />
            </View>
          </View>
        </View>
      </ElevatedCard>
    </PressableScale>
  );
}

export function WorkOrderCard({ wo, index }: { wo: WorkOrder; index?: number }) {
  const theme = useTheme();
  return (
    <PressableScale onPress={() => router.push(`/work-order/${wo.id}`)} tintColor={palette.info}>
      <ElevatedCard>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <IconContainer
            icon={wo.status === 'Closed' ? 'clipboard-check-outline' : 'clipboard-text-outline'}
            category="workOrder"
          />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: theme.colors.onSurface }}>
                {wo.id}
              </Text>
              <StatusChip label={wo.status} />
            </View>
            <Text style={{ fontSize: 14, color: theme.colors.onSurfaceVariant, marginTop: 2 }}>
              {wo.assetCode} · {wo.floor} {wo.area}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              <MetaPill label={wo.type} color={palette.accentViolet} icon="tag-outline" />
              <MetaPill
                label={`Due ${wo.dueDate}`}
                color={wo.overdue ? palette.accentCoral : palette.accentAmber}
                icon={wo.overdue ? 'calendar-alert' : 'calendar-clock'}
              />
            </View>
          </View>
        </View>
      </ElevatedCard>
    </PressableScale>
  );
}

export function RequestCard({ req, index }: { req: MaintenanceRequest; index?: number }) {
  const theme = useTheme();
  return (
    <PressableScale onPress={() => router.push(`/request/${req.id}`)} tintColor={palette.accentViolet}>
      <ElevatedCard>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <IconContainer icon="file-document-outline" category="request" />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: theme.colors.onSurface }}>
                {req.id}
              </Text>
              <StatusChip label={req.status} />
            </View>
            <Text
              numberOfLines={2}
              style={{ fontSize: 14, color: theme.colors.onSurfaceVariant, marginTop: 4 }}
            >
              {req.description}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              <MetaPill label={req.type} color={palette.accentViolet} icon="tag-outline" />
              <MetaPill label={req.building} color={palette.accentCyan} icon="office-building-outline" />
            </View>
          </View>
        </View>
      </ElevatedCard>
    </PressableScale>
  );
}

export function SparePartCard({ part }: { part: SparePart }) {
  const theme = useTheme();
  const zero = part.available === 0;
  return (
    <PressableScale onPress={() => router.push(`/spare-part/${part.id}`)} tintColor={palette.success}>
      <ElevatedCard>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <IconContainer icon="package-variant-closed" category="inventory" />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant, fontWeight: '600' }}>
                {part.code}
              </Text>
              <StatusChip label={part.status} />
            </View>
            <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.onSurface, marginTop: 2 }}>
              {part.name}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              <MetaPill label={part.system} color={palette.accentViolet} icon="cog-outline" />
              <MetaPill
                label={zero ? 'Out of stock.' : `Available ${part.available}`}
                color={zero ? palette.error : palette.success}
                icon="package-variant"
              />
              <MetaPill label={`Total ${part.total}`} color={palette.accentCyan} icon="warehouse" />
            </View>
          </View>
        </View>
      </ElevatedCard>
    </PressableScale>
  );
}

export function TechnicianCard({ techId }: { techId: string }) {
  const theme = useTheme();
  const tech = getTechnician(techId);
  if (!tech) return null;
  return (
    <ElevatedCard>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
        <IconContainer icon="account-hard-hat" category="account" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: theme.colors.onSurface }}>
            {tech.name}
          </Text>
          <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant }}>{tech.level}</Text>
        </View>
        <MetaPill label={tech.phone} color={palette.secondary} icon="phone-outline" />
      </View>
    </ElevatedCard>
  );
}
