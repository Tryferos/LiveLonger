import React, {FC} from 'react';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {AppSpace} from '../../../constants/values';
import {QuickMealInfo} from '../../../types/nutrition';
import {ProductIcon} from './ProductIcon';

type Props = QuickMealInfo;

export const QuickMealProuductsList: FC<Props> = ({products}) => {
  const productsToShow = 2;
  const extraProducts = products.slice(productsToShow).length;
  return (
    <Column gap="2xs" className="">
      <CustomText font="wotfardMedium" size="md" color="gray200">
        {'Products'}
      </CustomText>
      <Row gap="xs" style={{marginLeft: AppSpace.zero}}>
        {products
          .slice(0, productsToShow)
          .map(({imageUrl, name, calories, _id}, i) => (
            <Row key={_id ?? i} gap="2xs">
              <ProductIcon name={name} imageUrl={imageUrl} />
              <Column
                key={name + i}
                className="items-start justify-evenly pb-1">
                <CustomText
                  className="max-w-[28vw]"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  color="white"
                  font="wotfardMedium"
                  size="sm">
                  {name.upperFirst() + 'dd ola dd dio barid'}
                </CustomText>
                <CustomText color="gray200" size="xs">
                  {calories.toFixed(0)} kcal
                </CustomText>
              </Column>
            </Row>
          ))}
      </Row>
      {extraProducts > 0 && (
        <Row className="">
          <CustomText
            style={{}}
            color="gray200"
            size="sm">{`and ${extraProducts} more product${
            extraProducts > 1 ? 's' : ''
          }...`}</CustomText>
        </Row>
      )}
    </Column>
  );
};
