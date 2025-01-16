"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const ErrorHandling_1 = require("../../constants/ErrorHandling");
const Routes_1 = require("../../constants/Routes");
const user_1 = require("../../network/user");
exports.router = express_1.default.Router();
/*
    * /user
*/
exports.router.get(Routes_1.ROUTES.USER.PRESETS, async (req, res) => {
    const { uid } = res.locals.user;
    const presets = await (0, user_1.getPresets)({ uid });
    ;
    if (!presets) {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.json(presets);
});
exports.router.post(Routes_1.ROUTES.USER.PRESETS, async (req, res) => {
    const { uid } = res.locals.user;
    const presets = await (0, user_1.setPresets)({ uid: uid, presets: req.body });
    if (!presets) {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.json(presets);
});
exports.router.post(Routes_1.ROUTES.USER.PROGRAMS, async (req, res) => {
    const { uid } = res.locals.user;
    const program = await (0, user_1.setProgram)({ uid: uid, program: req.body.program });
    if (!program) {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.json(program);
});
exports.router.get(Routes_1.ROUTES.USER.PROGRAMS, async (req, res) => {
    const { uid } = res.locals.user;
    const availablePrograms = await (0, user_1.getAvailablePrograms)({ uid: uid });
    res.json(availablePrograms);
});
exports.router.get(Routes_1.ROUTES.USER.SELECTED_PROGRAM, async (req, res) => {
    const { uid } = res.locals.user;
    //! NOT IMPLEMENTED YET
    //// const program = await getProgramByDate({uid:uid, date: parseInt(req.query.date)});
    //* Temporary
    const program = null;
    if (!program) {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.json({ program: program });
});
