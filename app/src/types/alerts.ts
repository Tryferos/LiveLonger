import {Alerts} from '../constants/alerts';
import {AppIconsType} from './icons';

export type AlertType = keyof typeof Alerts;
export type AlertTypeMini = keyof Pick<typeof Alerts, 'Success' | 'Error'>;

export type AlertData = {
  message: string;
  icon?: AppIconsType;
};

export type AlertPromise<T> = {
  promise: Promise<T | null>;
  promiseData: AlertData;
  successData: ((res: T) => AlertData) | AlertData;
  errorData: AlertData;
};

export type UseAlertsProps = {
  alert: AlertType;
  alertData: AlertData | null;
  showAlertPromise: <T>({
    promise,
    successData,
    errorData,
  }: AlertPromise<T>) => Promise<T | null>;
  showAlert: ({alert, data}: {alert: AlertTypeMini; data: AlertData}) => void;
  hideAlert: () => void;
};
