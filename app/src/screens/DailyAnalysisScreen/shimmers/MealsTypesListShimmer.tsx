import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius, AppSpace} from '../../../constants/values';

export const MealsTypesListShimmer = () => {
  return (
    <Row className="w-full justify-center mt-4">
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="column" gap={AppSpace['xs']}>
          {new Array(6).fill(1).map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              flexDirection="row"
              paddingHorizontal={AppSpace['2xs']}
              gap={AppSpace['2xs']}>
              <SkeletonPlaceholder.Item
                width={64}
                height={64}
                borderRadius={AppBorderRadius.rounded}
              />
              <SkeletonPlaceholder.Item
                width={'70%'}
                justifyContent="space-between"
                flexDirection="column"
                paddingVertical={AppSpace['2xs']}
                gap={AppSpace['3xs']}>
                <SkeletonPlaceholder.Item
                  height={8}
                  borderRadius={AppBorderRadius.normal}
                />
                <SkeletonPlaceholder.Item
                  height={8}
                  borderRadius={AppBorderRadius.normal}
                />
                <SkeletonPlaceholder.Item
                  height={16}
                  borderRadius={AppBorderRadius.normal}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Row>
  );
};
