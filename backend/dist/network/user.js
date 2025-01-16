"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailablePrograms = exports.setProgram = exports.setPresets = exports.getProgramByDate = exports.getProgram = exports.getPresets = void 0;
const Types_1 = require("../constants/Types");
const presets_1 = require("../database/schema/presets");
const program_1 = require("../database/schema/program");
const user_1 = require("../libs/user");
const getPresets = async ({ uid }) => {
    const presets = await presets_1.PresetsModel.findOne({ uid }).exec();
    if (presets) {
        const presetsData = presets?.toObject();
        return { ...presetsData, daily_calories: (0, user_1.calculateCalories)(presetsData) };
    }
    return null;
};
exports.getPresets = getPresets;
const getProgram = async ({ uid }) => {
    const doc = await program_1.ProgramModel.findOne({ uid: uid, endDate: { $exists: false } }).exec();
    if (doc && doc.program) {
        return doc.toObject();
    }
    else {
        const newDoc = await program_1.ProgramModel.create({ program: 'Maintenance', startDate: new Date(), uid: uid });
        return newDoc.toObject();
    }
};
exports.getProgram = getProgram;
const getProgramByDate = async ({ uid, date: dateMs }) => {
    const date = new Date(dateMs);
    const doc = await program_1.ProgramModel.findOne({ uid: uid, endDate: { $lte: date }, startDate: { $gte: date } }).exec();
    if (doc && doc.program) {
        return { ...doc.toObject(), ...Types_1.ProgramValues[doc.program] };
    }
    return null;
};
exports.getProgramByDate = getProgramByDate;
const setPresets = async ({ uid, presets: data }) => {
    let presets = await presets_1.PresetsModel.findOneAndUpdate({ uid: uid }, data, {
        new: true,
        upsert: true,
    }).exec();
    if (!presets) {
        const doc = await presets_1.PresetsModel.create(data);
        presets = doc.toObject();
    }
    if (presets) {
        return {
            activity_level: presets.activity_level,
            age: presets.age,
            daily_calories: Math.round(presets.daily_calories ?? (0, user_1.calculateCalories)(presets)),
            height: presets.height,
            sex: presets.sex,
            uid: presets.uid,
            weight: presets.weight,
        };
    }
    else {
        return null;
    }
};
exports.setPresets = setPresets;
const setProgram = async ({ uid, program }) => {
    const existingProgram = await program_1.ProgramModel.findOne({ uid: uid, endDate: { $exists: false } }).exec();
    existingProgram?.set({ endDate: new Date() }).save();
    const newProgram = {
        program: program,
        startDate: new Date(),
        uid: uid,
    };
    const doc = await program_1.ProgramModel.create(newProgram);
    return { ...doc.toObject(), ...Types_1.ProgramValues[program] };
};
exports.setProgram = setProgram;
const getAvailablePrograms = async ({ uid }) => {
    const currentProgram = await (0, exports.getProgram)({ uid });
    const presets = await (0, exports.getPresets)({ uid });
    if (!presets || !presets.daily_calories || !presets.weight) {
        return {
            programs: Types_1.ProgramValues,
            selectedProgram: currentProgram,
        };
    }
    const filledProgramValues = JSON.parse(JSON.stringify(Types_1.ProgramValues));
    for (const program in filledProgramValues) {
        const programValue = Types_1.ProgramValues[program];
        programValue.calories = Math.round(programValue.caloricPercentage * presets.daily_calories);
        programValue.carbsKcal = Math.round(programValue.carbsPercentage * presets.daily_calories);
        programValue.fatsKcal = Math.round(programValue.fatsPercentage * presets.daily_calories);
        programValue.proteinGrams = Math.round(programValue.proteinPerKg * presets.weight);
    }
    return {
        programs: filledProgramValues,
        selectedProgram: currentProgram,
    };
};
exports.getAvailablePrograms = getAvailablePrograms;
