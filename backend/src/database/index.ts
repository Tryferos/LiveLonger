import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL as string).then(() => {
    console.log('[Database] Connected to Mongo')
}).catch((err) => {
    console.log(`[Database] Error connecting to Mongo\n${err}`)
});

export {};