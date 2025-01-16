import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Column} from '../../../components/elements/Column';
import {AppBorderRadius, AppSpace} from '../../../constants/values';

export const DailyMealsInfoShimmer = () => {
  return (
    <Column className="h-[20vh]">
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="column" gap={AppSpace['3xs']}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={24}
            borderRadius={AppBorderRadius.rounded}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={'85%'}
            borderRadius={AppBorderRadius.rounded}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Column>
  );
};
