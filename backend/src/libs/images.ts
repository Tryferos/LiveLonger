import { ImageDB } from "../auth/firebase";
import { QuickMeal, QuickMealModel } from "../database/schema/quick_meal";
const bucket = ImageDB().bucket('gs://livelonger-c956d.appspot.com');

export type FirestoreFile = ReturnType<typeof bucket.file>;

export const getFirestoreFile = (_id?: string): FirestoreFile => bucket.file(`${_id ?? null}.png`);
export const getFileSignedUrl = async(file: FirestoreFile) => (await file.getSignedUrl({action: 'read', expires: Date.now() + 1000*60*60*24}))[0];

export const saveToImageDBAndDoc = async function (quickMeal: QuickMeal): Promise<QuickMeal | null> {
    let doc = quickMeal;
    const file = getFirestoreFile(quickMeal._id);
    try{
        if(await file.exists()){
            await file.delete();
        }
    }catch(err){
        console.log('[ERROR] Firestore file does not exist for this meal, _id: ', quickMeal._id);
    }
    const buffer = Buffer.from(new Uint8Array(quickMeal.imageData ?? []).buffer);
    await file.save(buffer,
        {
            contentType: 'image/png',
        }
    );
    const url = await getFileSignedUrl(file);
    return (await QuickMealModel.findByIdAndUpdate(doc._id, {$set: {imageUrl: url}}).exec())?.toObject() ?? null;
}