import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    active:Boolean,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }
});


export const User = mongoose.model("User", UserSchema);