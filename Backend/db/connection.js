import mongoose from "mongoose";

async function dbConnector() {

    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected Succesfuly!", connect.connection.host);
    } catch (error) {
        console.log("Error Occured During Connection of Database", error);
    }
    
}

export default dbConnector;