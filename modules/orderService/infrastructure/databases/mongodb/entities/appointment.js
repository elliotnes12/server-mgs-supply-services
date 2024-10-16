import mongoose from "mongoose";
import moment from "moment";

const appointmentSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['cleaning', 'painting'],
    required: true
  },
  from: {
    type: String,
    required: true
  },
  until: {
    type: String,
    required: true
  },
  hour: {
    type: String,
    required: true
  },
  employees: [{
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  address: { type: String, required: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee'
  },
  photos: [{
    type: String
  }],
  comments: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'in_progress'
  }
}, { timestamps: true }); 

appointmentSchema.virtual("formattedDate").get(function () {
  if (!this.from || !moment(this.from, "YYYY-MM-DD").isValid()) {
    return "";
  }
  return moment(this.from, "YYYY-MM-DD").format("DD/MM/YYYY");
});

appointmentSchema.virtual("formattedTime").get(function () {
  if (!this.hour || !moment(this.hour, "HH:mm").isValid()) {
    return "";
  }
  return moment(this.hour, "HH:mm").format("HH:mm A");
});

appointmentSchema.virtual("formattedFrom").get(function () {
  if (!this.from || !moment(this.from, "YYYY-MM-DD").isValid()) {
    return "";
  }
  return moment(this.from).format("MMMM D, YYYY");
});

appointmentSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    ret.formattedDate = ret.formattedDate;
    ret.formattedTime = ret.formattedTime;
    delete ret._id;
    return ret;
  }
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);


