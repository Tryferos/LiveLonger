import {create} from 'zustand';
import {AppIconsType} from '../types/icons';
import {AlertPromise, UseAlertsProps} from '../types/alerts';
import {Alerts} from '../constants/alerts';

export const useAlerts = create<UseAlertsProps>()(set => ({
  alert: Alerts.None,
  alertData: null,
  showAlertPromise: async <T>({
    promise,
    promiseData,
    successData,
    errorData,
  }: AlertPromise<T>) => {
    set({alert: Alerts.Promise, alertData: promiseData});
    try {
      const res = await promise;
      if (!res) throw new Error();
      set({
        alert: Alerts.Success,
        alertData:
          typeof successData === 'function' ? successData(res) : successData,
      });
      return res;
    } catch (err) {
      set({alert: Alerts.Error, alertData: errorData});
      return null;
    }
  },
  showAlert: ({alert, data}) => set({alert, alertData: data}),
  hideAlert: () => set({alert: Alerts.None, alertData: null}),
}));

const ALERT_TIMEOUT = 3000;
useAlerts.subscribe(state => {
  if (state.alert !== 'Success' && state.alert !== 'Error') return;
  const timeout = setTimeout(() => {
    useAlerts.getState().hideAlert();
  }, ALERT_TIMEOUT);
  return () => clearTimeout(timeout);
});
