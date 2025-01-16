import {FC} from 'react';
import {Row} from '../../../components/elements/Row';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AppBorderRadius, AppSpace} from '../../../constants/values';

export const CaloryProgressShimmer: FC = () => {
  return (
    <Row className="w-full justify-center">
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          paddingHorizontal={AppSpace['2xs']}
          justifyContent="space-between"
          gap={AppSpace['2xs']}>
          <SkeletonPlaceholder.Item
            width={'80%'}
            height={48}
            borderRadius={AppBorderRadius.normal}
          />
          <SkeletonPlaceholder.Item
            width={'20%'}
            height={48}
            borderRadius={AppBorderRadius.rounded}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Row>
  );
};
