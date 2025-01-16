import {useEffect} from 'react';
import {useAlerts} from '../../store/alerts';
import {Row} from '../elements/Row';
import {AppBorderRadius} from '../../constants/values';
import {AlertLayout} from './components/AlertLayout';

export const AppAlerts = () => {
  const {alert, alertData} = useAlerts();
  if (alert === 'None' || alertData == null) return null;
  return (
    <AlertLayout
      message={alertData.message}
      type={alert}
      icon={alertData.icon}
    />
  );
};
