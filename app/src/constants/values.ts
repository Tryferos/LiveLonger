const colors = Object.freeze({
  black: '#000000',
  white: '#FFFFFF',
  gray: '#555555',
  grayLight: '#f2f2f2',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  main: '#2563eb',
  mainLight: '#38bdf8',
  transparent: 'transparent',
  lightOrange: '#ffedd5',
  green: '#34d399',
  error: '#f87171',
  errorLight: '#ef4444',
  success: '#22c55e',
  successLight: '#16a34a',
  warning: '#f59e0b',
  promise: '#94a3b8',
});

const fontSize = Object.freeze({
  '3xs': 10,
  '2xs': 11,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
  '6xl': 64,
  '7xl': 96,
  '8xl': 128,
});

const iconSize = Object.freeze({
  '4xs': 4,
  '3xs': 8,
  '2xs': 12,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
  '2xl': 64,
  '3xl': 96,
});

const space = Object.freeze({
  zero: 0,
  one: 1,
  '4xs': 2,
  '3xs': 4,
  '2xs': 8,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
});

const borderRadius = Object.freeze({
  sharp: 0,
  small: 4,
  normal: 8,
  rounded: 16,
  full: 9999,
});

type Colors = keyof typeof colors;
type FontSize = keyof typeof fontSize;
type IconSize = keyof typeof iconSize;
type BorderRadius = keyof typeof borderRadius;
type Space = keyof typeof space;

export {
  //* Values to use
  colors as AppColors,
  fontSize as AppFontSize,
  iconSize as AppIconSize,
  borderRadius as AppBorderRadius,
  space as AppSpace,
  //* Types shortcut
  type Colors as ColorsType,
  type FontSize as FontSizeType,
  type IconSize as IconSizeType,
  type Space as SpaceType,
  type BorderRadius as BorderRadiusType,
};
