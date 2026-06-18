/**
 * Account Settings — WBS 4.1.6 / 6.x / 7.x
 * Personal Information (avatar / full name / phone) + Change Password.
 */

import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  Avatar,
  Button,
  Menu,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../src/components/AppHeader';
import {
  AnimatedEntrance,
  ElevatedCard,
  SectionHeader,
} from '../../src/components/ui';
import { useAuth } from '../../src/contexts/AuthContext';
import { useSnackbar } from '../../src/contexts/SnackbarContext';
import { authRoles, palette, spacing } from '../../src/theme/theme';

export default function AccountSettingsScreen() {
  const theme = useTheme();
  const { currentUser, updateUser } = useAuth();
  const { showToast } = useSnackbar();
  const { width } = useWindowDimensions();
  const maxWidth = width >= 600 ? 480 : undefined;

  const role = currentUser?.role ?? 'BM';
  const roleMeta =
    role === 'BM'
      ? authRoles.buildingManager
      : role === 'SUP'
        ? authRoles.mspSupervisor
        : authRoles.mspTechnician;

  // Personal info state
  const [fullName, setFullName] = useState(currentUser?.name ?? '');
  const [phone, setPhone] = useState(currentUser?.phone ?? '');
  const [nameError, setNameError] = useState('');
  const [avatarMenu, setAvatarMenu] = useState(false);

  // Password state
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({});

  const handleAvatarChoice = (source: string) => {
    setAvatarMenu(false);
    showToast(`${source} — feature available in the full app.`, 'info');
  };

  const handleSaveProfile = () => {
    const name = fullName.trim();
    if (!name) {
      setNameError('Full name is required.');
      return;
    }
    if (name.length > 100) {
      setNameError('Full name must not exceed 100 characters.');
      return;
    }
    setNameError('');
    updateUser({ name, phone: phone.trim() });
    showToast('Profile updated successfully.', 'success');
  };

  const handleSavePassword = () => {
    const e: Record<string, string> = {};
    if (!current) e.current = 'Current password is required.';
    if (next.length < 8) e.next = 'Password must be at least 8 characters.';
    if (confirm !== next) e.confirm = 'Passwords do not match.';
    setPwErrors(e);
    if (Object.keys(e).length) return;
    setCurrent('');
    setNext('');
    setConfirm('');
    showToast('Password changed successfully.', 'success');
  };

  const errorText = (msg?: string) =>
    msg ? (
      <Text style={{ color: theme.colors.error, fontSize: 13, marginTop: 4 }}>
        {msg}
      </Text>
    ) : null;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={['top']}
    >
      <AppHeader title="Account Settings" showBack showNotifications={false} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            padding: spacing.md,
            paddingBottom: spacing.xxxl,
            maxWidth,
            width: '100%',
            alignSelf: 'center',
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Personal Information */}
          <AnimatedEntrance index={0}>
            <SectionHeader
              title="Personal Information"
              accentColor={palette.accentViolet}
            />
            <ElevatedCard level="raised" style={{ marginBottom: spacing.lg }}>
              <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
                <Menu
                  visible={avatarMenu}
                  onDismiss={() => setAvatarMenu(false)}
                  anchor={
                    <Avatar.Text
                      size={88}
                      label={currentUser?.avatar ?? '?'}
                      style={{ backgroundColor: roleMeta.color }}
                      labelStyle={{ color: '#FFFFFF', fontWeight: '700' }}
                      onTouchEnd={() => setAvatarMenu(true)}
                    />
                  }
                >
                  <Menu.Item
                    leadingIcon="camera-outline"
                    onPress={() => handleAvatarChoice('Take Photo')}
                    title="Take Photo"
                  />
                  <Menu.Item
                    leadingIcon="image-multiple-outline"
                    onPress={() => handleAvatarChoice('Choose from Library')}
                    title="Choose from Library"
                  />
                </Menu>
                <Button
                  mode="text"
                  onPress={() => setAvatarMenu(true)}
                  style={{ marginTop: spacing.xs }}
                >
                  Change Photo
                </Button>
              </View>

              <TextInput
                mode="outlined"
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                maxLength={100}
                left={<TextInput.Icon icon="account-outline" />}
                error={!!nameError}
              />
              {errorText(nameError)}

              <TextInput
                mode="outlined"
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                left={<TextInput.Icon icon="phone-outline" />}
                style={{ marginTop: spacing.sm }}
              />

              <Button
                mode="contained"
                onPress={handleSaveProfile}
                contentStyle={{ height: 52 }}
                style={{ marginTop: spacing.lg }}
              >
                Save
              </Button>
            </ElevatedCard>
          </AnimatedEntrance>

          {/* Change Password */}
          <AnimatedEntrance index={1}>
            <SectionHeader
              title="Change Password"
              accentColor={palette.primary}
            />
            <ElevatedCard level="raised">
              <TextInput
                mode="outlined"
                label="Current Password"
                value={current}
                onChangeText={setCurrent}
                secureTextEntry={!showCurrent}
                left={<TextInput.Icon icon="lock-outline" />}
                right={
                  <TextInput.Icon
                    icon={showCurrent ? 'eye-off-outline' : 'eye-outline'}
                    onPress={() => setShowCurrent((s) => !s)}
                  />
                }
                error={!!pwErrors.current}
              />
              {errorText(pwErrors.current)}

              <TextInput
                mode="outlined"
                label="New Password"
                value={next}
                onChangeText={setNext}
                secureTextEntry={!showNext}
                left={<TextInput.Icon icon="lock-plus-outline" />}
                right={
                  <TextInput.Icon
                    icon={showNext ? 'eye-off-outline' : 'eye-outline'}
                    onPress={() => setShowNext((s) => !s)}
                  />
                }
                error={!!pwErrors.next}
                style={{ marginTop: spacing.sm }}
              />
              {errorText(pwErrors.next)}

              <TextInput
                mode="outlined"
                label="Confirm New Password"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showConfirm}
                left={<TextInput.Icon icon="lock-check-outline" />}
                right={
                  <TextInput.Icon
                    icon={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                    onPress={() => setShowConfirm((s) => !s)}
                  />
                }
                error={!!pwErrors.confirm}
                style={{ marginTop: spacing.sm }}
              />
              {errorText(pwErrors.confirm)}

              <Button
                mode="contained"
                onPress={handleSavePassword}
                contentStyle={{ height: 52 }}
                style={{ marginTop: spacing.lg }}
              >
                Save
              </Button>
            </ElevatedCard>
          </AnimatedEntrance>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
