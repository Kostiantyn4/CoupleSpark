import { BlurTargetView, BlurView } from 'expo-blur';
import { createContext, useRef, type ComponentRef, type ReactNode, type RefObject } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import { useTheme } from '@/theme/theme-context';

/**
 * On Android, glass blur only works relative to a dedicated layer (BlurTargetView).
 * The background exposes a ref to it, and glass panels consume it via context.
 */
type BlurTargetRef = RefObject<ComponentRef<typeof View> | null>;

export const BlurTargetContext = createContext<BlurTargetRef | null>(null);

function Blobs() {
  const { colors } = useTheme();
  const { width: w, height: h } = useWindowDimensions();

  // Blob positions and radii: mint, pink, lavender, peach, butter
  const blobs = [
    { cx: 0.1 * w, cy: 0.12 * h, r: 0.62 * w },
    { cx: 0.98 * w, cy: 0.22 * h, r: 0.55 * w },
    { cx: 0.06 * w, cy: 0.56 * h, r: 0.55 * w },
    { cx: 0.95 * w, cy: 0.74 * h, r: 0.62 * w },
    { cx: 0.25 * w, cy: 0.97 * h, r: 0.55 * w },
  ];

  return (
    <Svg width={w} height={h} style={StyleSheet.absoluteFill}>
      <Defs>
        {colors.blobs.map((color, i) => (
          <RadialGradient key={i} id={`blob-${i}`} cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={color} stopOpacity={0.95} />
            <Stop offset="55%" stopColor={color} stopOpacity={0.45} />
            <Stop offset="100%" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        ))}
      </Defs>
      {blobs.map((b, i) => (
        <Circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={`url(#blob-${i})`} />
      ))}
    </Svg>
  );
}

/** Screen with a frosted, blurred background of color blobs. */
export function GlassScreen({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  const targetRef = useRef<ComponentRef<typeof View>>(null);

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <BlurTargetView ref={targetRef} style={StyleSheet.absoluteFill}>
        <Blobs />
      </BlurTargetView>

      {/* Frosted glass layer over the blobs. Grain is not added yet. */}
      {Platform.OS === 'ios' ? (
        <BlurView
          pointerEvents="none"
          tint={colors.blurTint}
          intensity={35}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colors.mode === 'dark' ? 'rgba(30,26,43,0.25)' : 'rgba(255,246,236,0.30)' },
          ]}
        />
      )}

      <BlurTargetContext.Provider value={targetRef}>{children}</BlurTargetContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, overflow: 'hidden' },
});
