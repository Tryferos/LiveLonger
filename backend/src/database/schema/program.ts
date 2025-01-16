import mongoose, { Schema } from "mongoose";
import { AppDocument } from ".";
import { Schemas } from "../../constants/Schemas";
import { ProgramValues } from "../../constants/Types";

export interface Program extends AppDocument{
    program: ProgramType;
    startDate: Date;
    endDate?: Date;
    uid: string;
}

export type ProgramType = 'Maintenance' | 'Cutting' | 'Mass-Gain' | 'Weight-Loss';

const ProgramSchema = new Schema<Program>({
    program: {type: String, required: true,enum: Object.keys(ProgramValues)},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: false},
    uid: {type: String, required: true, unique: false},
});

export const ProgramModel = mongoose.model(Schemas.Program, ProgramSchema);

export type ProgramFull = Program & typeof ProgramValues[ProgramType];