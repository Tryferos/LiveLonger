import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {LayoutChangeEvent, StyleSheet} from 'react-native';
import {isEmulator} from 'react-native-device-info';
import {
  Camera,
  CameraPosition,
  CodeScannerFrame,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {Column} from '../../components/elements/Column';
import {CustomIcon} from '../../components/elements/CustomIcon';
import {CustomText} from '../../components/elements/CustomText';
import {Row} from '../../components/elements/Row';
import {ScreenWrapper} from '../../components/wrappers/ScreenWrapper';
import {AppBorderRadius} from '../../constants/values';
import {useAppNavigation, useAppRouteParams} from '../../types/navigation';

type CameraHighlight = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export const ScannerScreen = () => {
  const navigation = useAppNavigation();
  const {addToQuickMeal = false} = useAppRouteParams<'Scanner_Screen'>() ?? {};
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
  const cameraDevice = useCameraDevice(cameraPosition);
  const {hasPermission, requestPermission} = useCameraPermission();
  const [isActive, setIsActive] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      requestPermission().then(allowsCamera => {
        if (!allowsCamera) {
          navigation.goBack();
        }
      });
    }, []),
  );

  useEffect(() => {}, [cameraDevice, hasPermission]);

  const codes = [
    5201004028273, 4056489038634, 5059319020709, 5201182083255, 5060639129072,
    8588006751239,
  ];

  useEffect(() => {
    (async () => {
      const emulator = await isEmulator();
      if (emulator) {
        handleNavigate(codes[5]);
      }
    })();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'upc-a'],
    onCodeScanned: (codes, frame) => {
      if (codes.length !== 0) {
        const {value} = codes[0];
        setIsActive(false);
        handleNavigate(value ? parseInt(value) : undefined);
      }
    },
  });
  const handleNavigate = (code?: number) => {
    if (code) {
      navigation.navigate('QR_Product_Screen', {
        code: code,
        addToQuickMeal: addToQuickMeal,
      });
    }
  };
  const handleCameraRotate = () => {
    if (cameraPosition === 'back') {
      setCameraPosition('front');
      return;
    }
    setCameraPosition('back');
  };

  return (
    <ScreenWrapper scrollView={false} style={{minHeight: undefined}} title="">
      <Column className="h-[80vh]" gap="lg">
        <Row className="w-full h-[80%] relative">
          {cameraDevice && hasPermission ? (
            <Camera
              isActive={isActive}
              device={cameraDevice}
              style={[StyleSheet.absoluteFill]}
              codeScanner={codeScanner}
            />
          ) : (
            <CustomText>No camera found</CustomText>
          )}
          {/* <HightlightBox
            highlight={codeScannerHighlights}
            layout={layout}
            scanFrame={scanFrame}
          /> */}
        </Row>
        <Row className="justify-between w-full items-center">
          <Row />
          <Row
            className="p-2"
            backgroundColor={'main'}
            style={{borderRadius: AppBorderRadius.rounded}}>
            <CustomIcon icon="qr-code-2" size={'xl'} color="white" />
          </Row>
          <Row
            onPress={handleCameraRotate}
            className="p-2"
            backgroundColor="lightOrange"
            style={{borderRadius: AppBorderRadius.rounded}}>
            <CustomIcon icon="rotate-right" />
          </Row>
        </Row>
      </Column>
    </ScreenWrapper>
  );
};
type HightlightBoxProps = {
  highlight?: CameraHighlight;
  layout: LayoutChangeEvent['nativeEvent']['layout'];
  scanFrame: CodeScannerFrame;
};
const HightlightBox = ({highlight, layout, scanFrame}: HightlightBoxProps) => {
  if (
    !highlight ||
    highlight.height == undefined ||
    highlight.width == undefined ||
    highlight.x == undefined ||
    highlight.y == undefined
  ) {
    return null;
  }
  return (
    <Row
      style={[
        {
          position: 'absolute',
          borderWidth: 2,
          borderColor: 'red',
        },
        {
          right: highlight.x * (layout.width / scanFrame.height),
          top: highlight.y * (layout.height / scanFrame.width),
          height: highlight.height * (layout.width / scanFrame.height),
          width: highlight.width * (layout.height / scanFrame.width),
        },
      ]}
    />
  );
};
