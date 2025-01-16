import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius, AppSpace} from '../../../constants/values';

export const CalendarDayPickerShimmer = () => {
  return (
    <Row className="w-full justify-center">
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" gap={AppSpace['2xs']}>
          {new Array(5).fill(1).map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              width={64}
              height={78}
              borderRadius={AppBorderRadius.rounded}
            />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Row>
  );
};
