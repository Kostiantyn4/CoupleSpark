import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily } from '@/theme/tokens';
import { useTheme } from '@/theme/theme-context';

import { GlassSurface } from './glass-surface';
import { Icon, type IconName } from './icons';

/** Круглa скляна кнопка 48 dp. */
export function GlassIconButton({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <GlassSurface radius={24} style={styles.iconButton}>
      <Pressable
        role="button"
        accessibilityLabel={label}
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,0,0,0.10)', borderless: true, radius: 24 }}
        style={styles.iconButtonPressable}>
        <Icon name={icon} size={24} color={colors.text} />
      </Pressable>
    </GlassSurface>
  );
}

type Props = {
  onMenu: () => void;
};

/** Шапка головного екрана: аватар, «TwoGether · Картки розмов», кнопка меню. */
export function ScreenHeader({ onMenu }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <GlassSurface radius={24} style={styles.avatar}>
        <View style={styles.avatarInner}>
          <Icon name="person" size={24} color={colors.text} />
        </View>
      </GlassSurface>

      <Text style={styles.titleWrap} numberOfLines={1}>
        <Text style={[styles.brand, { color: colors.text }]}>TwoGether</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{'  ·  Картки розмов'}</Text>
      </Text>

      <GlassIconButton icon="menu" label="Меню" onPress={onMenu} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  avatarInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    flex: 1,
    textAlign: 'center',
  },
  brand: {
    fontFamily: FontFamily.brand,
    fontSize: 20,
  },
  subtitle: {
    fontFamily: FontFamily.ui,
    fontSize: 13,
  },
  iconButton: {
    width: 48,
    height: 48,
  },
  iconButtonPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
