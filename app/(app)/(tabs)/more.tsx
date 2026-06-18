import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, Button, Portal, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../src/components/AppHeader';
import SettingsRow from '../../../src/components/SettingsRow';
import { AnimatedEntrance, ElevatedCard, PressableScale, SectionHeader } from '../../../src/components/ui';
import { useAuth } from '../../../src/contexts/AuthContext';
import { useLanguage } from '../../../src/contexts/LanguageContext';
import { authRoles, palette, radius, spacing, withAlpha } from '../../../src/theme/theme';

export default function MoreScreen() {
  const theme = useTheme();
  const { currentUser, logout } = useAuth();
  const { lang } = useLanguage();
  const [signOutOpen, setSignOutOpen] = useState(false);
  const role = currentUser?.role ?? 'BM';

  const roleMeta =
    role === 'BM' ? authRoles.buildingManager : role === 'SUP' ? authRoles.mspSupervisor : authRoles.mspTechnician;

  const handleSignOut = async () => {
    setSignOutOpen(false);
    await logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title="More" showNotifications={false} />
      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxxl }}>
        <AnimatedEntrance index={0}>
          <ElevatedCard level="raised" style={{ marginBottom: spacing.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
              <Avatar.Text
                size={56}
                label={currentUser?.avatar ?? '?'}
                style={{ backgroundColor: roleMeta.color }}
                labelStyle={{ color: '#FFFFFF', fontWeight: '700' }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: theme.colors.onSurface }}>
                  {currentUser?.name}
                </Text>
                <Text style={{ fontSize: 14, color: theme.colors.onSurfaceVariant }}>
                  {currentUser?.email}
                </Text>
                <View
                  style={{
                    alignSelf: 'flex-start',
                    marginTop: 6,
                    backgroundColor: roleMeta.bg,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 999,
                  }}
                >
                  <Text style={{ color: roleMeta.color, fontSize: 12, fontWeight: '700' }}>
                    {roleMeta.label}
                  </Text>
                </View>
              </View>
            </View>
          </ElevatedCard>
        </AnimatedEntrance>

        <AnimatedEntrance index={1}>
          <SectionHeader title="Account" accentColor={palette.accentViolet} />
          <ElevatedCard level="raised" noPadding style={{ marginBottom: spacing.lg }}>
            <SettingsRow
              icon="account-circle-outline"
              category="account"
              title="Account Settings"
              subtitle="Profile and password"
              onPress={() => router.push('/account-settings')}
            />
            <SettingsRow
              icon="translate"
              category="navigation"
              title="Language"
              rightText={lang === 'en' ? 'English' : 'Tiếng Việt'}
              onPress={() => router.push('/language')}
              isLast
            />
          </ElevatedCard>
        </AnimatedEntrance>

        <AnimatedEntrance index={2}>
          <SectionHeader title="Operations" accentColor={palette.accentCyan} />
          <ElevatedCard level="raised" noPadding style={{ marginBottom: spacing.lg }}>
            <SettingsRow
              icon="bell-outline"
              category="notifications"
              title="Notifications"
              onPress={() => router.push('/notifications')}
            />
            <SettingsRow
              icon="package-variant-closed"
              category="inventory"
              title="Spare Parts"
              onPress={() => router.push('/spare-parts')}
            />
            {role === 'TECH' ? (
              <>
                <SettingsRow
                  icon="clipboard-list-outline"
                  category="workOrder"
                  title="My Ad-hoc Requests"
                  onPress={() => router.push('/adhoc-requests')}
                />
                <SettingsRow
                  icon="qrcode-scan"
                  iconColor={palette.accentAmber}
                  title="Scan Asset QR Code"
                  onPress={() => router.push('/qr-scan')}
                />
                <SettingsRow
                  icon="wifi-off"
                  category="navigation"
                  title="Offline Mode"
                  onPress={() => router.push('/offline')}
                  isLast
                />
              </>
            ) : (
              <SettingsRow
                icon="map-marker-outline"
                category="asset"
                title="Asset Tags on Drawing"
                subtitle="View via Assets tab"
                onPress={() => router.push('/asset-drawing')}
                isLast
              />
            )}
          </ElevatedCard>
        </AnimatedEntrance>

        <AnimatedEntrance index={3}>
          <SectionHeader title="Support" accentColor={palette.secondary} />
          <ElevatedCard level="raised" noPadding>
            <SettingsRow
              icon="lifebuoy"
              category="support"
              title="Help & Support"
              onPress={() => router.push('/notifications')}
            />
            <SettingsRow
              icon="logout"
              title="Sign out"
              danger
              onPress={() => setSignOutOpen(true)}
              isLast
            />
          </ElevatedCard>
        </AnimatedEntrance>
      </ScrollView>

      <Portal>
        {signOutOpen ? (
          <View
            style={{
              position: 'absolute',
              left: 0, right: 0, top: 0, bottom: 0,
              backgroundColor: theme.colors.backdrop,
              justifyContent: 'flex-end',
            }}
          >
            <PressableScale onPress={() => setSignOutOpen(false)} style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
            </PressableScale>
            <ElevatedCard
              level="floating"
              style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, gap: spacing.md }}
            >
              {/* Icon */}
              <View style={{ alignItems: 'center', paddingTop: spacing.sm }}>
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: withAlpha(theme.colors.error, 0.12),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: spacing.sm,
                  }}
                >
                  <MaterialCommunityIcons name="logout" size={32} color={theme.colors.error} />
                </View>
                <Text style={{ fontSize: 20, fontWeight: '700', color: theme.colors.onSurface, textAlign: 'center' }}>
                  Sign Out
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.onSurfaceVariant,
                    textAlign: 'center',
                    marginTop: spacing.xs,
                    lineHeight: 20,
                  }}
                >
                  Are you sure you want to sign out?{'\n'}You will need to log in again to continue.
                </Text>
              </View>

              {/* User summary */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: spacing.sm,
                  backgroundColor: theme.colors.surfaceVariant,
                  borderRadius: radius.md,
                  padding: spacing.sm,
                }}
              >
                <Avatar.Text
                  size={40}
                  label={currentUser?.avatar ?? '?'}
                  style={{ backgroundColor: roleMeta.color }}
                  labelStyle={{ color: '#FFFFFF', fontWeight: '700' }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: theme.colors.onSurface }}>
                    {currentUser?.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>
                    {currentUser?.email}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: roleMeta.bg,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 999,
                  }}
                >
                  <Text style={{ color: roleMeta.color, fontSize: 11, fontWeight: '700' }}>
                    {roleMeta.label}
                  </Text>
                </View>
              </View>

              {/* Actions */}
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button
                  mode="outlined"
                  style={{ flex: 1 }}
                  contentStyle={{ height: 46 }}
                  onPress={() => setSignOutOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  buttonColor={theme.colors.error}
                  style={{ flex: 1 }}
                  contentStyle={{ height: 46 }}
                  icon="logout"
                  onPress={handleSignOut}
                >
                  Sign Out
                </Button>
              </View>
            </ElevatedCard>
          </View>
        ) : null}
      </Portal>
    </SafeAreaView>
  );
}
