import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()

const coonectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
}
export default coonectMongoDB