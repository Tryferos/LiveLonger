import {FC, useEffect, useState} from 'react';
import {Column} from '../../../components/elements/Column';
import {
  getSelectedProductsSorted,
  useSearchProducts,
} from '../../../store/search_products';
import {Product} from '../../../types/nutrition';
import {Row} from '../../../components/elements/Row';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomText} from '../../../components/elements/CustomText';
import {AppBorderRadius, AppColors, AppSpace} from '../../../constants/values';
import {Modal} from '../../../components/wrappers/ModalWrapper';
import {QuantityPickerModalContent} from '../../../components/wrappers/QuantityPickerModal';
import {QuantityPicker} from '../../QRProductScreen/components/QuantityPicker';
import {ProductNutrition} from './ProductNutrition';
import {MiniCard} from '../../../components/organisms/MiniCard';
import {Spacer} from '../../../components/elements/Spacer';

export const ProductsList = () => {
  const {selectNewQuantity} = useSearchProducts();
  const {selectedProducts} = getSelectedProductsSorted();
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const handleToggle = (value: boolean) => () => setPickerVisible(value);
  const onChange = (value: number) => {
    if (!productToEdit) return;
    selectNewQuantity(productToEdit, value);
  };

  const setNewProductToEdit = (product: Product) => {
    setProductToEdit(product);
    setPickerVisible(true);
  };

  useEffect(() => {
    if (selectedProducts.length === 0) return;
    setProductToEdit(selectedProducts[0]);
  }, []);
  if (selectedProducts.length < 2) {
    return null;
  }
  return (
    <Column gap="3xs">
      <Row className="items-center justify-between">
        <CustomText font="wotfardMedium" size="md" color="black">
          {'Individual Products'}
        </CustomText>
        <CustomIcon icon="edit" size="xs" color="black" />
      </Row>
      <Spacer size="3xs" />
      {selectedProducts.map((product, i) => (
        <ProductNutrition
          onPress={() => setNewProductToEdit(product)}
          key={i}
          {...product}
        />
      ))}
      {productToEdit ? (
        <Modal
          isVisible={pickerVisible}
          onClose={handleToggle.apply(this, [false])}
          style={{gap: AppSpace['sm'], justifyContent: 'space-between'}}
          title="Select quantity">
          <QuantityPickerModalContent
            onClose={handleToggle.apply(this, [false])}
            label="g"
            selectedValue={productToEdit.quantity}
            onSelect={onChange}
          />
        </Modal>
      ) : null}
    </Column>
  );
};
type ProductItemProps = Product & {
  selectProduct: () => void;
  isSelected: boolean;
  onIconPress: () => void;
};
const ProductItem: FC<ProductItemProps> = ({
  name,
  calories,
  quantity,
  nutrients,
  isSelected,
  onIconPress,
  selectProduct,
}) => {
  return (
    <Row
      onPress={isSelected ? onIconPress : selectProduct}
      className="justify-between items-center py-4 px-4"
      style={{
        borderRadius: AppBorderRadius.normal,
        borderWidth: isSelected ? 1.5 : 0,
        borderColor: AppColors.main,
      }}
      backgroundColor="white"
      shadow="shadowBottom">
      <CustomIcon
        onPress={isSelected ? onIconPress : selectProduct}
        icon={isSelected ? 'edit' : 'check'}
        color="black"
        size="xs"
      />
      <CustomText font="wotfardMedium" size="md" color="black">
        {name}
      </CustomText>
      <CustomText font="wotfardMedium" size="xs" color="gray">
        {quantity} g
      </CustomText>
    </Row>
  );
};
