import {Row} from '../../../components/elements/Row';
import {EmptyIcon} from '../../../svgs/empty';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';

export const NoResults = () => {
  return (
    <Column gap="sm" className="justify-start items-center h-[35vh] mt-[10vh]">
      <Row
        className="w-[100%] relative object-contain justicy-start items-center"
        style={{flex: 1}}>
        <EmptyIcon width={'100%'} height={'80%'} opacity={0.7} />
      </Row>
      <CustomText size="sm" className="text-center">
        {'Looks like you haven’t added any products yet.'}
      </CustomText>
    </Column>
  );
};
