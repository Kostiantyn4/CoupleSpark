import { BlurTargetView } from 'expo-blur';
import { useRef, type ComponentRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { SourceDeck } from '@/data/decks';
import { LINE_HEIGHT_RATIO, useFittedFontSize } from '@/hooks/use-fitted-font-size';
import { FontFamily } from '@/theme/tokens';
import { useTheme } from '@/theme/theme-context';

import { CardIllustration } from './card-illustration';
import { BlurTargetContext } from './glass-background';
import { GlassSurface } from './glass-surface';
import { Icon } from './icons';

type Props = {
  width: number;
  height: number;
  /** Deck the question comes from: drives the header */
  source: SourceDeck;
  /** Stable question id: caches the fitted font size */
  questionId: string;
  text: string;
  /** Question number (1-based) and total in the deck */
  position: number;
  total: number;
};

const RADIUS = 28;
const HEADER_HEIGHT = 44;

/** Gap between the text panel and the header / card bottom when the panel is at full height */
const TEXT_AREA_PADDING_V = 16;
const PANEL_PADDING_V = 20;
/** GlassSurface border width */
const PANEL_BORDER = 1;

const MAX_FONT_SIZE = 26;
const MIN_FONT_SIZE = 14;

export function QuestionCard({ width, height, source, questionId, text, position, total }: Props) {
  const { colors } = useTheme();
  const header = colors.deckHeader[source.id];

  // The panel grows with the text up to the space below the header; only then does the font shrink.
  const availableTextHeight =
    height - HEADER_HEIGHT - 2 * (TEXT_AREA_PADDING_V + PANEL_PADDING_V + PANEL_BORDER);
  const { fontSize, isFitted, onTextLayout } = useFittedFontSize({
    cacheKey: `${questionId}:${width}x${height}`,
    maxFontSize: MAX_FONT_SIZE,
    minFontSize: MIN_FONT_SIZE,
    availableHeight: availableTextHeight,
  });
  // Card-local blur target: on Android the text panel must blur this card's
  // illustration, not the screen background that the outer context points to.
  const illustrationRef = useRef<ComponentRef<typeof View>>(null);

  return (
    <View style={[styles.card, { width, height }]}>
      <BlurTargetView ref={illustrationRef} style={StyleSheet.absoluteFill}>
        <CardIllustration width={width} height={height} gradient={colors.illustration} />
      </BlurTargetView>

      {/* Header: source deck of the question and counter */}
      <View style={[styles.header, { backgroundColor: header.bg }]}>
        <Text style={[styles.headerText, { color: header.text }]} numberOfLines={1}>
          {source.label}
        </Text>
        <Text style={[styles.headerText, { color: header.text }]}>
          {position} / {total}
        </Text>
      </View>

      {/* Stickers on the card edges */}
      <View style={[styles.sticker, styles.stickerHeart]}>
        <Icon name="heart" size={22} color="#FF6F96" />
      </View>
      <View style={[styles.sticker, styles.stickerSpark]}>
        <Icon name="sparkle" size={22} color="#F2B93B" />
      </View>

      {/* Question on a themed frosted-glass panel, centered below the header */}
      <View style={styles.textArea} pointerEvents="none">
        <BlurTargetContext.Provider value={illustrationRef}>
          {/* Hidden until the font size is fitted, so oversized text never flashes */}
          <GlassSurface
            radius={22}
            fill={colors.cardGlass}
            style={[styles.textPanel, !isFitted && styles.hidden]}>
            <Text
              onTextLayout={onTextLayout}
              style={[
                styles.question,
                {
                  color: colors.text,
                  fontSize,
                  lineHeight: Math.round(fontSize * LINE_HEIGHT_RATIO),
                },
              ]}>
              {text}
            </Text>
          </GlassSurface>
        </BlurTargetContext.Provider>
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerText: {
    fontFamily: FontFamily.uiHeavy,
    fontSize: 14,
    letterSpacing: 0.4,
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
  // Below the header so it doesn't cover the deck name
  stickerHeart: { top: HEADER_HEIGHT + 12, left: 14, transform: [{ rotate: '-12deg' }] },
  stickerSpark: { top: '34%', right: -6, transform: [{ rotate: '10deg' }] },
  textArea: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 18,
    right: 18,
    bottom: 0,
    paddingVertical: TEXT_AREA_PADDING_V,
    justifyContent: 'center',
  },
  textPanel: {
    paddingHorizontal: 18,
    paddingVertical: PANEL_PADDING_V,
  },
  hidden: {
    opacity: 0,
  },
  question: {
    fontFamily: FontFamily.uiHeavy,
    textAlign: 'center',
  },
});
