import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

type Props = {
  width: number;
  height: number;
  /** Градієнт фону: персик → рожевий → слива (світла) / фіолетовий → … (темна) */
  gradient: [string, string, string];
};

/**
 * Заглушка під власні ілюстрації: двоє м'яких персонажів тримаються за руки
 * під сонцем, між ними серце.
 */
export function CardIllustration({ width, height, gradient }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 300" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="card-bg" x1="0" y1="0" x2="0.6" y2="1">
          <Stop offset="0" stopColor={gradient[0]} />
          <Stop offset="0.55" stopColor={gradient[1]} />
          <Stop offset="1" stopColor={gradient[2]} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={320} height={300} fill="url(#card-bg)" />

      {/* Сонце з ореолом */}
      <Circle cx={160} cy={78} r={58} fill="#FFF3C4" opacity={0.28} />
      <Circle cx={160} cy={78} r={36} fill="#FFE9A8" opacity={0.95} />

      {/* Пагорби */}
      <Path d="M0 232 Q80 196 160 224 T320 214 L320 300 L0 300 Z" fill="#FFFFFF" opacity={0.16} />

      {/* Лівий персонаж (персиковий) */}
      <Rect x={88} y={158} width={50} height={84} rx={25} fill="#FFB98A" />
      <Circle cx={113} cy={140} r={24} fill="#FFD2B0" />
      <Circle cx={105} cy={138} r={2.4} fill="#5B3A4A" />
      <Circle cx={121} cy={138} r={2.4} fill="#5B3A4A" />
      <Path d="M107 148 Q113 153 119 148" stroke="#5B3A4A" strokeWidth={2.4} strokeLinecap="round" fill="none" />

      {/* Правий персонаж (лавандовий) */}
      <Rect x={182} y={158} width={50} height={84} rx={25} fill="#B7A3F2" />
      <Circle cx={207} cy={140} r={24} fill="#D8CBFA" />
      <Circle cx={199} cy={138} r={2.4} fill="#5B3A4A" />
      <Circle cx={215} cy={138} r={2.4} fill="#5B3A4A" />
      <Path d="M201 148 Q207 153 213 148" stroke="#5B3A4A" strokeWidth={2.4} strokeLinecap="round" fill="none" />

      {/* Руки, що тримаються */}
      <Path d="M132 190 Q160 206 188 190" stroke="#FFB98A" strokeWidth={12} strokeLinecap="round" fill="none" />
      <Path d="M160 198 Q172 198 188 190" stroke="#B7A3F2" strokeWidth={12} strokeLinecap="round" fill="none" />

      {/* Серце між ними */}
      <Path
        d="M160 176 C139 158 148 142 160 154 C172 142 181 158 160 176 Z"
        fill="#FF7A9C"
      />
    </Svg>
  );
}
