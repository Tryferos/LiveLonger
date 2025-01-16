import {FC, PropsWithChildren} from 'react';
import {Row} from '../../../components/elements/Row';
import {CustomText} from '../../../components/elements/CustomText';
import {Column} from '../../../components/elements/Column';
type Props = {
  title: string;
} & PropsWithChildren;
export const StepWrapper: FC<Props> = ({children, title}) => {
  return (
    <Column
      className="items-center justify-center w-[100%] h-[35vh] py-4"
      gap="sm">
      <Row className="h-[30%] items-center">
        <CustomText font="wotfardMedium" size="lg" className="text-center">
          {title}
        </CustomText>
      </Row>
      <Row className="h-[70%]">{children}</Row>
    </Column>
  );
};
