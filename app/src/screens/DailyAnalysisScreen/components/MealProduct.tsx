import React, {FC, useEffect, useRef, useState} from 'react';
import {Column} from '../../../components/elements/Column';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius} from '../../../constants/values';
import {useSearchProducts} from '../../../store/search_products';
import {MealType, Product} from '../../../types/nutrition';
import {MealProductImage} from './MealProductImage';

export type MealProductProps = {
  mealType: MealType;
  onPress?: () => void;
  canBeSelected?: boolean;
} & Product;

export const MealProduct: FC<MealProductProps> = props => {
  const {
    mealType,
    imageUrl,
    name,
    quantity,
    onPress,
    canBeSelected = true,
  } = props;
  const {selectProduct, selectedProducts} = useSearchProducts();
  const [selectedUnselectable, setSelectedUnselectable] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onLongPress = () => {
    if (canBeSelected) {
      selectProduct(props);
    } else {
      setSelectedUnselectable(prev => !prev);
    }
  };

  useEffect(() => {
    if (selectedUnselectable) {
      timeoutRef.current = setTimeout(() => {
        setSelectedUnselectable(false);
      }, 2000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedUnselectable]);

  const isSelected = selectedProducts.some(p => p._id === props._id);
  return (
    <Row
      gap="xs"
      className="px-4 py-2 relative"
      style={{borderRadius: AppBorderRadius.rounded}}
      onLongPress={onLongPress}
      onPress={onPress}
      bgOpacity="35"
      backgroundColor={
        selectedUnselectable
          ? 'error'
          : isSelected
          ? 'mainLight'
          : 'transparent'
      }>
      <MealProductImage mealType={mealType} imageUrl={imageUrl} name={name} />
      <Column gap="3xs">
        <CustomText font="wotfardMedium">{name}</CustomText>
        <CustomText color="gray" font="wotfardMedium" size="sm">
          {quantity}g
        </CustomText>
      </Column>
      {isSelected && (
        <Row className="absolute h-full top-2 items-center right-4">
          <CustomIcon icon="check" size="md" color="main" />
        </Row>
      )}
      {selectedUnselectable && (
        <Row className="absolute h-full top-2 items-center right-4">
          <CustomIcon icon="close" size="md" color="warning" />
        </Row>
      )}
    </Row>
  );
};
