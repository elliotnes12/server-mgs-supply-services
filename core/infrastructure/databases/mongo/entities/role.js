import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    name: { type: String, unique: true },
    description: String,
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Role = mongoose.model("Role",RoleSchema);
