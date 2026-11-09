import { BlurView } from 'expo-blur';
import { useContext } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { useTheme } from '@/theme/theme-context';

import { BlurTargetContext } from './glass-background';

type Props = ViewProps & {
  radius?: number;
  /** Сила розмиття 1–100 (в дизайні blur 30) */
  intensity?: number;
};

/** Скляна панель: розмиття фону + напівпрозорий білий шар + світла обводка. */
export function GlassSurface({ radius = 24, intensity = 45, style, children, ...rest }: Props) {
  const { colors } = useTheme();
  const blurTarget = useContext(BlurTargetContext);

  return (
    <View
      {...rest}
      style={[
        styles.base,
        { borderRadius: radius, borderColor: colors.glassBorder },
        style,
      ]}>
      <BlurView
        pointerEvents="none"
        tint={colors.blurTint}
        intensity={intensity}
        blurTarget={blurTarget ?? undefined}
        blurMethod="dimezisBlurViewSdk31Plus"
        style={StyleSheet.absoluteFill}
      />
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: colors.glass }]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    borderWidth: 1,
  },
});
