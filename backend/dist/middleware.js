"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthentication = exports.authenticateUser = exports.limiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const ErrorHandling_1 = require("./constants/ErrorHandling");
const firebase_1 = require("./auth/firebase");
const Routes_1 = require("./constants/Routes");
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
});
const authenticateUser = async (req, res, next) => {
    const tokenId = req.headers[ErrorHandling_1.USER_TOKEN_HEADER_KEY];
    if (tokenId === undefined || tokenId === null || tokenId === 'null' || tokenId.length === 0) {
        res.locals.user = null;
        next();
        return;
    }
    try {
        const { uid } = await (0, firebase_1.auth)().verifyIdToken(tokenId);
        const user = await (0, firebase_1.auth)().getUser(uid);
        res.locals.user = user;
    }
    catch (err) {
        res.locals.user = null;
    }
    next();
};
exports.authenticateUser = authenticateUser;
const checkAuthentication = (req, res, next) => {
    if (!req.path.toLowerCase().startsWith(Routes_1.ROUTES.PATH_INDEX)) {
        next();
        return;
    }
    if (res.locals.user == null) {
        res.status(401).json({ ...ErrorHandling_1.ErrorMiddlewareTypes.UNAUTHENTICATED });
        return;
    }
    next();
};
exports.checkAuthentication = checkAuthentication;
