import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            serverSelectionTimeoutMS: 5000, // 5 seconds
            socketTimeoutMS: 45000 // 45 seconds
        });
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MONGODB successfully connected..")
        });

        connection.on('error', (err) => {
            console.log("MONGODB Connection error" + err);
            process.exit(1);
        })
    }
    catch (error: any) {
        console.log("Something went wrong");
        console.log(error);

    }

}

export default connectDB;