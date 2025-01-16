import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Brightness} from 'react-native-color-matrix-image-filters';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppNavigation} from '../../types/navigation';
import {Column} from '../elements/Column';
import {CustomIcon} from '../elements/CustomIcon';
import {CustomText} from '../elements/CustomText';
import {RoundedBox} from '../elements/RoundedBox';
import {Row} from '../elements/Row';
import {Spacer} from '../elements/Spacer';

type ImageScreenProps = {
  children: React.ReactNode;
  src: string;
  onBack?: () => void;
  useScrollView?: boolean;
  onScrollEnabled?: (value: boolean) => void;
} & HeaderProps;

export const ImageScreen: FC<ImageScreenProps> = ({
  children,
  src,
  useScrollView = false,
  onScrollEnabled,
  ...rest
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollEnabled, setScrollable] = useState(false);
  const screenHeight = Dimensions.get('screen').height;
  const maxTotalHeight = screenHeight * 0.85;
  const maxHeight = Math.max(
    screenHeight * 0.6 - 48,
    Math.min(screenHeight * 0.6 - 48 + scrollY, screenHeight * 0.85),
  );
  const scrollRef = useRef<number>(maxHeight);

  useEffect(() => {
    if (maxHeight >= maxTotalHeight) {
      setScrollable(true);
    }
  }, [maxHeight, maxTotalHeight]);

  const handleTouch = (event: GestureResponderEvent) => {
    const position = event.nativeEvent.pageY;
    if (scrollEnabled) {
      return;
    }
    if (position < scrollRef.current) {
      setScrollY(prev => prev + 16);
    } else {
      setScrollY(prev => prev - 12);
    }
    scrollRef.current = position;
  };

  useEffect(() => {
    if (onScrollEnabled) {
      onScrollEnabled(scrollEnabled);
    }
  }, [scrollEnabled]);

  const Children = useMemo(() => {
    if (useScrollView) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
          onTouchMove={handleTouch}
          className="">
          {children}
          <Spacer size="sm" />
        </ScrollView>
      );
    } else {
      return children;
    }
  }, [useScrollView, children, scrollEnabled]);
  return (
    <Column className="px-4 w-[100%] h-[100%] pt-12 relative">
      <ImageHeader src={src} blurRadius={(scrollY / 300).between(0, 2)} />
      <Header {...rest} />
      <Column
        className="basis-[60%] bg-white absolute bottom-0 left-0 m-0 w-[100vw] rounded-t-3xl px-4 pt-6 pb-6"
        style={{
          maxHeight: maxHeight,
          minHeight: '60%',
          paddingBottom: 0,
        }}>
        <>{Children}</>
      </Column>
    </Column>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

const ImageHeader: FC<Pick<ImageScreenProps, 'src'> & {blurRadius: number}> = ({
  src,
  blurRadius,
}) => {
  return (
    <Brightness
      className="absolute top-0 left-0 w-[100vw] h-[50%]"
      amount={0.6}>
      <Image
        source={{uri: src}}
        resizeMode="cover"
        style={{...styles.image}}
        blurRadius={blurRadius}
      />
    </Brightness>
  );
};

type HeaderProps = {
  title: string;
  onBack?: () => void;
};

const Header: FC<HeaderProps> = ({title, onBack}) => {
  const navigation = useAppNavigation();
  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
      return;
    }
    navigation.goBack();
  };
  return (
    <Row className="items-center justify-between border-divider mb-5">
      <TouchableOpacity onPress={handleBack}>
        <RoundedBox>
          <CustomIcon
            icon="arrow-back-ios-new"
            size="xs"
            color="white"
            style={{marginRight: 2}}
          />
        </RoundedBox>
      </TouchableOpacity>
      <CustomText font="wotfardMedium" size={'lg'} color="white">
        {title}
      </CustomText>
      <RoundedBox>
        <CustomIcon
          icon="settings"
          size="xs"
          color="white"
          onPress={() => {}}
        />
      </RoundedBox>
    </Row>
  );
};
