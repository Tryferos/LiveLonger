import mongoose from "mongoose";
const {Schema} = mongoose;
const {ObjectId} = Schema;
import { AppDocument } from ".";
import { Schemas } from "../../constants/Schemas";

export interface Presets extends AppDocument{
    daily_calories?: number;
    age: number;
    height: number;
    weight: number;
    activity_level: number;
    sex: 'male' | 'female';
    uid: string;
}

const PresetsSchema = new Schema<Presets>({
    daily_calories: {type: Number, required: false},
    age: {type: Number, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    activity_level: {type: Number, required: true},
    sex: {type: String, required: true, enum: Object.values(['male', 'female'])},
    uid: {type: String, required: true, unique: true},
});

export const PresetsModel = mongoose.model(Schemas.Presets, PresetsSchema);