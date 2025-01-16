import {FC, PropsWithChildren} from 'react';
import {Row} from './Row';

export const RoundedBox: FC<PropsWithChildren> = ({children}) => (
  <Row className="flex relative p-2 bg-[#f2f2f25d] rounded-full">
    {children}
  </Row>
);
