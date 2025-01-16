import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Column} from '../../../components/elements/Column';
import {Spacer} from '../../../components/elements/Spacer';
import {AppBorderRadius, AppSpace} from '../../../constants/values';

export const QuickMealDetailShimmer = () => {
  return (
    <Column className="h-[50vh]">
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="column" gap={AppSpace['3xs']}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={24}
            borderRadius={AppBorderRadius.rounded}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={'40%'}
            borderRadius={AppBorderRadius.rounded}
          />
          <Spacer size="md" />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={24}
            borderRadius={AppBorderRadius.rounded}
          />
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={'45%'}
            borderRadius={AppBorderRadius.rounded}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Column>
  );
};
