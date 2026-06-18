/**
 * Offline Mode — WBS 7.1.6 TECH Offline Mode.
 * Offline indicator banner + toggle + cached-data explanation + Sync now.
 */

import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Banner, Button, Switch, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../src/components/AppHeader';
import {
  AnimatedEntrance,
  DetailRow,
  ElevatedCard,
  IconContainer,
  SectionHeader,
} from '../../src/components/ui';
import { useSnackbar } from '../../src/contexts/SnackbarContext';
import { palette, spacing, statusColors } from '../../src/theme/theme';

export default function OfflineScreen() {
  const theme = useTheme();
  const { showToast } = useSnackbar();
  const [offline, setOffline] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    if (offline) {
      showToast('You are offline. Please reconnect to perform this action.', 'error');
      return;
    }
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      showToast('Sync complete.', 'success');
    }, 1100);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={['top']}
    >
      <AppHeader title="Offline Mode" showBack showNotifications={false} />
      <ScrollView
        contentContainerStyle={{
          padding: spacing.md,
          paddingBottom: spacing.xxxl,
        }}
      >
        {offline ? (
          <AnimatedEntrance index={0}>
            <Banner
              visible
              style={{ marginBottom: spacing.md }}
              icon="wifi-off"
            >
              You are offline. Some features are unavailable.
            </Banner>
          </AnimatedEntrance>
        ) : null}

        {/* Toggle */}
        <AnimatedEntrance index={1}>
          <SectionHeader
            title="Connection"
            icon="wifi-off"
            accentColor={statusColors.overdue.main}
          />
          <ElevatedCard level="raised" style={{ marginBottom: spacing.lg }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.md,
              }}
            >
              <IconContainer
                icon="wifi-off"
                color={statusColors.overdue.main}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: theme.colors.onSurface,
                  }}
                >
                  Offline Mode
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: theme.colors.onSurfaceVariant,
                    marginTop: 2,
                  }}
                >
                  {offline ? 'On — using cached data' : 'Off — connected'}
                </Text>
              </View>
              <Switch
                value={offline}
                onValueChange={setOffline}
                color={palette.primary}
              />
            </View>
          </ElevatedCard>
        </AnimatedEntrance>

        {/* Cached data + sync explanation */}
        <AnimatedEntrance index={2}>
          <SectionHeader
            title="Synchronization"
            icon="cloud-sync-outline"
            accentColor={palette.primary}
          />
          <ElevatedCard level="raised">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.md,
                marginBottom: spacing.md,
              }}
            >
              <IconContainer
                icon="cloud-sync-outline"
                category="workOrder"
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: theme.colors.onSurfaceVariant,
                  lineHeight: 20,
                }}
              >
                When offline, your assigned work orders and assets remain
                available from cached data. Any updates you make are queued and
                automatically synced once a connection is restored.
              </Text>
            </View>

            <DetailRow label="Cached work orders" value="12" />
            <DetailRow label="Queued changes" value={offline ? '3' : '0'} />
            <DetailRow label="Last synced" value="Today, 09:42." />

            <Button
              mode="contained"
              icon="cloud-sync-outline"
              onPress={handleSync}
              loading={syncing}
              disabled={syncing}
              contentStyle={{ height: 52 }}
              style={{ marginTop: spacing.lg }}
            >
              Sync now
            </Button>
          </ElevatedCard>
        </AnimatedEntrance>
      </ScrollView>
    </SafeAreaView>
  );
}
