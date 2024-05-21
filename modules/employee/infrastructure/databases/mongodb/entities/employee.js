import mongoose from "mongoose";

const EmployeeSchema = mongoose.Schema({
    name: String,
    lastName: String,
    idEmployee:{ type: String, unique: true },
    active:Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    type: {
        type: String,
        enum: ['employee', 'supervisor', 'manager'], 
        default: 'employee'
    }

});

export const Employee = mongoose.model("Employee",EmployeeSchema);

