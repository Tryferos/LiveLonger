import {INTERNAL_API_URL} from '../constants/network';
import {useUserAuthentication} from '../store/authentication';
import useLoader from '../store/loader';

type PostRequestProps<T> = {
  url: string;
  body?: {[key: string]: any};
  formatData?: (data: any) => T;
  params?: {[key: string]: string | number | undefined | boolean | null};
  method?: 'POST' | 'PUT' | 'DELETE';
  useMinimumResponseTime?: boolean;
};

type GetRequestProps<T> = Omit<PostRequestProps<T>, 'body'>;

class Network {
  private static _minumumResponseTime = 500;
  private static _headers = () => {
    return {
      'Content-Type': 'application/json',
      'x-authentication-token': useUserAuthentication.getState().idToken ?? '',
    } as HeadersInit_;
  };

  private static createUrl(
    url: string,
    params?: PostRequestProps<any>['params'],
  ): string {
    if (params) {
      return `${url}?${Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&')}`;
    } else {
      return url;
    }
  }

  static async get<T>({
    url,
    formatData,
    params,
    useMinimumResponseTime,
  }: GetRequestProps<T>): Promise<T | null> {
    const urlToCall = `${await INTERNAL_API_URL()}${this.createUrl(
      url,
      params,
    )}`;
    try {
      const currentMS1 = new Date().getTime();
      useLoader.getState().showLoader();
      const response = await fetch(urlToCall, {
        method: 'GET',
        headers: {
          ...this._headers(),
        },
      });
      if (useMinimumResponseTime) {
        const currentMS2 = new Date().getTime();
        const timeTaken = currentMS2 - currentMS1;
        if (timeTaken < Network._minumumResponseTime) {
          await new Promise(resolve =>
            setTimeout(resolve, Network._minumumResponseTime - timeTaken),
          );
        }
      }
      if (!response.ok || !response) {
        return null;
      }
      const data = await response.json();
      if (formatData) {
        return formatData(data);
      }
      return data as T;
    } catch (err) {
      return null;
    } finally {
      useLoader.getState().hideLoader();
    }
  }
  static async post<T>({
    body,
    url,
    formatData,
    params,
    method = 'POST',
    useMinimumResponseTime,
  }: PostRequestProps<T>): Promise<T | null> {
    const urlToCall = `${await INTERNAL_API_URL()}${this.createUrl(
      url,
      params,
    )}`;
    try {
      useLoader.getState().showLoader();
      const currentMS1 = new Date().getTime();
      const response = await fetch(urlToCall, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          ...this._headers(),
        },
      });
      if (useMinimumResponseTime) {
        const currentMS2 = new Date().getTime();
        const timeTaken = currentMS2 - currentMS1;
        if (timeTaken < Network._minumumResponseTime) {
          await new Promise(resolve =>
            setTimeout(resolve, Network._minumumResponseTime - timeTaken),
          );
        }
      }
      if (!response.ok || !response) {
        return null;
      }
      const data = await response.json();
      if (formatData) {
        return formatData(data);
      }
      return data as T;
    } catch (err) {
      return null;
    } finally {
      useLoader.getState().hideLoader();
    }
  }
}

export default Network;
