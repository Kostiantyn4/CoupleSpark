import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { FontFamily } from '@/theme/tokens';
import { useTheme } from '@/theme/theme-context';

import { CardIllustration } from './card-illustration';
import { GlassSurface } from './glass-surface';
import { Icon } from './icons';

type Props = {
  width: number;
  height: number;
  category: string;
  hint: string;
  text: string;
  /** Номер питання (з 1) і всього в колоді */
  position: number;
  total: number;
};

const RADIUS = 28;

export function QuestionCard({ width, height, category, hint, text, position, total }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { width, height }]}>
      <CardIllustration width={width} height={height * 0.62} gradient={colors.illustration} />

      {/* Темний скрим під текст: контраст білого тексту понад 6:1 */}
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0.28" stopColor="#1B0E22" stopOpacity={0} />
            <Stop offset="0.62" stopColor="#1B0E22" stopOpacity={0.78} />
            <Stop offset="1" stopColor="#1B0E22" stopOpacity={0.94} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#scrim)" />
      </Svg>

      {/* Лічильник */}
      <GlassSurface radius={16} style={styles.counter}>
        <Text style={styles.counterText}>
          {position} / {total}
        </Text>
      </GlassSurface>

      {/* Стікери на краях картки */}
      <View style={[styles.sticker, styles.stickerHeart]}>
        <Icon name="heart" size={22} color="#FF6F96" />
      </View>
      <View style={[styles.sticker, styles.stickerSpark]}>
        <Icon name="sparkle" size={22} color="#F2B93B" />
      </View>

      <View style={styles.textBlock}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <Text style={styles.question} numberOfLines={5}>
          {text}
        </Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS,
    overflow: 'hidden',
    backgroundColor: '#2A1630',
  },
  counter: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  counterText: {
    color: '#FFFFFF',
    fontFamily: FontFamily.uiHeavy,
    fontSize: 13,
  },
  sticker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickerHeart: { top: 14, left: 14, transform: [{ rotate: '-12deg' }] },
  stickerSpark: { top: '34%', right: -6, transform: [{ rotate: '10deg' }] },
  textBlock: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 22,
    gap: 10,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  categoryText: {
    color: '#FFFFFF',
    fontFamily: FontFamily.uiHeavy,
    fontSize: 12,
    letterSpacing: 0.4,
  },
  question: {
    color: '#FFFFFF',
    fontFamily: FontFamily.uiHeavy,
    fontSize: 26,
    lineHeight: 32,
  },
  hint: {
    color: 'rgba(255,255,255,0.78)',
    fontFamily: FontFamily.ui,
    fontSize: 14,
  },
});
