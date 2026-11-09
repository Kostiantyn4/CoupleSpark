import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassScreen } from '@/components/glass-background';
import { GlassSurface } from '@/components/glass-surface';
import { Icon, type IconName } from '@/components/icons';
import { GlassIconButton } from '@/components/screen-header';
import { FontFamily, type ThemeMode } from '@/theme/tokens';
import { useTheme } from '@/theme/theme-context';

const OPTIONS: { mode: ThemeMode; label: string; icon: IconName }[] = [
  { mode: 'light', label: 'Світла', icon: 'sun' },
  { mode: 'dark', label: 'Темна', icon: 'moon' },
];

export default function MenuScreen() {
  const { colors, mode, setMode } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <GlassScreen>
      <StatusBar style={colors.mode === 'dark' ? 'light' : 'dark'} />
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 20 }}>
        {/* Шапка 64 dp: «Назад», заголовок по центру, праворуч порожній відступ 48 dp */}
        <View style={styles.header}>
          <GlassIconButton icon="back" label="Назад" onPress={() => router.back()} />
          <Text style={[styles.title, { color: colors.text }]}>Меню</Text>
          <View style={styles.spacer} />
        </View>

        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Тема оформлення</Text>

        <GlassSurface radius={24}>
          {OPTIONS.map((option, i) => {
            const selected = option.mode === mode;
            return (
              <View key={option.mode}>
                {i > 0 && <View style={[styles.divider, { backgroundColor: colors.divider }]} />}
                <Pressable
                  role="radio"
                  aria-checked={selected}
                  accessibilityLabel={option.label}
                  onPress={() => setMode(option.mode)}
                  android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
                  style={styles.row}>
                  <View style={[styles.iconCircle, { backgroundColor: colors.iconCircle }]}>
                    <Icon name={option.icon} size={18} color={colors.text} />
                  </View>
                  <Text style={[styles.rowLabel, { color: colors.text }]}>{option.label}</Text>
                  <View
                    style={[
                      styles.radio,
                      selected
                        ? { backgroundColor: colors.accent, borderColor: colors.accent }
                        : { borderColor: colors.radioOff },
                    ]}>
                    {selected && <Icon name="check" size={14} color="#FFFFFF" strokeWidth={3} />}
                  </View>
                </Pressable>
              </View>
            );
          })}
        </GlassSurface>
      </View>
    </GlassScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FontFamily.brand,
    fontSize: 22,
  },
  spacer: {
    width: 48,
  },
  sectionLabel: {
    fontFamily: FontFamily.uiHeavy,
    fontSize: 14,
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 4,
  },
  row: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontFamily: FontFamily.ui,
    fontSize: 16,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 60,
  },
});
