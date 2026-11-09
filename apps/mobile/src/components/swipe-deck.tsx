import { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  clamp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import type { Deck } from '@/data/decks';
import { FontFamily } from '@/theme/tokens';
import { useTheme } from '@/theme/theme-context';

import { QuestionCard } from './question-card';

/** Відстань у dp, після якої свайп зараховується. */
export const SWIPE_THRESHOLD = 120;
/** Швидкість у dp/с, після якої зараховується навіть короткий змах. */
export const SWIPE_VELOCITY = 800;

const MAX_TILT_DEG = 14;
const RADIUS = 28;

export type PanGesture = ReturnType<typeof usePanGesture>;

/**
 * Керування колодою. Свайп вправо, вліво і кнопка «Далі» означають одну дію.
 * `tx` ділиться між колодою та кнопкою, щоб кнопка збільшувалась під час свайпу.
 */
export function useSwipeDeck(onAdvance: () => void) {
  'use no memo';

  const { width } = useWindowDimensions();
  const tx = useSharedValue(0);
  const busy = useSharedValue(false);
  const [version, setVersion] = useState(0);
  const flyDistance = width * 1.3;

  // Виконується в JS-потоці після того, як картка вилетіла за екран.
  const commit = () => {
    onAdvance();
    setVersion((v) => v + 1);
  };

  // Нова картка вже відрендерена: повертаємо позицію в нуль без анімації.
  useLayoutEffect(() => {
    tx.set(0);
    busy.set(false);
  }, [version, tx, busy]);

  const flyOut = (direction: number, velocity: number) => {
    'worklet';
    if (busy.get()) return;
    busy.set(true);
    tx.set(
      withSpring(
        direction * flyDistance,
        { velocity, stiffness: 140, damping: 22, overshootClamping: true },
        (finished) => {
          'worklet';
          if (finished) {
            scheduleOnRN(commit);
          } else {
            busy.set(false);
          }
        },
      ),
    );
  };

  const pan = usePanGesture({
    activeOffsetX: [-10, 10],
    failOffsetY: [-24, 24],
    onUpdate: (e) => {
      'worklet';
      if (busy.get()) return;
      tx.set(e.translationX);
    },
    onDeactivate: (e) => {
      'worklet';
      if (busy.get()) return;
      const dx = e.translationX;
      const vx = e.velocityX;
      if (Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(vx) > SWIPE_VELOCITY) {
        const direction = Math.abs(dx) > 8 ? Math.sign(dx) : Math.sign(vx) || 1;
        flyOut(direction, direction * Math.abs(vx));
      } else {
        tx.set(withSpring(0, { stiffness: 220, damping: 22 }));
      }
    },
  });

  /** Для кнопки «Далі»: та сама анімація вильоту вправо. */
  const advance = () => flyOut(1, 0);

  /** Скидання при зміні колоди. */
  const reset = () => {
    tx.set(0);
    busy.set(false);
  };

  return { tx, pan, advance, reset };
}

type Props = {
  deck: Deck;
  index: number;
  tx: SharedValue<number>;
  pan: PanGesture;
  cardWidth: number;
  cardHeight: number;
};

export function SwipeDeck({ deck, index, tx, pan, cardWidth, cardHeight }: Props) {
  'use no memo';

  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const total = deck.questions.length;
  const current = deck.questions[index];
  const next = deck.questions[(index + 1) % total];
  const previous = index > 0 ? deck.questions[index - 1] : null;

  // Центр сусідньої картки: половина головної + проміжок + половина зменшеної
  const neighborOffset = cardWidth / 2 + 12 + (cardWidth * 0.9) / 2;
  const left = (width - cardWidth) / 2;

  const currentStyle = useAnimatedStyle(() => {
    const x = tx.get();
    const rotation = clamp((x / width) * MAX_TILT_DEG, -MAX_TILT_DEG, MAX_TILT_DEG);
    return { transform: [{ translateX: x }, { rotate: `${rotation}deg` }] };
  });

  // Наступна картка «піднімається» до центру разом із вильотом поточної
  const nextStyle = useAnimatedStyle(() => {
    const rise = interpolate(
      Math.abs(tx.get()),
      [0, SWIPE_THRESHOLD, width * 1.1],
      [0, 0.4, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity: 0.75 + 0.25 * rise,
      transform: [{ translateX: neighborOffset * (1 - rise) }, { scale: 0.9 + 0.1 * rise }],
    };
  });

  // Ліва сусідка трохи зсувається до центру, коли тягнемо вправо
  const previousStyle = useAnimatedStyle(() => {
    const toward = clamp(tx.get() / SWIPE_THRESHOLD, 0, 1);
    return { transform: [{ translateX: -neighborOffset + 14 * toward }, { scale: 0.9 }] };
  });

  const labelLeftStyle = useAnimatedStyle(() => ({
    opacity: clamp(tx.get() / SWIPE_THRESHOLD, 0, 1),
  }));
  const labelRightStyle = useAnimatedStyle(() => ({
    opacity: clamp(-tx.get() / SWIPE_THRESHOLD, 0, 1),
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: clamp(Math.abs(tx.get()) / SWIPE_THRESHOLD, 0, 1),
  }));

  const card = (q: { id: string; text: string }, position: number) => (
    <QuestionCard
      width={cardWidth}
      height={cardHeight}
      category={deck.category}
      hint={deck.hint}
      text={q.text}
      position={position}
      total={total}
    />
  );

  const slot = [styles.slot, { left, width: cardWidth, height: cardHeight }];

  return (
    <View style={{ width, height: cardHeight }}>
      {previous && (
        <Animated.View pointerEvents="none" style={[slot, previousStyle]}>
          {card(previous, index)}
        </Animated.View>
      )}

      <Animated.View pointerEvents="none" style={[slot, nextStyle]}>
        {card(next, ((index + 1) % total) + 1)}
      </Animated.View>

      <GestureDetector gesture={pan}>
        <Animated.View
          accessible
          accessibilityLabel={current.text}
          accessibilityHint="Проведіть пальцем убік або натисніть «Далі», щоб перейти до наступного питання"
          style={[slot, styles.current, currentStyle]}>
          {card(current, index + 1)}

          <Animated.View pointerEvents="none" style={[styles.glow, glowStyle]} />

          <Animated.View pointerEvents="none" style={[styles.label, styles.labelLeft, labelLeftStyle]}>
            <Text style={[styles.labelText, { color: colors.label }]}>ДАЛІ</Text>
          </Animated.View>
          <Animated.View pointerEvents="none" style={[styles.label, styles.labelRight, labelRightStyle]}>
            <Text style={[styles.labelText, { color: colors.label }]}>ДАЛІ</Text>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    position: 'absolute',
    top: 0,
  },
  current: {
    // Точка обертання: низ картки
    transformOrigin: '50% 100%',
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: RADIUS,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.95)',
  },
  label: {
    position: 'absolute',
    top: 54,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.95)',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  labelLeft: { left: 18, transform: [{ rotate: '-12deg' }] },
  labelRight: { right: 18, transform: [{ rotate: '12deg' }] },
  labelText: {
    fontFamily: FontFamily.uiHeavy,
    fontSize: 22,
    letterSpacing: 1,
  },
});
