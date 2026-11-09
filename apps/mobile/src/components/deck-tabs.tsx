import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Deck, DeckId } from '@/data/decks';
import { FontFamily } from '@/theme/tokens';
import { useTheme } from '@/theme/theme-context';

import { GlassSurface } from './glass-surface';

type Props = {
  decks: Deck[];
  selected: DeckId;
  onSelect: (id: DeckId) => void;
};

export function DeckTabs({ decks, selected, onSelect }: Props) {
  const { colors } = useTheme();

  return (
    <GlassSurface radius={28} style={styles.container}>
      <View style={styles.row} role="tablist">
        {decks.map((deck) => {
          const isSelected = deck.id === selected;
          return (
            <Pressable
              key={deck.id}
              role="tab"
              aria-selected={isSelected}
              accessibilityLabel={deck.label}
              onPress={() => onSelect(deck.id)}
              android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: false }}
              style={[styles.tab, isSelected && { backgroundColor: colors.selectedBg }]}>
              <Text
                numberOfLines={1}
                style={[
                  styles.label,
                  { color: isSelected ? colors.selectedText : colors.textSecondary },
                ]}>
                {deck.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    padding: 4,
  },
  row: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    minHeight: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  label: {
    fontFamily: FontFamily.uiHeavy,
    fontSize: 15,
  },
});
