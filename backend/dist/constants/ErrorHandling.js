"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddlewareTypes = exports.ErrorNames = exports.USER_TOKEN_HEADER_KEY = void 0;
exports.USER_TOKEN_HEADER_KEY = "x-authentication-token";
exports.ErrorNames = {
    UNAUTHENTICATED: 'UNAUTHENTICATED',
    UNKNOWN: 'UNKNOWN',
    NOTFOUND: 'NOTFOUND',
    DATE_REQUIRED: 'DATE_REQUIRED',
};
exports.ErrorMiddlewareTypes = Object.freeze({
    [exports.ErrorNames.UNAUTHENTICATED]: {
        error: '401: Unauthenticated',
        message: 'You must be authenticated!'
    },
    [exports.ErrorNames.UNKNOWN]: {
        error: '500: Unknown Error',
        message: 'An error has occured! Please contact with the api administrator if you believe this is an error.'
    },
    [exports.ErrorNames.NOTFOUND]: {
        error: '404: Not Found',
        message: 'The requested resource could not be found.'
    },
    [exports.ErrorNames.DATE_REQUIRED]: {
        error: '500: Request Error',
        message: 'Date was not provided!'
    },
});
