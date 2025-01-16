"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Network {
    static createUrl(url, params) {
        if (params) {
            return `${url}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;
        }
        return url;
    }
    static async get({ url, formatData, params }) {
        const newUrl = this.createUrl(url, { ...params });
        try {
            const response = await fetch(newUrl, {
                method: 'GET',
                headers: {
                    ...this._headers,
                },
            });
            const data = await response.json();
            if (formatData) {
                try {
                    return formatData(data);
                }
                catch (err) {
                    console.log('[Network] Error formatting data (network/index.ts)');
                    return null;
                }
            }
            return data;
        }
        catch (err) {
            return null;
        }
    }
    static async post({ url, formatData, params, body = {} }) {
        const newUrl = this.createUrl(url, { ...params });
        try {
            const response = await fetch(newUrl, {
                method: 'POST',
                headers: {
                    ...this._headers,
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (formatData) {
                try {
                    return formatData(data);
                }
                catch (err) {
                    console.log('[Network] Error formatting data (network/index.ts)');
                    return null;
                }
            }
            return data;
        }
        catch (err) {
            return null;
        }
    }
}
Network._headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': process.env.FOODS_API_KEY,
};
exports.default = Network;
