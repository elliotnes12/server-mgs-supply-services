import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema({
    name:String,
    lastName:{type: String , default: null}, 
    telephone:{type: String , default: null},
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    otherCompany:{type:String,default:null}
});

export const Customer = mongoose.model("Customer",CustomerSchema);

