import {FC} from 'react';
import {Product} from '../../../types/nutrition';
import {Row} from '../../../components/elements/Row';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {AppBorderRadius} from '../../../constants/values';
import {MiniCard} from '../../../components/organisms/MiniCard';
import {ScrollView} from 'react-native';
import {NutrimentIcons, NutrimentKeys} from '../../../constants/nutrition';

type ProductNutritionProps = Product & {
  onPress?: () => void;
};

export const ProductNutrition: FC<ProductNutritionProps> = ({
  nutrients,
  name,
  calories,
  quantity,
  onPress,
}) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <Row gap="2xs">
        <MiniCard
          onPress={onPress}
          label={name}
          value={`${quantity.toFixed(0)} g`}
          icon="📦"
        />
        {Object.keys(NutrimentKeys).map((key, i) => {
          const value = nutrients[NutrimentKeys[key]];
          if (value == 0) return null;
          return (
            <MiniCard
              key={key + i}
              icon={NutrimentIcons[key]}
              label={key}
              value={`${value.toFixed(1)} g`}
            />
          );
        })}
      </Row>
    </ScrollView>
  );
};
