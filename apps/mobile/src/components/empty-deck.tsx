import { StyleSheet, Text } from 'react-native';

import { FontFamily } from '@/theme/tokens';
import { useTheme } from '@/theme/theme-context';

import { GlassSurface } from './glass-surface';

// TODO(i18n): move to localization files once the project has i18n.
const EMPTY_DECK_MESSAGE = 'У цій колоді поки немає питань';

type Props = {
  width: number;
  height: number;
};

/** Takes the card's place when the deck has no questions, so the screen layout doesn't jump. */
export function EmptyDeck({ width, height }: Props) {
  const { colors } = useTheme();

  return (
    <GlassSurface radius={28} style={[styles.container, { width, height }]}>
      <Text accessibilityRole="text" style={[styles.message, { color: colors.textSecondary }]}>
        {EMPTY_DECK_MESSAGE}
      </Text>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    fontFamily: FontFamily.uiHeavy,
    fontSize: 18,
    textAlign: 'center',
  },
});
