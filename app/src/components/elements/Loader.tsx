import {ActivityIndicator} from 'react-native';
import {AppColors} from '../../constants/values';
import {Row} from './Row';
import useLoader from '../../store/loader';

export const Loader = () => {
  const {isLoading} = useLoader();
  if (!isLoading) return null;
  return (
    <Row className="absolute left-0 top-0 w-[100vw] h-[100vh] items-center justify-center pointer-events-none z-[999999]">
      <ActivityIndicator size={80} color={AppColors.main} />
    </Row>
  );
};
