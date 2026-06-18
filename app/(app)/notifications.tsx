/**
 * Notifications — WBS 4.5.1 / 6.4.1 / 7.4.1 Receive Push Notification.
 * Notification list with read indicator, tap-to-detail, pull-to-refresh.
 */

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Banner, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../src/components/AppHeader';
import {
  EmptyState,
  IconContainer,
  PressableScale,
  type IconName,
} from '../../src/components/ui';
import {
  notifications as seedNotifications,
  type NotificationItem,
} from '../../src/data/mockData';
import { palette, radius, spacing, withAlpha } from '../../src/theme/theme';

const routeFor = (item: NotificationItem) => {
  switch (item.linkType) {
    case 'request':
      return `/request/${item.linkId}`;
    case 'workorder':
      return `/work-order/${item.linkId}`;
    case 'sparepart':
      return `/spare-part/${item.linkId}`;
    default:
      return '/';
  }
};

export default function NotificationsScreen() {
  const theme = useTheme();
  const [items, setItems] = useState<NotificationItem[]>(seedNotifications);
  const [refreshing, setRefreshing] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }, []);

  const handlePress = (item: NotificationItem) => {
    setItems((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    router.push(routeFor(item) as never);
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <PressableScale
      onPress={() => handlePress(item)}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.md,
        backgroundColor: item.read
          ? theme.colors.surface
          : withAlpha(palette.accentAmber, 0.06),
        borderRadius: radius.lg,
        padding: spacing.md,
        minHeight: 72,
      }}
    >
      <IconContainer icon={item.icon as IconName} category="notifications" />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: '700',
              color: theme.colors.onSurface,
            }}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          {!item.read ? (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: palette.accentAmber,
              }}
            />
          ) : null}
        </View>
        <Text
          style={{
            fontSize: 13,
            color: theme.colors.onSurfaceVariant,
            marginTop: 2,
          }}
          numberOfLines={2}
        >
          {item.body}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: theme.colors.onSurfaceVariant,
            marginTop: 6,
          }}
        >
          {item.timestamp}
        </Text>
      </View>
    </PressableScale>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={['top']}
    >
      <AppHeader title="Notifications" showBack showNotifications={false} />
      <FlatList
        data={items}
        keyExtractor={(n) => n.id}
        renderItem={renderItem}
        ListHeaderComponent={
          bannerVisible ? (
            <Banner
              visible
              style={{ marginBottom: spacing.sm }}
              icon={({ size }) => (
                <MaterialCommunityIcons
                  name="bell-ring-outline"
                  size={size}
                  color={palette.accentAmber}
                />
              )}
              actions={[
                { label: 'Got it', onPress: () => setBannerVisible(false) },
              ]}
            >
              Enable notifications in device settings to receive alerts.
            </Banner>
          ) : null
        }
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        contentContainerStyle={{
          padding: spacing.md,
          paddingBottom: spacing.xxxl,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <EmptyState icon="bell-off-outline" message="No notifications." />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[palette.primary]}
            tintColor={palette.primary}
          />
        }
      />
    </SafeAreaView>
  );
}
