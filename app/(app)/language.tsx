/**
 * Language — WBS 4.1.4 Multi-Language Switch.
 * RadioButton.Item list; tap applies immediately + toast.
 */

import React from 'react';
import { ScrollView, View } from 'react-native';
import { RadioButton, Text, TouchableRipple, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../src/components/AppHeader';
import { AnimatedEntrance, ElevatedCard, IconContainer, SectionHeader } from '../../src/components/ui';
import { LANGUAGES, useLanguage, type Lang } from '../../src/contexts/LanguageContext';
import { useSnackbar } from '../../src/contexts/SnackbarContext';
import { palette, radius, spacing, withAlpha } from '../../src/theme/theme';

export default function LanguageScreen() {
  const theme = useTheme();
  const { lang, setLang } = useLanguage();
  const { showToast } = useSnackbar();

  const handleSelect = (code: Lang) => {
    if (code === lang) return;
    setLang(code);
    showToast('Language updated.', 'success');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title="Language" showBack showNotifications={false} />
      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxxl }}>
        <AnimatedEntrance index={0}>
          <SectionHeader title="App Language" icon="translate" accentColor={palette.primary} />
          <Text
            style={{
              color: theme.colors.onSurfaceVariant,
              marginBottom: spacing.md,
              fontSize: 14,
            }}
          >
            Choose your preferred language. The change applies immediately across the app.
          </Text>
          <ElevatedCard level="raised" noPadding>
            <RadioButton.Group onValueChange={(v) => handleSelect(v as Lang)} value={lang}>
              {LANGUAGES.map((item, i) => {
                const selected = item.code === lang;
                return (
                  <TouchableRipple
                    key={item.code}
                    onPress={() => handleSelect(item.code)}
                    style={{
                      minHeight: 56,
                      borderTopWidth: i === 0 ? 0 : 1,
                      borderTopColor: theme.colors.outlineVariant,
                      backgroundColor: selected
                        ? withAlpha(palette.primary, 0.08)
                        : 'transparent',
                      borderTopLeftRadius: i === 0 ? radius.lg : 0,
                      borderTopRightRadius: i === 0 ? radius.lg : 0,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: spacing.md,
                        paddingVertical: spacing.sm,
                        gap: spacing.md,
                      }}
                    >
                      <IconContainer
                        icon={item.code === 'en' ? 'alphabetical-variant' : 'translate'}
                        category="navigation"
                      />
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 16,
                          fontWeight: selected ? '700' : '500',
                          color: selected ? palette.primary : theme.colors.onSurface,
                        }}
                      >
                        {item.label}
                      </Text>
                      <RadioButton value={item.code} />
                    </View>
                  </TouchableRipple>
                );
              })}
            </RadioButton.Group>
          </ElevatedCard>
        </AnimatedEntrance>
      </ScrollView>
    </SafeAreaView>
  );
}
