import {
  ViewProps,
  ViewStyle,
  TextStyle,
  StyleProp,
  TextProps,
} from 'react-native';
import {ColorsType, FontSizeType, SpaceType} from '../constants/values';
import {FontStyles} from '../components/elements/CustomText';
import {shadowStyles} from '../components/elements/Row';
import {AnimatedProps} from 'react-native-reanimated';

type BoxKeys = keyof Pick<
  ViewStyle,
  'gap' | 'rowGap' | 'columnGap' | 'backgroundColor'
>;
export type BoxProps = Omit<ViewProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
  gap?: SpaceType;
  backgroundColor?: ColorsType;
  bgOpacity?: string; //IN HEX
  shadow?: keyof typeof shadowStyles;
  onPress?: () => void;
  onLongPress?: () => void;
  animation?: AnimatedProps<{}>;
  clickAnimation?: boolean;
};

type TextKeys = keyof Pick<TextStyle, 'color' | 'fontSize' | 'fontFamily'>;
export type CustomTextProps = Omit<ViewProps, 'style'> & {
  style?: Array<Omit<TextStyle, TextKeys>> | Omit<TextStyle, TextKeys>;
  boxStyles?: StyleProp<ViewStyle>;
  font?: FontStyles;
  size?: FontSizeType;
  color?: ColorsType;
  onPress?: () => void;
} & TextProps;
