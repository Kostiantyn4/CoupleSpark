import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FontFamily } from '@/theme/tokens';
import { useTheme } from '@/theme/theme-context';

import { GlassSurface } from './glass-surface';
import { Icon, type IconName } from './icons';

type Item = { key: string; label: string; icon: IconName };

const ITEMS: Item[] = [
  { key: 'cards', label: 'Картки', icon: 'cards' },
  { key: 'calendar', label: 'Календар', icon: 'calendar' },
  { key: 'wishlist', label: 'Бажання', icon: 'gift' },
  { key: 'chat', label: 'Чат', icon: 'chat' },
  { key: 'mood', label: 'Настрій', icon: 'mood' },
];

/** Висота плаваючої панелі разом із відступом від краю, щоб контент не ховався під нею. */
export const TAB_BAR_HEIGHT = 64;

type Props = {
  active?: string;
};

/**
 * Плаваюча нижня панель. Активна вкладка розгортається в капсулу з підписом,
 * решта показані лише іконками. Екранів для інших вкладок поки немає.
 */
export function FloatingTabBar({ active = 'cards' }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View pointerEvents="box-none" style={[styles.wrap, { bottom: insets.bottom + 16 }]}>
      <GlassSurface radius={32} style={styles.bar}>
        <View style={styles.row} role="tablist">
          {ITEMS.map((item) => {
            const isActive = item.key === active;
            return (
              <Pressable
                key={item.key}
                role="tab"
                aria-selected={isActive}
                accessibilityLabel={item.label}
                accessibilityHint={isActive ? undefined : 'Екран ще в розробці'}
                android_ripple={{ color: 'rgba(0,0,0,0.10)', borderless: false }}
                style={[
                  styles.item,
                  isActive ? styles.itemActive : styles.itemIdle,
                  isActive && { backgroundColor: colors.selectedBg },
                ]}>
                <Icon
                  name={item.icon}
                  size={24}
                  color={isActive ? colors.selectedText : colors.textSecondary}
                />
                {isActive && (
                  <Text style={[styles.itemLabel, { color: colors.selectedText }]}>{item.label}</Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </GlassSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bar: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    overflow: 'hidden',
  },
  itemIdle: {
    width: 48,
  },
  itemActive: {
    paddingHorizontal: 16,
  },
  itemLabel: {
    fontFamily: FontFamily.uiHeavy,
    fontSize: 14,
  },
});
