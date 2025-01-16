"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToImageDBAndDoc = exports.getFileSignedUrl = exports.getFirestoreFile = void 0;
const firebase_1 = require("../auth/firebase");
const quick_meal_1 = require("../database/schema/quick_meal");
const bucket = (0, firebase_1.ImageDB)().bucket('gs://livelonger-c956d.appspot.com');
const getFirestoreFile = (_id) => bucket.file(`${_id ?? null}.png`);
exports.getFirestoreFile = getFirestoreFile;
const getFileSignedUrl = async (file) => (await file.getSignedUrl({ action: 'read', expires: Date.now() + 1000 * 60 * 60 * 24 }))[0];
exports.getFileSignedUrl = getFileSignedUrl;
const saveToImageDBAndDoc = async function (quickMeal) {
    let doc = quickMeal;
    const file = (0, exports.getFirestoreFile)(quickMeal._id);
    try {
        if (await file.exists()) {
            await file.delete();
        }
    }
    catch (err) {
        console.log('[ERROR] Firestore file does not exist for this meal, _id: ', quickMeal._id);
    }
    const buffer = Buffer.from(new Uint8Array(quickMeal.imageData ?? []).buffer);
    await file.save(buffer, {
        contentType: 'image/png',
    });
    const url = await (0, exports.getFileSignedUrl)(file);
    return (await quick_meal_1.QuickMealModel.findByIdAndUpdate(doc._id, { $set: { imageUrl: url } }).exec())?.toObject() ?? null;
};
exports.saveToImageDBAndDoc = saveToImageDBAndDoc;
