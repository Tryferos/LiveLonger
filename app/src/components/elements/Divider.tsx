import {FC} from 'react';
import {Row} from './Row';

type DividerProps = {
  space?: number;
  paddingToCancelOuterSpacing?: number;
};

export const Divider: FC<DividerProps> = ({
  space = 8,
  paddingToCancelOuterSpacing = 16,
}) => {
  return (
    <Row
      backgroundColor="gray200"
      style={{
        height: 2,
        marginTop: space / 2,
        marginBottom: space,
        marginHorizontal: -paddingToCancelOuterSpacing,
      }}
    />
  );
};
