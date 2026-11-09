import type { ReactNode } from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type IconName =
  | 'menu'
  | 'back'
  | 'sun'
  | 'moon'
  | 'check'
  | 'arrow-right'
  | 'person'
  | 'cards'
  | 'calendar'
  | 'gift'
  | 'chat'
  | 'mood'
  | 'heart'
  | 'sparkle';

type Props = {
  name: IconName;
  color: string;
  size?: number;
  strokeWidth?: number;
};

export function Icon({ name, color, size = 24, strokeWidth = 2 }: Props) {
  const stroke = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  let content: ReactNode;
  switch (name) {
    case 'menu':
      content = <Path d="M5 7h14M5 12h14M5 17h14" {...stroke} />;
      break;
    case 'back':
      content = <Path d="M19 12H5M11 6l-6 6 6 6" {...stroke} />;
      break;
    case 'arrow-right':
      content = <Path d="M5 12h14M13 6l6 6-6 6" {...stroke} />;
      break;
    case 'check':
      content = <Path d="M5 12.5l4.5 4.5L19 7.5" {...stroke} />;
      break;
    case 'sun':
      content = (
        <>
          <Circle cx={12} cy={12} r={4} {...stroke} />
          <Path
            d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"
            {...stroke}
          />
        </>
      );
      break;
    case 'moon':
      content = <Path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" {...stroke} />;
      break;
    case 'person':
      content = (
        <>
          <Circle cx={12} cy={8} r={4} {...stroke} />
          <Path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" {...stroke} />
        </>
      );
      break;
    case 'cards':
      content = (
        <>
          <Rect x={4} y={7} width={12} height={14} rx={3} {...stroke} />
          <Path d="M8 3.5h9a3 3 0 0 1 3 3V15" {...stroke} />
        </>
      );
      break;
    case 'calendar':
      content = (
        <>
          <Rect x={4} y={5} width={16} height={15} rx={3} {...stroke} />
          <Path d="M4 10h16M8 3v4M16 3v4" {...stroke} />
        </>
      );
      break;
    case 'gift':
      content = (
        <>
          <Rect x={4} y={10} width={16} height={10} rx={2} {...stroke} />
          <Path d="M3 10h18M12 10v10" {...stroke} />
          <Path d="M12 10c-1-3.5-5-3.5-5-1.5S10.5 10 12 10zM12 10c1-3.5 5-3.5 5-1.5S13.5 10 12 10z" {...stroke} />
        </>
      );
      break;
    case 'chat':
      content = (
        <Path
          d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
          {...stroke}
        />
      );
      break;
    case 'mood':
      content = (
        <>
          <Circle cx={12} cy={12} r={9} {...stroke} />
          <Path d="M8 14c1 1.6 2.4 2.4 4 2.4s3-.8 4-2.4" {...stroke} />
          <Circle cx={9} cy={10} r={0.8} fill={color} />
          <Circle cx={15} cy={10} r={0.8} fill={color} />
        </>
      );
      break;
    case 'heart':
      content = (
        <Path
          d="M12 20.5C5 15.5 3 11.8 3 8.8 3 6.2 5 4.5 7.3 4.5c1.9 0 3.5 1 4.7 2.9 1.2-1.9 2.8-2.9 4.7-2.9C19 4.5 21 6.2 21 8.8c0 3-2 6.7-9 11.7z"
          fill={color}
        />
      );
      break;
    case 'sparkle':
      content = <Path d="M12 2l2.2 7.3L22 12l-7.8 2.7L12 22l-2.2-7.3L2 12l7.8-2.7z" fill={color} />;
      break;
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {content}
    </Svg>
  );
}
