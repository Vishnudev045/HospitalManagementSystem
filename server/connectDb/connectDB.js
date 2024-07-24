import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB: ${connection}`);
    } catch (error) {
        console.log("Error connecting to MongoDB" + error.message);
        process.exit(1);
    }   
}

export default connectMongoDB;