export type ThemeMode = 'light' | 'dark';

export type Palette = {
  mode: ThemeMode;
  /** Базовий фон екрана */
  bg: string;
  text: string;
  textSecondary: string;
  /** Акцент: стрілка, вибраний стан */
  accent: string;
  /** Мітка «ДАЛІ» під час свайпу */
  label: string;
  /** Вибраний таб / пункт панелі */
  selectedBg: string;
  selectedText: string;
  /** Скляні панелі та кнопки */
  glass: string;
  glassBorder: string;
  blurTint: 'light' | 'dark';
  /** П'ять кольорових плям фону: м'ята, рожева, лаванда, персик, масло */
  blobs: [string, string, string, string, string];
  divider: string;
  radioOff: string;
  iconCircle: string;
  /** Градієнт ілюстрації картки */
  illustration: [string, string, string];
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
  },
};

/** Шрифти: Nunito для інтерфейсу, Comfortaa для назви та заголовка меню. */
export const FontFamily = {
  ui: 'Nunito_700Bold',
  uiHeavy: 'Nunito_800ExtraBold',
  brand: 'Comfortaa_700Bold',
} as const;
