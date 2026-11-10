import type { SourceDeckId } from '@/data/decks';

export type ThemeMode = 'light' | 'dark';

/** Card header color: shows which deck the question comes from. */
export type DeckHeaderColors = { bg: string; text: string };

export type Palette = {
  mode: ThemeMode;
  /** Base screen background */
  bg: string;
  text: string;
  textSecondary: string;
  /** Accent: arrow, selected state */
  accent: string;
  /** "Next" label shown during a swipe */
  label: string;
  /** Selected tab / bar item */
  selectedBg: string;
  selectedText: string;
  /** Glass panels and buttons */
  glass: string;
  glassBorder: string;
  blurTint: 'light' | 'dark';
  /** Five background color blobs: mint, pink, lavender, peach, butter */
  blobs: [string, string, string, string, string];
  divider: string;
  radioOff: string;
  iconCircle: string;
  /** Card illustration gradient */
  illustration: [string, string, string];
  /** Half-transparent glass panel behind the card question text */
  cardGlass: string;
  /** Card header per source deck: regular is light, intimate is red-pink */
  deckHeader: Record<SourceDeckId, DeckHeaderColors>;
};

export const palettes: Record<ThemeMode, Palette> = {
  light: {
    mode: 'light',
    bg: '#FFF6EC',
    text: '#3B2A33',
    textSecondary: '#6B5560',
    accent: '#D9486E',
    label: '#B83A62',
    selectedBg: '#FFFFFF',
    selectedText: '#3B2A33',
    glass: 'rgba(255,255,255,0.58)',
    glassBorder: 'rgba(255,255,255,0.75)',
    blurTint: 'light',
    blobs: ['#A9DDB8', '#F8B8D0', '#CBBBF2', '#FFBE98', '#FFE39A'],
    divider: 'rgba(0,0,0,0.10)',
    radioOff: '#6B5560',
    iconCircle: 'rgba(255,255,255,0.75)',
    illustration: ['#FFD9B8', '#E7829A', '#9A4F86'],
    cardGlass: 'rgba(255,246,236,0.5)',
    deckHeader: {
      regular: { bg: 'rgba(255,255,255,0.92)', text: '#3B2A33' },
      intimate: { bg: '#D93D63', text: '#FFFFFF' },
    },
  },
  dark: {
    mode: 'dark',
    bg: '#1E1A2B',
    text: '#FBEBE6',
    textSecondary: '#CDB8C3',
    accent: '#FF8FB0',
    label: '#FF9DB8',
    selectedBg: '#FBEBE6',
    selectedText: '#2B1F36',
    glass: 'rgba(255,255,255,0.10)',
    glassBorder: 'rgba(255,255,255,0.18)',
    blurTint: 'dark',
    blobs: ['#2F7A74', '#8A3E86', '#5A4AA8', '#B04A74', '#C9884A'],
    divider: 'rgba(255,255,255,0.12)',
    radioOff: '#CDB8C3',
    iconCircle: 'rgba(255,255,255,0.12)',
    illustration: ['#7A66B4', '#C26B88', '#3A1F48'],
    cardGlass: 'rgba(30,26,43,0.5)',
    deckHeader: {
      regular: { bg: 'rgba(251,235,230,0.92)', text: '#2B1F36' },
      intimate: { bg: '#C2335A', text: '#FFFFFF' },
    },
  },
};

/** Fonts: Nunito for the UI, Comfortaa for the app name and menu title. */
export const FontFamily = {
  ui: 'Nunito_700Bold',
  uiHeavy: 'Nunito_800ExtraBold',
  brand: 'Comfortaa_700Bold',
} as const;
