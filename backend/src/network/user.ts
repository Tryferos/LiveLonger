import Network from "."
import { Schemas } from "../constants/Schemas";
import { ProgramValues, _DOC_LIMIT } from "../constants/Types";
import { Presets, PresetsModel } from "../database/schema/presets"
import { Product, ProductDB, ProductDBModel, ProductModel } from "../database/schema/product";
import { Program, ProgramFull, ProgramModel, ProgramType } from "../database/schema/program";
import { formatProductWithGrams } from "../libs/product";
import { calculateCalories } from "../libs/user";

export const getPresets = async ({ uid }: { uid: string }): Promise<Presets | null> => {
    const presets = await PresetsModel.findOne({ uid }).exec();
    if (presets) {
        const presetsData = presets?.toObject();
        return { ...presetsData, daily_calories: calculateCalories(presetsData) };
    }
    return null;
}

export const getProgram = async ({ uid }: { uid: string }): Promise<Program | null> => {
    const doc = await ProgramModel.findOne({ uid: uid, endDate: { $exists: false } }).exec();
    if (doc && doc.program) {
        return doc.toObject();
    } else {
        const newDoc = await ProgramModel.create({ program: 'Maintenance', startDate: new Date(), uid: uid });
        return newDoc.toObject();
    }
}

export const getProgramByDate = async ({ uid, date: dateMs }: { uid: string; date: number }): Promise<ProgramFull | null> => {
    const date = new Date(dateMs);
    const doc = await ProgramModel.findOne({ uid: uid, endDate: { $lte: date }, startDate: { $gte: date } }).exec();
    if (doc && doc.program) {
        return { ...doc.toObject(), ...ProgramValues[doc.program] };
    }
    return null;
}

export const setPresets = async ({ uid, presets: data }: { uid: string, presets: Presets }): Promise<Presets | null> => {
    let presets = await PresetsModel.findOneAndUpdate({ uid: uid }, data, {
        new: true,
        upsert: true,
    }).exec();
    if (!presets) {
        const doc = await PresetsModel.create(data);
        presets = doc.toObject();
    }
    if (presets) {
        return {
            activity_level: presets.activity_level,
            age: presets.age,
            daily_calories: Math.round(presets.daily_calories ?? calculateCalories(presets)),
            height: presets.height,
            sex: presets.sex,
            uid: presets.uid,
            weight: presets.weight,
        }
    } else {
        return null;
    }
}

export const setProgram = async ({ uid, program }: { uid: string, program: ProgramType }): Promise<ProgramFull | null> => {
    const existingProgram = await ProgramModel.findOne({ uid: uid, endDate: { $exists: false } }).exec();
    existingProgram?.set({ endDate: new Date() }).save();
    const newProgram: Program = {
        program: program,
        startDate: new Date(),
        uid: uid,
    }
    const doc = await ProgramModel.create(newProgram);
    return { ...doc.toObject(), ...ProgramValues[program] };
}
type AvailableProgramsProps = {
    programs: typeof ProgramValues;
    selectedProgram: Program | null;
}
export const getAvailablePrograms = async ({ uid }: { uid: string }): Promise<AvailableProgramsProps> => {
    const currentProgram = await getProgram({ uid });
    const presets = await getPresets({ uid });
    if (!presets || !presets.daily_calories || !presets.weight) {
        return {
            programs: ProgramValues,
            selectedProgram: currentProgram,
        }
    }
    const filledProgramValues: typeof ProgramValues = JSON.parse(JSON.stringify(ProgramValues));
    for (const program in filledProgramValues) {
        const programValue = ProgramValues[program as ProgramType];
        programValue.calories = Math.round(programValue.caloricPercentage * presets.daily_calories);
        programValue.carbsKcal = Math.round(programValue.carbsPercentage * presets.daily_calories);
        programValue.fatsKcal = Math.round(programValue.fatsPercentage * presets.daily_calories);
        programValue.proteinGrams = Math.round(programValue.proteinPerKg * presets.weight);
    }
    return {
        programs: filledProgramValues,
        selectedProgram: currentProgram,
    }
}