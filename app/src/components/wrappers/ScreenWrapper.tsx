import React, {FC, PropsWithChildren, useMemo} from 'react';
import {View, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {InitialScreenNames} from '../../constants/navigation';
import {AppColors, AppSpace, SpaceType} from '../../constants/values';
import {BottomFoods} from '../../screens/IndivudualProductScreen/components/BottomFoods';
import {AppIconsType} from '../../types/icons';
import {useAppNavigation, useAppRoute} from '../../types/navigation';
import {Column} from '../elements/Column';
import {CustomIcon} from '../elements/CustomIcon';
import {CustomText} from '../elements/CustomText';
import {Row} from '../elements/Row';
import {UserHeader} from '../organisms/UserHeader';

type ScreenWrapperProps = {
  title?: string;
  centerTitle?: boolean;
  hasBgColor?: boolean;
  gap?: SpaceType;
  style?: ViewStyle;
  className?: string;
  showBottomFoods?: boolean;
  onBack?: () => void;
  showUserHeader?: boolean;
  trailingIcon?: AppIconsType;
  onTrailIconPress?: () => void;
  canGoBack?: boolean;
  scrollView?: boolean;
  bottomChildren?: React.ReactNode;
  basisBottom?: number;
} & PropsWithChildren;

export const ScreenWrapper: FC<ScreenWrapperProps> = props => {
  const {
    children,
    centerTitle = false,
    hasBgColor = true,
    gap = 'md',
    style: extraStyles,
    showBottomFoods = false,
    className,
    scrollView = true,
    bottomChildren,
    basisBottom = 10,
  } = props;
  const paddingHorizotal = AppSpace.sm;
  const hasBottomChildren = bottomChildren && !scrollView;
  const Children = useMemo(() => {
    return (
      <Column
        style={{
          paddingHorizontal: AppSpace.xs,
          paddingTop: 0,
          paddingBottom: AppSpace.xs,
          width: '100%',
          ...extraStyles,
        }}
        gap={gap}
        className={className}>
        {children}
      </Column>
    );
  }, [children, extraStyles, className, gap]);
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={[
        hasBgColor ? AppColors.mainLight : AppColors.white,
        hasBgColor ? `${AppColors.mainLight}77` : AppColors.white,
        hasBgColor ? `${AppColors.mainLight}44` : AppColors.white,
        hasBgColor ? `${AppColors.mainLight}33` : AppColors.white,
        hasBgColor ? `${AppColors.mainLight}33` : AppColors.white,
        hasBgColor ? `${AppColors.mainLight}22` : AppColors.white,
        AppColors.transparent,
        AppColors.transparent,
        AppColors.transparent,
        AppColors.transparent,
        AppColors.transparent,
      ]}
      style={{
        flex: 1,
        paddingTop: AppSpace['2xl'],
      }}>
      {showBottomFoods && <BottomFoods />}
      <Row
        style={{
          paddingHorizontal: paddingHorizotal,
          flexBasis: '9%',
        }}>
        <Header {...props} centerTitle={centerTitle} />
      </Row>
      <Row
        style={{flexBasis: hasBottomChildren ? `${93 - basisBottom}%` : '91%'}}>
        {scrollView ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{}}
            className="w-[100%] h-[100%] flex">
            {Children}
          </ScrollView>
        ) : (
          <>{Children}</>
        )}
      </Row>
      {hasBottomChildren ? (
        <Row
          style={{
            flexBasis: `${basisBottom}%`,
            paddingHorizontal: paddingHorizotal,
            alignItems: 'flex-start',
            paddingVertical: 0,
          }}>
          {bottomChildren}
        </Row>
      ) : null}
    </LinearGradient>
  );
};

const Header: FC<ScreenWrapperProps> = ({
  title = '',
  centerTitle,
  onBack,
  showUserHeader = false,
  trailingIcon,
  onTrailIconPress,
  canGoBack = true,
}) => {
  const navigator = useAppNavigation();
  const router = useAppRoute();
  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
      return;
    }
    navigator.goBack();
  };
  const showIcon =
    canGoBack &&
    navigator.canGoBack() &&
    !InitialScreenNames.includes(router.name);

  if (showUserHeader) {
    return <UserHeader />;
  }

  return (
    <Row
      className={`pb-4 w-[100%] items-center ${
        centerTitle ? 'justify-between' : ''
      }`}
      gap={centerTitle ? undefined : 'sm'}
      style={{}}>
      {showIcon && (
        <CustomIcon
          icon={'arrow-back-ios'}
          onPress={handleBack}
          size={'sm'}
          color="black"
          style={{marginTop: 6}}
        />
      )}
      <CustomText
        style={{flex: 1}}
        className="text-center"
        font="wotfardMedium"
        size={'xl'}>
        {title}
      </CustomText>
      {trailingIcon ? (
        <CustomIcon
          onPress={onTrailIconPress}
          icon={trailingIcon}
          size={'md'}
          color={'black'}
        />
      ) : (
        <View />
      )}
    </Row>
  );
};
