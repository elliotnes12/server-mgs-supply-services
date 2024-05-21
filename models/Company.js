import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    name: {type: String, unique: true},
    active:Boolean
    
});

export const Company = mongoose.model("Company",CompanySchema);

