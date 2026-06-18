import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, useWindowDimensions } from 'react-native';
import { Appbar, Button, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedEntrance, ElevatedCard } from '../../src/components/ui';
import { useSnackbar } from '../../src/contexts/SnackbarContext';
import { spacing } from '../../src/theme/theme';

type Step = 1 | 2;

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const { showToast } = useSnackbar();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countdown, setCountdown] = useState(60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (step === 2) {
      setCountdown(60);
      timerRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  const handleContinue = () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError('Email is required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    showToast('Verification code sent.', 'success');
    setStep(2);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(60);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((c) => (c <= 1 ? 0 : c - 1));
    }, 1000);
    showToast('A new verification code has been sent.', 'success');
  };

  const handleReset = () => {
    const e: Record<string, string> = {};
    if (!otp) e.otp = 'Please enter the verification code.';
    else if (otp.length !== 6) e.otp = 'Verification code must be 6 digits.';
    if (newPassword.length < 8) e.newPassword = 'Password must be at least 8 characters.';
    if (confirmPassword !== newPassword) e.confirmPassword = 'Passwords do not match.';
    setErrors(e);
    if (Object.keys(e).length) return;
    showToast('Password reset successfully. Please log in with your new password.', 'success');
    router.replace('/login');
  };

  const maskedEmail = email.replace(/(.{1}).*(@.*)/, '$1***$2');

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header mode="small" style={{ backgroundColor: 'transparent' }}>
          <Appbar.BackAction
            onPress={() => (step === 2 ? setStep(1) : router.replace('/login'))}
          />
          <Appbar.Content title={step === 1 ? 'Forgot Password' : 'Reset Password'} />
        </Appbar.Header>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={{
              padding: spacing.md,
              maxWidth: isWide ? 480 : undefined,
              width: '100%',
              alignSelf: 'center',
            }}
            keyboardShouldPersistTaps="handled"
          >
            {step === 1 ? (
              <AnimatedEntrance>
                <ElevatedCard level="raised">
                  <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: spacing.lg }}>
                    Enter your registered email address. We will send you a verification code.
                  </Text>
                  <TextInput
                    mode="outlined"
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    left={<TextInput.Icon icon="email-outline" />}
                    error={!!emailError}
                  />
                  {emailError ? (
                    <Text style={{ color: theme.colors.error, fontSize: 13, marginTop: 4 }}>
                      {emailError}
                    </Text>
                  ) : null}
                  <Button
                    mode="contained"
                    onPress={handleContinue}
                    contentStyle={{ height: 52 }}
                    style={{ marginTop: spacing.lg }}
                  >
                    Continue
                  </Button>
                  <Button mode="text" onPress={() => router.replace('/login')} style={{ marginTop: spacing.xs }}>
                    Back to Login
                  </Button>
                </ElevatedCard>
              </AnimatedEntrance>
            ) : (
              <AnimatedEntrance>
                <ElevatedCard level="raised">
                  <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: spacing.lg }}>
                    Enter the verification code sent to {maskedEmail}.
                  </Text>
                  <TextInput
                    mode="outlined"
                    label="OTP Code"
                    value={otp}
                    onChangeText={(t) => setOtp(t.replace(/[^0-9]/g, '').slice(0, 6))}
                    keyboardType="numeric"
                    maxLength={6}
                    style={{ fontSize: 22, letterSpacing: 8 }}
                    error={!!errors.otp}
                  />
                  {errors.otp ? (
                    <Text style={{ color: theme.colors.error, fontSize: 13, marginTop: 4 }}>
                      {errors.otp}
                    </Text>
                  ) : null}

                  <Button
                    mode="text"
                    onPress={handleResend}
                    disabled={countdown > 0}
                    style={{ alignSelf: 'flex-start', marginTop: 4 }}
                  >
                    {countdown > 0 ? `Resend Code (${countdown}s)` : 'Resend Code'}
                  </Button>

                  <TextInput
                    mode="outlined"
                    label="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showNew}
                    left={<TextInput.Icon icon="lock-outline" />}
                    right={
                      <TextInput.Icon
                        icon={showNew ? 'eye-off-outline' : 'eye-outline'}
                        onPress={() => setShowNew((s) => !s)}
                      />
                    }
                    error={!!errors.newPassword}
                    style={{ marginTop: spacing.sm }}
                  />
                  {errors.newPassword ? (
                    <Text style={{ color: theme.colors.error, fontSize: 13, marginTop: 4 }}>
                      {errors.newPassword}
                    </Text>
                  ) : null}

                  <TextInput
                    mode="outlined"
                    label="Confirm New Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirm}
                    left={<TextInput.Icon icon="lock-check-outline" />}
                    right={
                      <TextInput.Icon
                        icon={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                        onPress={() => setShowConfirm((s) => !s)}
                      />
                    }
                    error={!!errors.confirmPassword}
                    style={{ marginTop: spacing.sm }}
                  />
                  {errors.confirmPassword ? (
                    <Text style={{ color: theme.colors.error, fontSize: 13, marginTop: 4 }}>
                      {errors.confirmPassword}
                    </Text>
                  ) : null}

                  <Button
                    mode="contained"
                    onPress={handleReset}
                    contentStyle={{ height: 52 }}
                    style={{ marginTop: spacing.lg }}
                  >
                    Reset Password
                  </Button>
                </ElevatedCard>
              </AnimatedEntrance>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
