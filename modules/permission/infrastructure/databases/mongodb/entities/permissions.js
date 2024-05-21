import mongoose from "mongoose";


const PermissionEnum = {
    CHAT_ALL: "CHAT_ALL",
    CHAT_VIEW: "CHAT_VIEW",
    TASK_VIEW: "TASK_VIEW",
    TASK_ALL: "TASK_ALL",
    REPORT_VIEW: "REPORT_VIEW",
    REPORT_ALL: "REPORT_ALL"
};

const PermissionSchema = mongoose.Schema({
    type:{
        type: String,
        enum: Object.values(PermissionEnum)
    },
    active: Boolean,
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }]
});

export const Permission = mongoose.model("Permission",PermissionSchema);