import {FC} from 'react';
import {Column} from '../../../components/elements/Column';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AppBorderRadius, AppSpace} from '../../../constants/values';
import {Dimensions} from 'react-native';

export const DailyProgressTotalShimmer: FC = () => {
  const boxSize = Dimensions.get('screen').width * 0.3;
  const circleSize = Dimensions.get('screen').height * 0.22;
  return (
    <Column className="h-[40vh] w-full items-center justify-center">
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          alignItems="center"
          justifyContent="space-between"
          flexDirection="column"
          width={'100%'}
          height={'100%'}
          gap={40}>
          <SkeletonPlaceholder.Item
            width={circleSize}
            height={circleSize}
            borderRadius={9999}
          />
          <SkeletonPlaceholder.Item
            justifyContent="space-between"
            height={boxSize + AppSpace.xl}
            width={'100%'}
            flexDirection="row">
            {new Array(3).fill(1).map((_, index) => (
              <SkeletonPlaceholder.Item
                key={index}
                width={boxSize}
                height={boxSize * 0.75}
                borderRadius={AppBorderRadius.rounded}
              />
            ))}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Column>
  );
};
