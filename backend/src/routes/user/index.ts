import express from "express";
import {  DateQuery, ErrorMiddlewareTypeProps, TRequest, TResponse } from "../../types";
import { Presets } from "../../database/schema/presets";
import { ErrorMiddlewareTypes } from "../../constants/ErrorHandling";
import { ROUTES } from "../../constants/Routes";
import { getAvailablePrograms, getPresets,  setPresets, setProgram } from "../../network/user";
import { Program, ProgramFull, ProgramType } from "../../database/schema/program";

export const router = express.Router();

/* 
    * /user
*/

router.get(ROUTES.USER.PRESETS, async (req : TRequest, res : TResponse<ErrorMiddlewareTypeProps | Presets>) => {
    const {uid} = res.locals.user!;
    const presets = await getPresets({uid});;
    if(!presets) {
        res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.json(presets);
})

router.post(ROUTES.USER.PRESETS, async (req : TRequest<Presets>, res : TResponse<ErrorMiddlewareTypeProps | Presets>) => {
    const {uid} = res.locals.user!;
    const presets = await setPresets({uid:uid,presets:req.body});
    if(!presets) {
        res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.json(presets);
})

router.post(ROUTES.USER.PROGRAMS, async (req : TRequest<{program: ProgramType}>, res : TResponse<ErrorMiddlewareTypeProps | Program>) => {
    const {uid} = res.locals.user!;
    const program = await setProgram({uid:uid,program:req.body.program});
    if(!program) {
        res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.json(program);
})

router.get(ROUTES.USER.PROGRAMS, async (req : TRequest, res : TResponse<Awaited<ReturnType<typeof getAvailablePrograms>>>) => {
    const {uid} = res.locals.user!;
    const availablePrograms = await getAvailablePrograms({uid:uid});
    res.json(availablePrograms);
})

router.get(ROUTES.USER.SELECTED_PROGRAM, async (req : TRequest<any, DateQuery>, res : TResponse<ErrorMiddlewareTypeProps | {program: ProgramFull}>) => {
    const {uid} = res.locals.user!;
    //! NOT IMPLEMENTED YET
    //// const program = await getProgramByDate({uid:uid, date: parseInt(req.query.date)});
    //* Temporary
    const program = null;
    if(!program) {
        res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.json({program: program});
})