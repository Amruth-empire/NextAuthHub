import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MONGODB successfully connected..")
        });

        connection.on('error', (err) => {
            console.log("MONGODB Connection error" + err);
            process.exit();
        })
    }
    catch (error: any) {
        console.log("Something went wrong");
        console.log(error.message);

    }

}

export default connectDB;