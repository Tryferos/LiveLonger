import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Column} from '../../../components/elements/Column';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius, AppSpace} from '../../../constants/values';

export const QuickMealsCardsShimmer = () => {
  return (
    <Row>
      <Column gap="sm" className="h-[80vh] w-full">
        {new Array(4).fill(0).map((_, i) => (
          <Column key={i} className="h-[20vh] w-full">
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                flexDirection="column"
                position="relative"
                gap={AppSpace['3xs']}>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={'85%'}
                  borderRadius={AppBorderRadius.rounded}
                />
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={24}
                  borderRadius={AppBorderRadius.rounded}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </Column>
        ))}
      </Column>
    </Row>
  );
};
