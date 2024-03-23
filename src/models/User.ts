import mongoose from "mongoose";
import IUser from "./Interfaces/IUser";

const Schema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },

    }
);

export default mongoose.model<IUser>("User", Schema);