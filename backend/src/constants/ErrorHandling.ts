import {ErrorMiddlewareType} from '../types';

export const USER_TOKEN_HEADER_KEY = 'x-authentication-token';

export const ErrorNames = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  UNKNOWN: 'UNKNOWN',
  NOTFOUND: 'NOTFOUND',
  DATE_REQUIRED: 'DATE_REQUIRED',
  IMAGE_TOO_LARGE: 'IMAGE_TOO_LARGE',
} as const;

export const ErrorMiddlewareTypes: ErrorMiddlewareType = Object.freeze({
  [ErrorNames.UNAUTHENTICATED]: {
    error: '401: Unauthenticated',
    message: 'You must be authenticated!',
  },
  [ErrorNames.UNKNOWN]: {
    error: '500: Unknown Error',
    message:
      'An error has occured! Please contact with the api administrator if you believe this is an error.',
  },
  [ErrorNames.NOTFOUND]: {
    error: '404: Not Found',
    message: 'The requested resource could not be found.',
  },
  [ErrorNames.DATE_REQUIRED]: {
    error: '500: Request Error',
    message: 'Date was not provided!',
  },
  [ErrorNames.IMAGE_TOO_LARGE]: {
    error: '500: Request Error',
    message: 'Image is too large!',
  },
});
