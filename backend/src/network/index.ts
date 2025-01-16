
import dotenv from 'dotenv';
dotenv.config();

type RequestType<T> = {url: string, formatData?: (data: any) => T,  params?: {[key: string]: string}}
type GetType<T> = RequestType<T>
type PostType<T> = RequestType<T> & {body?: {[key: string]: any}}

class Network {
  private static _headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': process.env.FOODS_API_KEY as string,
  };

  private static createUrl(url: string, params?: {[key: string]: string}): string {
    if(params) {
      return `${url}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;
    }
    return url;
  }

  static async get<T>({url, formatData, params} : GetType<T>): Promise<T | null> {
    const newUrl = this.createUrl(url, {...params});
    try{
      const response = await fetch(newUrl, {
        method: 'GET',
        headers: {
          ...this._headers,
        },
      });
      const data = await response.json();
      if (formatData) {
        try{
          return formatData(data);
        }catch(err){
          console.log('[Network] Error formatting data (network/index.ts)')
          return null;
        }
      }
      return data as T;
    }catch(err){
      return null;
    }
  }

  static async post<T>({url, formatData, params, body = {}}: PostType<T>): Promise<T | null> {
    const newUrl = this.createUrl(url, {...params});
    try{
      const response = await fetch(newUrl, {
        method: 'POST',
        headers: {
          ...this._headers,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if(formatData) {
        try{
          return formatData(data);
        }catch(err){
          console.log('[Network] Error formatting data (network/index.ts)')
          return null;
        }
      }
      return data as T;
    }catch(err){
      return null;
    }
  }
}

export default Network;
