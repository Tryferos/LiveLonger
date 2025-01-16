import React, {FC} from 'react';
import {RoundButton} from '../../../components/organisms/RoundButton';
import {AppSpace} from '../../../constants/values';
import {useSearchProducts} from '../../../store/search_products';
import {useAppNavigation} from '../../../types/navigation';

export const ProceedButton: FC = () => {
  const navigation = useAppNavigation();
  const {selectedProducts, products} = useSearchProducts();

  if (products.length == 0) {
    return null;
  } else {
    return (
      <RoundButton
        text={'Proceed'}
        onPress={() => navigation.navigate('Individual_Product_Screen')}
        style={{paddingVertical: AppSpace.xs}}
        disabled={selectedProducts.length === 0}
      />
    );
  }
};
