import React, {FC} from 'react';
import {Column} from '../../../components/elements/Column';
import {Row} from '../../../components/elements/Row';
import {
  NutrimentKeys,
  NutrimentSecondayKeys,
  calculatePercentage,
  calculateValueBasedOnTotal,
} from '../../../constants/nutrition';
import {Product} from '../../../types/nutrition';
import {NutrimentBox} from './NutrimentBox';
import {NutrimentRow} from './NutrimentRow';

export const ProductNutrition: FC<Pick<Product, 'nutrients' | 'quantity'>> = ({
  nutrients,
  quantity,
}) => {
  return (
    <Column gap="md">
      <Row className="justify-between">
        {Object.keys(NutrimentKeys).map((key, i) => {
          const value = nutrients[NutrimentKeys[key]];
          const valueBasedOnTotal = calculateValueBasedOnTotal(value, quantity);
          const percentageValue = calculatePercentage(
            valueBasedOnTotal,
            quantity,
          );
          return (
            <NutrimentBox
              key={i}
              title={key}
              value={`${valueBasedOnTotal.toFixed(1)}g`}
              percentage={percentageValue}
            />
          );
        })}
      </Row>
      <Column className="" gap="2xs">
        {Object.keys(NutrimentSecondayKeys).map((key, i) => {
          const value = nutrients[NutrimentSecondayKeys[key]];
          const valueBasedOnTotal = calculateValueBasedOnTotal(value, quantity);
          const percentageValue = calculatePercentage(
            valueBasedOnTotal,
            quantity,
          );
          return (
            <NutrimentRow
              key={i}
              title={key}
              value={`${valueBasedOnTotal.toFixed(1)}g`}
              percentage={percentageValue}
            />
          );
        })}
      </Column>
    </Column>
  );
};
