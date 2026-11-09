import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DeckTabs } from '@/components/deck-tabs';
import { FloatingTabBar, TAB_BAR_HEIGHT } from '@/components/floating-tab-bar';
import { GlassScreen } from '@/components/glass-background';
import { NextButton } from '@/components/next-button';
import { ScreenHeader } from '@/components/screen-header';
import { SwipeDeck, useSwipeDeck } from '@/components/swipe-deck';
import { DECKS, getDeck, type DeckId } from '@/data/decks';
import { useTheme } from '@/theme/theme-context';

export default function CardsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const [deckId, setDeckId] = useState<DeckId>('regular');
  const [indices, setIndices] = useState<Record<DeckId, number>>({
    regular: 0,
    intimate: 0,
    mixed: 0,
  });

  const deck = getDeck(deckId);
  const index = indices[deckId];

  const onAdvance = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIndices((prev) => ({
      ...prev,
      [deckId]: (prev[deckId] + 1) % deck.questions.length,
    }));
  };

  const { tx, pan, advance, reset } = useSwipeDeck(onAdvance);

  const selectDeck = (id: DeckId) => {
    if (id === deckId) return;
    reset();
    setDeckId(id);
  };

  const cardWidth = Math.min(width * 0.78, 340);
  const cardHeight = Math.min(Math.max(height * 0.47, 340), 480);

  return (
    <GlassScreen>
      <StatusBar style={colors.mode === 'dark' ? 'light' : 'dark'} />
      <View
        style={[
          styles.content,
          { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 + TAB_BAR_HEIGHT + 12 },
        ]}>
        <ScreenHeader onMenu={() => router.push('/menu')} />
        <DeckTabs decks={DECKS} selected={deckId} onSelect={selectDeck} />

        <View style={styles.stage}>
          <SwipeDeck
            deck={deck}
            index={index}
            tx={tx}
            pan={pan}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
          />
        </View>

        <View style={styles.buttonRow}>
          <NextButton tx={tx} onPress={advance} />
        </View>
      </View>
      <FloatingTabBar active="cards" />
    </GlassScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 12,
  },
  stage: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonRow: {
    alignItems: 'center',
    height: 92,
    justifyContent: 'center',
  },
});
