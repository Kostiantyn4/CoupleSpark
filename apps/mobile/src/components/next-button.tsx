import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { clamp, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '@/theme/theme-context';

import { Icon } from './icons';
import { SWIPE_THRESHOLD } from './swipe-deck';

const SIZE = 84;
const POINTS = 14;

/** Зірка з 14 променями (з м'якими вершинами). */
function starPath(cx: number, cy: number, outer: number, inner: number, points: number): string {
  let d = '';
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return `${d}Z`;
}

const STAR = starPath(SIZE / 2, SIZE / 2, 39, 34.5, POINTS);

type Props = {
  tx: SharedValue<number>;
  onPress: () => void;
};

export function NextButton({ tx, onPress }: Props) {
  const { colors } = useTheme();

  // Під час свайпу кнопка трохи збільшується
  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + 0.12 * clamp(Math.abs(tx.get()) / SWIPE_THRESHOLD, 0, 1) }],
  }));

  return (
    <Animated.View style={scaleStyle}>
      <Pressable
        onPress={onPress}
        role="button"
        accessibilityLabel="Далі"
        android_ripple={{ color: 'rgba(255,255,255,0.35)', borderless: true, radius: SIZE / 2 }}
        style={styles.pressable}>
        <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFill}>
          <Path
            d={STAR}
            fill={colors.accent}
            stroke={colors.accent}
            strokeWidth={6}
            strokeLinejoin="round"
          />
        </Svg>
        <View pointerEvents="none">
          <Icon name="arrow-right" size={34} color="#FFFFFF" strokeWidth={2.6} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
