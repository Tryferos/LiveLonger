import {FC} from 'react';
import {RoundButton} from '../../../components/organisms/RoundButton';
import {AppSpace} from '../../../constants/values';

type SearchButtonProps = {
  onPress: () => void;
  disabled: boolean;
};

export const SearchButton: FC<SearchButtonProps> = ({onPress, disabled}) => {
  return (
    <RoundButton
      text={'Search'}
      onPress={onPress}
      style={{paddingVertical: AppSpace['xs']}}
      disabled={disabled}
    />
  );
};
