import mongoose from 'mongoose';

export default async function connectDB () {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log("Connected to MongoDB");

    } catch (error) {
        if (error instanceof Error)
        console.log(`ERROR: ${error.message}`)
        process.exit(1);
    }
}