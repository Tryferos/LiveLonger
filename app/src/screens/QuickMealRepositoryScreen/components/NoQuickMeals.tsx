import React, {FC} from 'react';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {EmptyIcon} from '../../../svgs/empty';

export const NoQuickMeals: FC = () => {
  return (
    <Column className="items-center h-[60vh] justify-start" gap="3xs">
      <EmptyIcon width={'80%'} height={'100%'} />
      <CustomText color="gray">
        {'You have yet to add any quick meals.'}
      </CustomText>
    </Column>
  );
};
