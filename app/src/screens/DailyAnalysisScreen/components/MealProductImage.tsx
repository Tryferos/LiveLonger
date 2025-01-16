import {FC} from 'react';
import {getProductIconFromName} from '../../../libs/products';
import {MealTypeIcon} from '../../IndivudualProductScreen/components/MealTypeIcon';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius, ColorsType} from '../../../constants/values';
import {Image, ImageStyle, StyleProp, StyleSheet} from 'react-native';
import {MealType, Product} from '../../../types/nutrition';

type MealProductProps = {
  mealType: MealType;
  backgroundColor?: ColorsType;
  style?: StyleProp<ImageStyle>;
} & Product;

export const MealProductImage: FC<
  Pick<
    MealProductProps,
    'mealType' | 'imageUrl' | 'name' | 'backgroundColor' | 'style'
  >
> = ({
  mealType,
  imageUrl,
  name: _name,
  backgroundColor = 'lightOrange',
  style,
}) => {
  const name = _name.toLowerCase();
  if (!imageUrl) {
    return (
      <MealTypeIcon bypassIcon={getProductIconFromName(name)} type={mealType} />
    );
  }
  return (
    <Row
      className="p-[10px]"
      backgroundColor={backgroundColor}
      style={{borderRadius: AppBorderRadius.rounded}}>
      <Image
        source={{uri: imageUrl}}
        resizeMode="cover"
        style={style ?? {...styles.image}}
        blurRadius={0}
      />
    </Row>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
  },
});
