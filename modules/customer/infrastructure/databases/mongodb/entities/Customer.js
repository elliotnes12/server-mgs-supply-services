import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema({
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    businessName: String,
    businessType: String
});

export const Customer = mongoose.model("Customer",CustomerSchema);

