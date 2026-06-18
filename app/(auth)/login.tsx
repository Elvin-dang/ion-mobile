import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Button, Checkbox, Divider, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../src/components/Logo';
import {
  AnimatedEntrance,
  ElevatedCard,
  IconContainer,
  PressableScale,
} from '../../src/components/ui';
import { DEMO_USERS, Role, useAuth } from '../../src/contexts/AuthContext';
import { useThemeMode } from '../../src/contexts/ThemeContext';
import { authRoles, gradients, spacing } from '../../src/theme/theme';

const ROLE_CARDS: { role: Role; key: keyof typeof authRoles }[] = [
  { role: 'BM', key: 'buildingManager' },
  { role: 'SUP', key: 'mspSupervisor' },
  { role: 'TECH', key: 'mspTechnician' },
];

function maskEmail(email: string) {
  const [name, domain] = email.split('@');
  const masked = name.length <= 2 ? name[0] + '*' : name[0] + '***' + name[name.length - 1];
  return `${masked}@${domain}`;
}

export default function LoginScreen() {
  const theme = useTheme();
  const { isDark } = useThemeMode();
  const { login } = useAuth();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let ok = true;
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError('Email is required.');
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address.');
      ok = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required.');
      ok = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      ok = false;
    } else {
      setPasswordError('');
    }
    return ok;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(async () => {
      await login(DEMO_USERS.BM);
      setLoading(false);
      router.replace('/dashboard');
    }, 700);
  };

  const handleDemo = async (role: Role) => {
    setLoading(true);
    const user = DEMO_USERS[role];
    setEmail(user.email);
    setPassword('demo1234');
    setTimeout(async () => {
      await login(user);
      setLoading(false);
      router.replace('/dashboard');
    }, 500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <LinearGradient
        colors={isDark ? gradients.authGlowDark : gradients.authGlowLight}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 320 }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={{
              padding: spacing.md,
              paddingTop: spacing.xxl,
              flexGrow: 1,
              maxWidth: isWide ? 480 : undefined,
              width: '100%',
              alignSelf: 'center',
            }}
            keyboardShouldPersistTaps="handled"
          >
            <AnimatedEntrance index={0}>
              <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
                <Logo size="lg" showTagline />
              </View>
            </AnimatedEntrance>

            <AnimatedEntrance index={1}>
              <ElevatedCard level="raised">
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '700',
                    color: theme.colors.onSurface,
                    marginBottom: spacing.xs,
                  }}
                >
                  Welcome back
                </Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: spacing.lg }}>
                  Sign in to continue to your workspace
                </Text>

                <TextInput
                  mode="outlined"
                  label="Email"
                  value={email}
                  onChangeText={(t) => setEmail(t)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  maxLength={100}
                  left={<TextInput.Icon icon="email-outline" />}
                  error={!!emailError}
                  style={{ marginBottom: spacing.xs }}
                />
                {emailError ? (
                  <Text style={{ color: theme.colors.error, fontSize: 13, marginBottom: spacing.xs }}>
                    {emailError}
                  </Text>
                ) : null}

                <TextInput
                  mode="outlined"
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  left={<TextInput.Icon icon="lock-outline" />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      onPress={() => setShowPassword((s) => !s)}
                    />
                  }
                  error={!!passwordError}
                  style={{ marginTop: spacing.sm, marginBottom: spacing.xs }}
                />
                {passwordError ? (
                  <Text style={{ color: theme.colors.error, fontSize: 13 }}>{passwordError}</Text>
                ) : null}

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xs }}>
                  <TouchableOpacity
                    onPress={() => setRememberMe((v) => !v)}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
                    accessibilityLabel="Remember me"
                  >
                    <Checkbox
                      status={rememberMe ? 'checked' : 'unchecked'}
                      onPress={() => setRememberMe((v) => !v)}
                      color={theme.colors.primary}
                    />
                    <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>Remember Me</Text>
                  </TouchableOpacity>
                  <Button
                    mode="text"
                    onPress={() => router.push('/forgot-password')}
                    labelStyle={{ fontWeight: '600' }}
                    compact
                  >
                    Forgot Password?
                  </Button>
                </View>

                <Button
                  mode="contained"
                  onPress={handleLogin}
                  loading={loading}
                  disabled={loading}
                  contentStyle={{ height: 52 }}
                  style={{ marginTop: spacing.xs }}
                >
                  Sign In
                </Button>
              </ElevatedCard>
            </AnimatedEntrance>

            <AnimatedEntrance index={2}>
              <View style={{ marginTop: spacing.xl }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                  <Divider style={{ flex: 1 }} />
                  <Text
                    style={{
                      marginHorizontal: spacing.sm,
                      color: theme.colors.onSurfaceVariant,
                      fontSize: 13,
                      fontWeight: '600',
                    }}
                  >
                    Or select a demo account
                  </Text>
                  <Divider style={{ flex: 1 }} />
                </View>

                <View style={{ gap: spacing.sm }}>
                  {ROLE_CARDS.map(({ role, key }, i) => {
                    const r = authRoles[key];
                    const user = DEMO_USERS[role];
                    return (
                      <AnimatedEntrance key={role} index={3 + i}>
                        <PressableScale onPress={() => handleDemo(role)} tintColor={r.color}>
                          <ElevatedCard noPadding>
                            <View style={{ flexDirection: 'row', overflow: 'hidden', borderRadius: 16 }}>
                              <View style={{ width: 4, backgroundColor: r.color }} />
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  padding: spacing.md,
                                  flex: 1,
                                  gap: spacing.sm,
                                }}
                              >
                                <IconContainer icon={r.icon as any} color={r.color} />
                                <View style={{ flex: 1 }}>
                                  <Text
                                    style={{ fontSize: 16, fontWeight: '700', color: theme.colors.onSurface }}
                                  >
                                    {r.label}
                                  </Text>
                                  <Text style={{ fontSize: 13, color: theme.colors.onSurfaceVariant }}>
                                    {maskEmail(user.email)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </ElevatedCard>
                        </PressableScale>
                      </AnimatedEntrance>
                    );
                  })}
                </View>
              </View>
            </AnimatedEntrance>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
