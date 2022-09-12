import mongoose from "mongoose";

const userModelSchema = mongoose.Schema({
        full_name: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            require: true,
            trim: true,
            unique: true,
        },
        user_level: {
            type: String,
            require: true,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("UserModel", userModelSchema);
export default UserModel;