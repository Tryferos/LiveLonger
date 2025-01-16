"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const { ObjectId } = Schema;
const UserSchema = new Schema({
    uid: ObjectId,
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    photoURL: { type: String, required: true, },
    date: { type: Date, default: Date.now },
});
// export const UserModel = mongoose.model(Schemas.User, UserSchema);
