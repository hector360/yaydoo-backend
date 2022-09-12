import mongoose from "mongoose";

const conectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
};

export default conectDB;