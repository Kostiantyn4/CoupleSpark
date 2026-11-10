import { useState } from 'react';
import type { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';

/** Line height as a multiple of font size (matches the 26/32 design ratio). */
export const LINE_HEIGHT_RATIO = 32 / 26;

/**
 * Fitted sizes per `cacheKey`. A question is measured once per card size;
 * every later render (neighbor preview, revisits, deck switches) is an O(1) lookup.
 */
const fittedSizes = new Map<string, number>();

type Options = {
  /** Identifies text + box size, e.g. `${questionId}:${width}x${height}` */
  cacheKey: string;
  maxFontSize: number;
  minFontSize: number;
  /** Height in dp the text block may occupy */
  availableHeight: number;
};

type FitState = { key: string; fontSize: number; isFitted: boolean };

function initialState(key: string, maxFontSize: number): FitState {
  const cached = fittedSizes.get(key);
  return { key, fontSize: cached ?? maxFontSize, isFitted: cached !== undefined };
}

/**
 * Picks the largest font size (up to `maxFontSize`) at which the text fits `availableHeight`.
 *
 * Text is laid out at the current size and measured via `onTextLayout`. If it overflows,
 * the size is scaled by sqrt(available / measured): text area grows roughly with the square
 * of the font size (more lines, each one taller), so this usually lands in 1–2 passes
 * instead of stepping down 1 dp at a time. `isFitted` lets the caller hide the text until done.
 */
export function useFittedFontSize({ cacheKey, maxFontSize, minFontSize, availableHeight }: Options) {
  const [state, setState] = useState(() => initialState(cacheKey, maxFontSize));

  // Text or box changed while the component stayed mounted: start over for the new key.
  let current = state;
  if (state.key !== cacheKey) {
    current = initialState(cacheKey, maxFontSize);
    setState(current);
  }

  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (current.isFitted) return;

    const textHeight = e.nativeEvent.lines.reduce((sum, line) => sum + line.height, 0);
    if (textHeight <= availableHeight || current.fontSize <= minFontSize) {
      fittedSizes.set(cacheKey, current.fontSize);
      setState({ ...current, isFitted: true });
      return;
    }

    const scaled = Math.floor(current.fontSize * Math.sqrt(availableHeight / textHeight));
    // Always shrink by at least 1 dp so the loop is guaranteed to terminate.
    const next = Math.max(minFontSize, Math.min(current.fontSize - 1, scaled));
    setState({ ...current, fontSize: next });
  };

  return { fontSize: current.fontSize, isFitted: current.isFitted, onTextLayout };
}
