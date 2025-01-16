import {FC} from 'react';
import {
  NutrimentIcons,
  calculatePercentage,
  calculateValueBasedOnTotal,
} from '../../../constants/nutrition';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius, AppSpace} from '../../../constants/values';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {getProductIconFromName} from '../../../libs/products';
import {Brightness} from 'react-native-color-matrix-image-filters';
import {Spacer} from '../../../components/elements/Spacer';
import {View} from 'react-native';

export type NutrimentProps = {
  title: string;
  value: string;
  percentage: string;
};
export const NutrimentBox: FC<NutrimentProps> = ({
  title,
  value,
  percentage,
}) => {
  const percentageValue = parseFloat(
    percentage.replace('%', '').replace('(', '').replace(')', ''),
  );
  return (
    <Column
      gap="md"
      style={{borderRadius: AppBorderRadius.normal}}
      backgroundColor="gray200"
      className=" px-2 py-2 pb-3 relative w-[30%] justify-between">
      <Row className="items-center justify-start" gap="2xs">
        <CustomText size="sm" className="" color="error">
          {NutrimentIcons[title]}
        </CustomText>
        <CustomText font="wotfardMedium" size="sm" color="black">
          {title}
        </CustomText>
      </Row>
      {/* <Row className="absolute w-full h-full left-0 top-0 justify-center items-center">
        <CustomText size="xl" className="" color="error">
          {NutrimentIcons[title]}
        </CustomText>
      </Row> */}
      <Row
        className="items-center"
        backgroundColor={'gray200'}
        style={{gap: AppSpace['2xs']}}>
        <CustomText color="black" size="sm">
          {value}
        </CustomText>
        <CustomText color="gray" size="xs" style={{}}>
          {percentage}
        </CustomText>
      </Row>
      <Row
        className="absolute bottom-1 left-2 h-[2px] w-[100%] z-[100]"
        backgroundColor="white"
        style={{width: `100%`, borderRadius: AppBorderRadius.full}}
      />
      <Row
        className="absolute bottom-1 left-2 h-[2px] z-[200]"
        backgroundColor="main"
        style={{
          width: `${percentageValue}%`,
          borderRadius: AppBorderRadius.full,
        }}
      />
    </Column>
  );
};
